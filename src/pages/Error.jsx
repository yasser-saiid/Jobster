import styled from 'styled-components'
import errorImg from '../assets/Images/error.svg'
import { Link } from 'react-router-dom'
const Error = () => {
  return (
    <Wrapper className='section-center'>
      <section className='section-container'>
        <img src={errorImg} alt='error image' className='img error-image' />
        <h4 className='error-title'>ooh! .. Page Not Found</h4>

        <Link to='/' className='btn'>
          back to home
        </Link>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  height: 100vh;
  display: grid;
  place-content: center;
  text-align: center;
  .error-image {
    max-width: 400px;
    margin: 2rem auto;
  }
  .error-title {
    margin: 2rem auto;
    font-family: cursive;
    color: var(--red);
  }
  a {
    font-family: cursive;
  }
`

export default Error
