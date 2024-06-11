import Styled from 'styled-components'
import { useSelector } from 'react-redux'
import StatesItem from './StatesItem'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'

const StatesContainer = () => {
  const { stats } = useSelector((state) => state.allJobs)

  const defaultsStates = [
    {
      id: 1,
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#ffc107',
    },

    {
      id: 2,
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#6c63ff',
    },

    {
      id: 3,
      title: 'jobs declined',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#e74c3c',
    },
  ]

  return (
    <Wrapper>
      {defaultsStates.map((state) => (
        <StatesItem key={state.id} {...state} />
      ))}
    </Wrapper>
  )
}

const Wrapper = Styled.div`
 display: grid;
 gap: 1rem;
 grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
 margin-bottom:2rem
`

export default StatesContainer
