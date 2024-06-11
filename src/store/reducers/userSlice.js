import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'
import axios from 'axios'
import { clearAllJobsState, clearFilters } from './allJobsSlice'
import { clearValues } from './jobSlice'

const initialState = {
  isLoading: false,
  isError: false,
  user: getUserFromLocalStorage(),
}

// user register
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
      const response = await customFetch.post('/auth/register', user)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

// user login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
      const response = await customFetch.post('/auth/login', user)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// update user info
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (newUserData, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi

    try {
      const response = await customFetch.patch(
        '/auth/updateUser',
        newUserData,
        {
          headers: {
            authorization: `Bearer ${getState().user.user.token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      /* if you want logout in this case */
      // if (error.response.status === 401) {
      //   dispatch(logoutUser())
      // }
      return rejectWithValue(error.response)
    }
  }
)

export const clearAllState = createAsyncThunk(
  'user/clearAllState',
  async (msg, thunkApi) => {
    try {
      thunkApi.dispatch(logoutUser())
      thunkApi.dispatch(clearAllJobsState())
      thunkApi.dispatch(clearFilters())
      thunkApi.dispatch(clearValues())
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null
      removeUserFromLocalStorage()
    },
  },

  extraReducers: (builder) => {
    // register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const user = action.payload.user
        state.isLoading = false
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`hello, ${action.payload.user.name}`)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        toast.error(action.payload.data.msg)
      })
    // login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload.user
        state.isLoading = false
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`welcome back, ${action.payload.user.name}`)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        toast.error(action.payload)
      })
    // update
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { user } = action.payload
        state.isLoading = false
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`User Updated`)
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload.data.msg)
      })
    // clear store
    builder.addCase(clearAllState.rejected, () => {
      toast.error('something went wrong')
    })
  },
})

export const { logoutUser } = userSlice.actions

export default userSlice.reducer
