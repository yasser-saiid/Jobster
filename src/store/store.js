import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/userSlice'
import jobSlice from './reducers/jobSlice'
import allJobsSlice from './reducers/allJobsSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
})

export default store
