import Styled from 'styled-components'
import Logo from './Logo'
import { NavLink } from 'react-router-dom'
import { links } from '../utils/sidebarLinks'

const SidebarFixed = () => {
  return (
    <Wrapper>
      <header>
        <Logo />
      </header>
      <ul className='aside-links'>
        {links.map((link) => {
          const { id, text, url, icon } = link
          return (
            <li className='link-item' key={id}>
              <NavLink
                to={url}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <span>{icon}</span>
                {text}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </Wrapper>
  )
}

const Wrapper = Styled.aside`
  background-color:var(--white);
  padding:2rem 0rem;
  height:calc(100vh - 5rem);

  .aside-links{
    margin-top:2rem;
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

  @media (max-width:992px){
    display:none;
  }
  
`

export default SidebarFixed
