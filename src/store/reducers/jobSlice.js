import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import { showLoading, hideLoading, getAllJobs } from './allJobsSlice'
import { authHeader } from '../../utils/authHeader'

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobType: 'full-time',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  status: 'pending',
  statusOptions: ['interview', 'declined', 'pending'],
  isEditing: false,
  editJobId: '',
}

// create new job
export const createJob = createAsyncThunk(
  'job/createJob',
  async (jobData, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi

    try {
      const response = await customFetch.post(
        '/jobs',
        jobData,
        authHeader(thunkApi)
      )
      dispatch(clearValues())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// delete job

export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async (jobId, thunkApi) => {
    thunkApi.dispatch(showLoading())
    try {
      const response = await customFetch.delete(
        `/jobs/${jobId}`,
        authHeader(thunkApi)
      )
      thunkApi.dispatch(getAllJobs())
      return response.data
    } catch (error) {
      thunkApi.dispatch(hideLoading())
      return rejectWithValue(error.response.data)
    }
  }
)

// edit job

export const editJob = createAsyncThunk(
  'job/editJob',
  async ({ jobId, job }, thunkApi) => {
    try {
      const response = await customFetch.patch(
        `/jobs/${jobId}`,
        job,
        authHeader(thunkApi)
      )
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handelJobChange: (state, action) => {
      const { name, value } = action.payload
      state[name] = value
    },

    clearValues: () => {
      return {
        ...initialState,
      }
    },
    setEditJob: (state, action) => {
      return { ...state, isEditing: true, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    // create job
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false
        toast.success('job created')
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload.msg)
      })
    // delete job
    builder
      .addCase(deleteJob.fulfilled, (state, action) => {
        // console.log(action)
        toast.success('job deleted')
      })
      .addCase(deleteJob.rejected, (state, action) => {
        // console.log(action)
        toast.error(action.payload.msg)
      })
    // edit job
    builder
      .addCase(editJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false
        toast.success('job updating...')
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload.msg)
      })
  },
})

export const { handelJobChange, clearValues, setEditJob } = jobSlice.actions

export default jobSlice.reducer
