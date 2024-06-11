import styled from 'styled-components'
import { SearchContainer, JobsContainer } from '../../components'

const AllJobs = () => {
  return (
    <Wrapper>
      <SearchContainer />
      <hr />
      <JobsContainer />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 2rem 1rem;
  height: calc(100vh - 5rem);

  hr {
    height: 2px;
    background-color: #ccc;
    border: none;
    border-radius: 12px;
    margin: 3rem 0rem;
  }
`

export default AllJobs
