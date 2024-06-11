import styled from 'styled-components'
import { FormRow, FormRowSelect } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  handelJobChange,
  clearValues,
  createJob,
  editJob,
} from '../../store/reducers/jobSlice'
import { useEffect } from 'react'

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((state) => state.job)
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!position || !company || !jobLocation) {
      toast.error('Please fill out all fields')
      return
    }

    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      )
      return
    }

    dispatch(createJob({ position, company, jobLocation, status, jobType }))
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(handelJobChange({ name, value }))
  }

  // useEffect(() => {
  //   if (!isEditing) {
  //     dispatch(handelJobChange({ name: 'jobLocation', value: user.location }))
  //   }
  // }, [])

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3 className='form-title'>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            id='position'
            value={position}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='company'
            id='company'
            value={company}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='jobLocation'
            id='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleChange}
          />
          {/*select*/}
          <FormRowSelect
            name='status'
            id='status'
            value={status}
            options={statusOptions}
            handleChange={handleChange}
          />
          <FormRowSelect
            name='jobType'
            id='jobType'
            labelText='job type'
            value={jobType}
            options={jobTypeOptions}
            handleChange={handleChange}
          />

          {/* buttons */}
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block'
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 2rem 1rem;
  height: calc(100vh - 5rem);
  /* start form container style */
  .form {
    width: 100%;
    max-width: 90%;
  }
  .form-title {
    margin-bottom: 1.2rem;
  }

  .form-center {
  }

  button {
    margin-top: 0.8rem;
  }

  .clear {
    color: var(--white);
    background-color: var(--red);
    border: 2px solid var(--red);
  }

  .btn-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }

  @media (min-width: 800px) {
    .form-center {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem 1rem;
      align-items: center;
    }
  }
`
export default AddJob
