import Styled from 'styled-components'

const StatesItem = ({ title, count, icon, color }) => {
  return (
    <Wrapper color={color}>
      <header>
        <span>{count}</span>
        <span>{icon}</span>
      </header>
      <h4>{title}</h4>
    </Wrapper>
  )
}

const Wrapper = Styled.article`
 box-shadow:var(--light-shadow);
 border-radius:var(--border-radius);
 border-bottom: 5px solid ${(props) => props.color};

 h4{
  color:black;
  padding:1rem 2rem;
  font-size:calc(1.5rem + 0.4vw)
 }

 header{
  margin-bottom:0.75rem;
  padding:1rem 2rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-size:2.5rem;
  border-bottom:var(--border-solid);
  color:${(props) => props.color};
 }
`

export default StatesItem
