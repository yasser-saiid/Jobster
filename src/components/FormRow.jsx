import { useState } from 'react'
import { FaEye, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    if (showPassword) {
      document.getElementById('password').setAttribute('type', 'text')
    }
    if (!showPassword) {
      document.getElementById('password').setAttribute('type', 'password')
    }
    setShowPassword(!showPassword)
  }

  return (
    <Wrapper className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>

      <input
        type={type}
        value={value}
        name={name}
        id={name}
        onChange={handleChange}
        className='form-input'
      />
      {type === 'password' && (
        <FaEye className='form-icon' onClick={togglePassword} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  .form-icon {
    position: absolute;
    right: 7px;
    top: 73%;
    transform: translateY(-50%);
    color: var(--gray);
    cursor: pointer;
    transition: var(--transition);
    opacity: 0.5;
    &:hover {
      color: var(--black);
      opacity: 1;
    }
  }
`

export default FormRow
