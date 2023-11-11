import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setSidebar } from '../../store/appSlice'
import styled from 'styled-components'
import hideIcon from "../../assets/icon-hide-sidebar.svg"
import showIcon from "../../assets/icon-show-sidebar.svg"

// Styles
const SideToggle = styled.button<{ $shown: boolean }>`
  background: ${props => props.$shown ? '0' : 'var(--color-purple)'};
  background-image: url(${props => props.$shown ? hideIcon : showIcon});
  background-position: ${props => props.$shown ? '0 center' : 'center'};
  background-repeat: no-repeat;
  border: 0;
  border-radius: ${props => props.$shown ? '0' : '0 100px 100px 0'};
  color: var(--color-light);
  font-size: 15px;
  display: block;
  margin: 0;
  height: 48px;
  line-height: 20px;
  font-weight: 700;
  outline: none;
  padding: 0 0 0 32px;
  position: absolute;
  bottom: 32px;
  left: ${props => props.$shown ? 'var(--gap)' : '0'};
  width: ${props => props.$shown ? 'auto' : '56px'};
  transition: var(--animate);
  -webkit-appearance: none;
  ${props => !props.$shown && `
    &:hover { background-color: var(--color-purple-hover); }
  `}
  @media screen and (max-width: 720px) {
    display: none;
  }
`

const SidebarToggle: React.FC = () => {
  const sidebar = useAppSelector(state => state.app.sidebar)
  const dispatch = useAppDispatch()

  return (
    <SideToggle className="sidebar_toggle" onClick={() => dispatch(setSidebar(!sidebar))} $shown={sidebar}>
      {sidebar && <span>Hide Sidebar</span>}
    </SideToggle>
  )
}

export default SidebarToggle
