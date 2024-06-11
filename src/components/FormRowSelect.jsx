import styled from 'styled-components'

const FormRowSelect = ({ labelText, name, value, handleChange, options }) => {
  return (
    <Wrapper className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className='form-select'
      >
        {options.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          )
        })}
      </select>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default FormRowSelect
