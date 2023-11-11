import styled from "styled-components"

interface IFormLine {
  children: React.ReactNode
  label?: string
}

// Styles
const FormLineBox = styled.div`
  margin: 0 0 20px;
  &:last-child {
    margin: 0;
  }
`
export const FormLabel = styled.label`
  color: var(--color-label);
  display: block;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  margin: 0 0 8px;
`

const FormLine: React.FC<IFormLine> = ({ children, label }) => {
  return (
    <FormLineBox>
      {label && <FormLabel>{label}</FormLabel>}
      {children}
    </FormLineBox>
  )
}

export default FormLine
