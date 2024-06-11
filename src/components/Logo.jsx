import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Wrapper className='section-center'>
      <Link to='/'>
        job<span>Ster</span>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.h3`
  display: flex;
  align-items: center;
  width: fit-content;

  a {
    position: relative;
    color: var(--gray);
    font-size: 2.5rem;
    font-weight: bold;
    width: fit-content;

    span {
      color: var(--orange);
      z-index: 3;
    }
  }
`

export default Logo
