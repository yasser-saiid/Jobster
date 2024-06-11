import Styled from 'styled-components'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import BarChartComponent from './BarChartComponent'
import AreaChartComponent from './AreaChartComponent'

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(false)
  const { monthlyApplications: data } = useSelector((state) => state.allJobs)
  return (
    <Wrapper>
      <h3>Monthly Applications</h3>
      <div className='btn-container'>
        <button
          type='button'
          onClick={() => setBarChart(false)}
          className={`${!barChart && 'active'}`}
        >
          Bar Chart
        </button>{' '}
        <button
          type='button'
          onClick={() => setBarChart(true)}
          className={`${barChart && 'active'}`}
        >
          Area Chart
        </button>
      </div>

      {barChart ? (
        <AreaChartComponent data={data} />
      ) : (
        <BarChartComponent data={data} />
      )}
    </Wrapper>
  )
}

const Wrapper = Styled.div`
 margin-top: 5rem;
 text-align: center;


 h3{
  text-align:center;
 }

 .btn-container{
  max-width:320px;
  margin: 0.4rem auto;
  display:flex;
  justify-content:center;
  align-items:center;
 }

 button{
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color:transparent;
  color: var(--purple);
  background-color: var(--white);
  border: none;
  cursor: pointer;
  font-size:1.15rem;
  display:block;
  &.active{
border:2px solid var(--purple)
  }
 }
`

export default ChartsContainer
