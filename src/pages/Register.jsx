import styled from 'styled-components'
import { useState, useEffect } from 'react'
import registerImg from '../assets/Images/hero2.svg'
import { Logo, FormRow } from '../components'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, registerUser } from '../store/reducers/userSlice'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
}

const Register = () => {
  const [userValues, setUserValues] = useState(initialState)
  const dispatch = useDispatch()
  const { isLoading, isError, user } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const toggleMember = () => {
    setUserValues((prev) => {
      return {
        ...prev,
        isMember: !prev.isMember,
      }
    })
  }

  const handleChange = (e) => {
    setUserValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = userValues
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please Fill Out All Fields')
      return
    }

    if (isMember) {
      dispatch(loginUser({ email, password }))
      return
    }

    dispatch(registerUser({ name, email, password }))
  }

  useEffect(() => {
    if (user) {
      navigate('/')
      return
    }
  }, [user, navigate])

  return (
    <Wrapper className='section-center'>
      <div className='title-wrapper'>
        <Logo />
        <p>jobster, the best choose to Find The Perfect Job For You</p>
      </div>
      <section className='section-container'>
        <div className='page-content'>
          <img
            src={registerImg}
            alt='register image'
            className='img register-img'
          />
        </div>
        {/* login/register form */}
        <form className='form' onSubmit={handleSubmit}>
          <h3 className='form-title'>
            {userValues.isMember ? 'Login' : 'Register'}
          </h3>
          {/* name row */}
          {userValues.isMember || (
            <FormRow
              type='text'
              name='name'
              value={userValues.name}
              handleChange={handleChange}
            />
          )}
          {/* email row */}
          <FormRow
            type='email'
            name='email'
            value={userValues.email}
            handleChange={handleChange}
          />
          {/* password row */}
          <FormRow
            type='password'
            name='password'
            value={userValues.password}
            handleChange={handleChange}
          />

          <button
            type='submit'
            className={`btn btn-block ${isLoading && 'btn-disabled'}`}
          >
            {isLoading ? 'Loading...' : 'submit'}
          </button>

          <p className='member-text'>
            {userValues.isMember ? 'Not a member yet ?' : 'Already a member ?'}

            <button type='button' onClick={toggleMember} className='member-btn'>
              {userValues.isMember ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  min-height: 100vh;
  display: grid;
  place-content: center;
  padding: 2rem;

  .title-wrapper {
    p {
      font-weight: 600;
      margin-top: 1.2rem;
    }
  }

  .register-img {
    display: none;
  }

  .form {
    border-top: 5px solid var(--orange);
    border-bottom: 2px solid var(--gray);
    margin-bottom: 0;
  }

  .form-title {
    margin-bottom: 1.2rem;
    text-align: center;
  }

  .member-text {
    margin-top: 1rem;
    text-align: center;
  }

  .member-btn {
    margin-left: 7px;
    border: none;
    background: transparent;
    color: var(--purple);
    font-size: 01em;
    cursor: pointer;
  }

  @media (min-width: 992px) {
    .section-container {
      display: grid;
      align-items: flex-end;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .form {
      border-top: 5px solid var(--orange);
      border-bottom: 2px solid var(--gray);
    }

    .register-img {
      display: block;
    }
  }
`

export default Register
