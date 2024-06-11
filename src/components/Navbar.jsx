import { useState } from 'react'
import styled from 'styled-components'
import { FaBars, FaCircleUser } from 'react-icons/fa6'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser, clearAllState } from '../store/reducers/userSlice'

const Navbar = ({ openSidebar }) => {
  const { user } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const [showLogout, setShowLogout] = useState(false)
  return (
    <Wrapper>
      <div className='section-center'>
        <button className='bars-icon' onClick={openSidebar}>
          <FaBars />
        </button>
        <div className='nav-title'>
          <h5>dashboard</h5>
        </div>
        <button
          className='user-icon'
          onClick={() => setShowLogout(!showLogout)}
        >
          <FaCircleUser />
          <span>{user?.name}</span>
        </button>
        <button
          className={`logout-btn ${showLogout && 'show'}`}
          onClick={() => dispatch(clearAllState())}
        >
          logout
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  background-color: var(--white);
  border-bottom: var(--border-solid);
  .section-center {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-title {
    display: none;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
  }

  .bars-icon {
    color: var(--purple);
    font-size: 1.75rem;
  }

  .user-icon {
    background-color: var(--purple);
    color: var(--white);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr;
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: 1px;
    font-size: 16px;
    font-weight: 600;
    // width: 103px;
    svg {
      margin-right: 5px;
    }
  }

  .logout-btn {
    background-color: var(--red);
    color: var(--white);
    border-radius: var(--border-radius);
    padding: 0.5rem 1rem;
    font-size: 15px;
    letter-spacing: 1px;
    text-transform: capitalize;
    position: absolute;
    transition: var(--transition);
    transform: translateY(0px);
    right: 0rem;
    width: 103px;
    opacity: 0;
    z-index: -1;
    &.show {
      opacity: 1;
      z-index: 2;
      transform: translateY(50px);
    }
  }

  @media (min-width: 768px) {
    .nav-title {
      display: block;
    }
  }

  @media (min-width: 992px) {
    .bars-icon {
      display: none;
    }
  }
`

export default Navbar
