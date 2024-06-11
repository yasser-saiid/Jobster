import Styled from 'styled-components'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import { useDispatch, useSelector } from 'react-redux'
import {
  handelFilterChange,
  clearFilters,
} from '../store/reducers/allJobsSlice'
import { useState, useMemo } from 'react'

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((state) => state.allJobs)
  const { jobTypeOptions, statusOptions } = useSelector((state) => state.job)
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(handelFilterChange({ name, value }))
  }
  const handleClearSearch = (e) => {
    e.preventDefault()
    setLocalSearch('')
    dispatch(clearFilters())
  }

  const debounce = () => {
    let timeOutId
    return (e) => {
      setLocalSearch(e.target.value)
      clearTimeout(timeOutId)
      timeOutId = setTimeout(() => {
        dispatch(
          handelFilterChange({ name: e.target.name, value: e.target.value })
        )
      }, 1000)
    }
  }

  const optimizationDebounce = useMemo(() => debounce(), [])

  return (
    <Wrapper className='form'>
      <h3 className='form-title'>Search form</h3>
      <div className='form-center'>
        <FormRow
          type='text'
          name='search'
          id='search'
          value={localSearch}
          handleChange={optimizationDebounce}
        />
        <FormRowSelect
          name='searchStatus'
          id='searchStatus'
          labelText='status'
          value={searchStatus}
          handleChange={handleSearch}
          options={['all', ...statusOptions]}
        />
        <FormRowSelect
          name='searchType'
          id='searchType'
          labelText='type'
          value={searchType}
          handleChange={handleSearch}
          options={['all', ...jobTypeOptions]}
        />
        <FormRowSelect
          name='sort'
          id='sort'
          value={sort}
          handleChange={handleSearch}
          options={sortOptions}
        />
        <button
          type='button'
          className='btn btn-block clear-filter'
          disabled={isLoading}
          onClick={handleClearSearch}
        >
          clear filters
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = Styled.form`
  width: 100%;
  max-width: 90%;
  

  @media (min-width:800px){
.form-center{
    margin-top:2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.7rem;
    align-items: center;
  }
  }

  .clear-filter{
    color: var(--white);
    background-color: var(--red);
    border: 2px solid var(--red);
    margin-top: 0.8rem;
  }
`

export default SearchContainer
