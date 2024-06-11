import Styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Job from './Job'
import { getAllJobs } from '../store/reducers/allJobsSlice'
import Pagination from './Pagination'

const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((state) => state.allJobs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllJobs())
  }, [page, search, searchStatus, searchType, sort])

  if (isLoading) {
    return <div className='loading'></div>
  }

  if (jobs.length === 0) {
    return <NoJobsWrapper>Sorry, No jobs to display...</NoJobsWrapper>
  }

  return (
    <JobsWrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='container'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <Pagination />}
    </JobsWrapper>
  )
}

const NoJobsWrapper = Styled.h5`
 text-align:center;
`
const JobsWrapper = Styled.section`
 width: 100%;
 max-width:90%;
 margin: 1rem auto;
 padding-bottom:2.5rem;
 
 h5{
  margin-bottom:2rem;
 }
.container{
display:grid;
 grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
 gap:2rem 1rem;
}
 
`

export default JobsContainer
