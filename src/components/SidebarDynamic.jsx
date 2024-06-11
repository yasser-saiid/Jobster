import Styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { links } from '../utils/sidebarLinks'
import Logo from './Logo'

const SidebarDynamic = ({ isSidebarOpen, closeSidebar }) => {
  return (
    <Wrapper className={`${!isSidebarOpen && 'hide'}`}>
      <div className='content section-center'>
        <header>
          <Logo />
          <button onClick={closeSidebar}>
            <FaTimes />
          </button>
        </header>
        <ul className='aside-links'>
          {links.map((link) => {
            const { id, text, url, icon } = link
            return (
              <li className='link-item' key={id}>
                <NavLink to={url} onClick={closeSidebar}>
                  <span>{icon}</span>
                  {text}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </Wrapper>
  )
}

const Wrapper = Styled.aside`
    background-color:rgba(39, 37, 37, 0.767);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    display:grid;
    place-content:center;

    &.hide{
      display:none;
    }

    header{
      padding: 0 0.4rem 0.8rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom:var(--border-solid);
      h3{
        margin:0;
      }
    }

    button{
    color: var(--red);
    background-color: var(--white);
    border:none;
    padding: 0.375rem;
    font-size: 18px;
    letter-spacing: 1px;
    cursor:pointer;
    }

    .content{
      background-color:var(--white);
      z-index:3;
      padding:1rem 0rem;
      height:80vh;
    }

    .aside-links{
      margin-top:2rem
    }

    .link-item{
      text-align:center;
      text-transform: capitalize;
      padding: 0.75rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      transition:var(--transition);
      a{
        color: var(--gray);
          opacity:0.6;
          font-size: 18px;
          width: 120px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 15px;
          &.active{
            color: var(--purple);
            opacity:1;
          }
      }
      &:hover{
        background-color:var(--off-white);
      }
    }



  @media (min-width:992px){
    display:none;
  }
`

export default SidebarDynamic
