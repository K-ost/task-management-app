import React from "react"
import styled from "styled-components"
import { mobileSize } from "../helpers/helpers"
import plusImg from "../assets/icon-add-task-mobile.svg"

type BtnColor = 'purple' | 'secondary' | 'red'
type BtnSize = 'default' | 'large'

interface IBtn {
  color?: BtnColor
  expand?: boolean
  handler?: (e: React.MouseEvent<HTMLButtonElement>) => void
  title: string
  disabled?: boolean
  size?: BtnSize
  className?: string
  type?: "button" | "reset" | "submit"
}

// Styles
const Button = styled.button<{ $color: BtnColor, $expand: boolean, $size: BtnSize }>`
  background: var(--color-${props => props.$color});
  border: 0;
  border-radius: var(--form-height);
  color: var(--color-${props => props.$color === 'secondary' ? 'purple' : 'white'});
  cursor: pointer;
  display: ${props => props.$expand ? 'block' : 'inline-block'};
  font-size: 13px;
  font-weight: bold;
  line-height: 20px;
  outline: none;
  padding: ${props => props.$size === 'large' ? '14px 30px' : '10px 24px'};
  width: ${props => props.$expand ? '100%' : 'auto'};
  transition: var(--animate);
  -webkit-appearance: none;
  &:hover {
    background: var(--color-${props => props.$color}-hover);
  }
  &:disabled {
    cursor: default;
    opacity: 0.25;
    &:hover {
      background: var(--color-${props => props.$color});
    }
  }
  @media screen and (max-width: ${mobileSize}) {
    &.addbtn {
      background-image: url(${plusImg});
      background-position: center;
      background-repeat: no-repeat;
      height: 32px;
      text-indent: -9999px;
      width: 48px;
      padding: 0;
    }
  }
`

const Btn: React.FC<IBtn> = ({ className, color = 'purple', expand = false, handler, title, disabled, size = 'default', type = 'button' }) => {
  return (
    <Button
      $color={color}
      $expand={expand}
      disabled={disabled}
      $size={size}
      onClick={handler}
      className={className}
      type={type}
    >{title}</Button>
  )
}

export default Btn
