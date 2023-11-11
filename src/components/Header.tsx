import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { mobileSize } from "../helpers/helpers"
import chevronIcon from "../assets/icon-chevron-down.svg"
import { setSidebar } from "../store/appSlice"
import { AsideLogo } from "./Sidebar/Sidebar"

interface IHeader {
  children?: React.ReactNode
  title: string
}

// Styles
const HeadBox = styled.header`
  background: var(--color-main);
  border-bottom: 1px solid var(--color-line);
  display: flex;
  position: relative;
  z-index: 1010;
`
const HeadSection = styled.div`
  border-left: 1px solid var(--color-line);
  align-items: center;
  display: flex;
  min-height: var(--header);
  padding: 4px 24px;
  &:first-child { border-left: 0; }
  &.HeadSection_full { flex: 1; }
  ${AsideLogo} { margin: 0; }
  .dropdown { margin-left: 12px; }
  @media screen and (max-width: ${mobileSize}) {
    border: 0;
    padding: 4px 6px 4px 16px;
    .dropdown { margin-left: 8px; }
    &.HeadSection_logo { display: none !important; }
  }
`
const HeadTitle = styled.h1`
  color: var(--color-title);
  margin: 0 auto 0 0;
  @media screen and (max-width: ${mobileSize}) {
    display: none;
  }
`
const HeadTitleMobile = styled.h2<{ $hide: boolean }>`
  color: var(--color-title);
  display: none;
  margin: 0 auto 0 0;
  padding: 0 17px 0 0;
  position: relative;
  &::after {
    background: url(${chevronIcon}) center no-repeat;
    content: '';
    display: block;
    height: 6px;
    margin-top: -2px;
    position: absolute;
    right: 0;
    top: 50%;
    width: 10px;
    ${props => !props.$hide && 'transform: matrix(1,0,0,-1,0,0);'}
  }
  @media screen and (max-width: ${mobileSize}) {
    display: block;
  }
`

const Header: React.FC<IHeader> = ({ children, title }) => {
  const sidebar = useAppSelector(state => state.app.sidebar)
  const dispatch = useAppDispatch()

  return (
    <HeadBox>
      {!sidebar && <HeadSection className="HeadSection_logo">
        <AsideLogo />
      </HeadSection>}
      <HeadSection className="HeadSection_full">
        <div className="mobile_logo"></div>
        <HeadTitle>{title}</HeadTitle>
        <HeadTitleMobile $hide={sidebar} onClick={() => dispatch(setSidebar(!sidebar))}>{title}</HeadTitleMobile>
        {children}
      </HeadSection>
    </HeadBox>
  )
}

export default Header
