import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import { authHeader } from '../../utils/authHeader'

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
}

// get all jobs
export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  async (_, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi
    const { page, searchStatus, searchType, sort, search } = getState().allJobs
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`

    if (search) {
      url = url + `&search=${search}`
    }

    try {
      const response = await customFetch.get(url, authHeader(thunkApi))
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// get jobs states
export const getJobsStates = createAsyncThunk(
  'allJobs/getJobsStates',
  async (_, thunkApi) => {
    try {
      const response = await customFetch.get(
        '/jobs/stats',
        authHeader(thunkApi)
      )
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
    handelFilterChange: (state, action) => {
      state.page = 1
      const { name, value } = action.payload
      state[name] = value
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState }
    },
    changePage: (state, action) => {
      state.page = action.payload
    },
    clearAllJobsState: () => initialState,
  },
  extraReducers: (builder) => {
    // get all jobs
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.jobs = action.payload.jobs
        state.totalJobs = action.payload.totalJobs
        state.numOfPages = action.payload.numOfPages
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isLoading = false
        toast.error('there was an error')
        // toast.error(action.payload)
      })
    // get jobs states
    builder
      .addCase(getJobsStates.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getJobsStates.fulfilled, (state, action) => {
        state.isLoading = false
        state.stats = action.payload.defaultStats
        state.monthlyApplications = action.payload.monthlyApplications
      })
      .addCase(getJobsStates.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload.msg)
      })
  },
})

export const {
  showLoading,
  hideLoading,
  handelFilterChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions

export default allJobsSlice.reducer
