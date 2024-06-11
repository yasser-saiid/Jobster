import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJobsStates } from '../../store/reducers/allJobsSlice'
import { StatesContainer, ChartsContainer } from '../../components'

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (state) => state.allJobs
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getJobsStates())
  }, [])

  if (isLoading) {
    return <div className='loading' style={{ marginTop: '3rem' }}></div>
  }

  return (
    <Wrapper>
      <StatesContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 2rem 1rem;
  height: calc(100vh - 5rem);
`

export default Stats
