import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"
import styled from "styled-components"

interface IFormInput {
  handler?: (val: string, index?: number) => void
  valid?: any
  type?: 'text' | 'area'
  value?: string
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | boolean
  placeholder?: string,
  name?: string
}

// Styles
export const InputWrap = styled.div`
  position: relative;
`
const InputStyles = `
  background: 0;
  border-radius: 4px;
  color: var(--color-title);
  height: var(--form-height);
  line-height: 20px;
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  padding: 9px 14px;
  outline: none;
  transition: var(--animate);
  width: 100%;
  -webkit-appearance: none;
  &:last-child { margin: 0; }
  &::placeholder { color: var(--placeholder); }
  &:focus { border-color: var(--color-purple); }
`
const Input = styled.input<{ $error: boolean }>`
  ${InputStyles}
  border: 1px solid ${props => props.$error ? 'var(--color-red) !important' : 'rgba(130, 143, 163, 0.25)'};
`
const Area = styled.textarea<{ $error: boolean }>`
  ${InputStyles}
  border: 1px solid ${props => props.$error ? 'var(--color-red)' : 'rgba(130, 143, 163, 0.25)'};
  height: 90px;
  resize: none;
`
export const Error = styled.div`
  color: var(--color-red);
  font-size: 11px;
  line-height: 14px;
  position: absolute;
  right: 12px;
  top: 50%;
  margin-top: -7px;
`

const FormInput: React.FC<IFormInput> = ({ handler, name, type = 'text', valid, value, error, placeholder }) => {
  return (
    <InputWrap>
      {type === 'text' &&
        <Input
          type={type}
          name={name}
          defaultValue={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler!(e.target.value)}
          $error={!!error}
          placeholder={placeholder}
          {...valid}
        />
      }
      {type === 'area' &&
        <Area
          defaultValue={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handler!(e.target.value)}
          $error={error}
          placeholder={placeholder}
          {...valid}
        />
      }
      {error && <Error>Can't be empty</Error>}
    </InputWrap>
  )
}

export default FormInput
