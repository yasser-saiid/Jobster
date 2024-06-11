import styled from 'styled-components'
import { useState } from 'react'
import { FormRow } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { updateUser } from '../../store/reducers/userSlice'

const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    name: user?.name || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    location: user?.location || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, lastName, email, location } = userData
    if (!name || !lastName || !email || !location) {
      toast.error('Please Fill Out All Fields')
      return
    }
    dispatch(updateUser(userData))
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3 className='form-title'>profile</h3>

        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            id='name'
            labelText='name'
            value={userData?.name}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='lastName'
            id='lastName'
            labelText='last name'
            value={userData?.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type='email'
            name='email'
            id='email'
            labelText='email'
            value={userData?.email}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='location'
            id='location'
            labelText='location'
            value={userData?.location}
            handleChange={handleChange}
          />

          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? 'please wait..' : ' save changes'}
          </button>
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

  @media (min-width: 800px) {
    .form-center {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 0.5rem 1rem;
      align-items: center;
    }
  }
`

export default Profile
