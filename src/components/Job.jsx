import Styled from 'styled-components'
import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { deleteJob, setEditJob } from '../store/reducers/jobSlice'

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  status,
  jobType,
  createdAt,
}) => {
  const date = moment(createdAt).format('MMM Do, YYYY')
  const dispatch = useDispatch()
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <p className='location'>
          <FaLocationArrow /> {jobLocation}
        </p>
        <p className='type'>
          <FaBriefcase />
          {jobType}
        </p>
        <p className='date'>
          <FaCalendarAlt />
          {date}
        </p>

        <p className={status}>{status}</p>
      </div>
      <footer>
        <Link
          className='btn edit'
          to='/add-job'
          onClick={() =>
            dispatch(
              setEditJob({
                editJobId: _id,
                position,
                company,
                jobLocation,
                jobType,
                status,
              })
            )
          }
        >
          edit
        </Link>
        <button
          type='button'
          className='btn delete'
          onClick={() => dispatch(deleteJob(_id))}
        >
          delete
        </button>
      </footer>
    </Wrapper>
  )
}

const Wrapper = Styled.article`
 box-shadow:var(--light-shadow);
 border-radius:var(--border-radius);
 max-width: 320px;

  header{
   border-bottom:var(--border-solid);
   padding:1rem;
   display: grid;
   grid-template-columns: auto 1fr;
   align-items: center;
   gap:1rem;

   .main-icon{
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--purple);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
   }

   h5{
    margin:0;
   }
  }

  .content{
    padding:1rem;
    display: grid;
    gap:0.5rem;
    svg{
     margin-right:1rem;
    }
    .pending,.interview,.declined{
     background:var(--orange);
     color:var(--white);
     width: fit-content;
     padding: 2px 14px;
     border-radius: var(--border-radius);
    }
    .interview{
     background:var(--purple);
    }
    .declined{
     background:var(--red);
    }
  }


  footer{
   padding:1rem;
   display: flex;
   justify-content: flex-start;
   align-items:center;
   gap:0.7rem;
   .edit{
    background:var(--green);
    border:none;
   }
   .delete{
    background:var(--red);
    border:none;
   }
  }
`

export default Job
