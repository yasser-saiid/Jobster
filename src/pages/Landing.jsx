import styled from 'styled-components'
import heroImg from '../assets/Images/hero.svg'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper className='section-center'>
      <div className='section-container page'>
        <article>
          <h1>
            Find the perfect <span>job</span> for you
          </h1>
          <p>
            with our paltform{' '}
            <strong>
              "job<span>ster</span>"
            </strong>{' '}
            you can always Find the perfect job for you, consectetur adipisicing
            elit. Quaerat repellat corporis animi. Voluptatum non dolore tenetur
            hic, debitis, laudantium adipisci eligendi accusamus quidem natus
            eos.
          </p>

          <Link to='/register' className='btn'>
            login / register
          </Link>
        </article>
        <img src={heroImg} alt='jobster image' className='img main-img' />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .page {
    height: 100vh;
    display: grid;
    align-items: center;
    position: relative;
  }

  article {
    h1 {
      margin-bottom: 1.2rem;
      span {
        color: var(--gray);
      }
    }

    p {
      margin-bottom: 1.2rem;
      span {
        color: var(--orange);
      }
    }
  }

  .main-img {
    display: none;
  }

  @media (max-width: 500px) {
    article {
      h1 {
        font-size: calc(2rem + 0.5vw);
      }
    }
  }

  @media (min-width: 992px) {
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      background-color: var(--orange);
      z-index: -1;
      width: 35%;
      height: 100%;
      border-radius: 0rem 0rem 0rem 23rem;
      clip-path: polygon(41% 0%, 100% 0%, 100% 100%, 0% 100%, -22% 82%);
    }
    .page {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      h1 {
        font-weight: 900;
      }
    }
    .main-img {
      display: block;
    }
  }
`

export default Landing
