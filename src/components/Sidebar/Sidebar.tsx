import styled from "styled-components"
import ThemeSwitcher from "./ThemeSwitcher"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { useState } from "react"
import { setSidebar } from "../../store/appSlice"
import SidebarToggle from "./SidebarToggle"
import { mobileSize } from "../../helpers/helpers"
import SidebarNav from "./SidebarNav"
import BoardAdd from "../Modals/BoardAdd"

// Styles
const Aside = styled.aside<{ $hide: boolean }>`
  background: var(--color-main);
  overflow: hidden;
  position: relative;
  transition: all 200ms linear;
  width: ${props => props.$hide ? 'var(--sidebar)' : '0'};
  @media screen and (max-width: ${mobileSize}) {
    border-radius: 8px;
    box-shadow: 0px 10px 20px 0px rgba(54, 78, 126, 0.25);
    left: 50%;
    opacity: ${props => props.$hide ? '0' : '1'};
    padding: 16px 0;
    position: absolute;
    top: 80px;
    transform: translateX(-50%);
    visibility: ${props => props.$hide ? 'hidden' : 'visible'};
    width: 264px !important;
    z-index: 1000;
    .sidebar_logo { display: none; }
  }
`
const AsideOverlay = styled.div<{ $hide: boolean }>`
  background: rgba(0,0,0,0.5);
  bottom: 0;
  display: none;
  left: 0;
  opacity: ${props => props.$hide ? '0' : '1'};
  position: absolute;
  right: 0;
  top: 0;
  visibility: ${props => props.$hide ? 'hidden' : 'visible'};
  z-index: 999;
  @media screen and (max-width: ${mobileSize}) {
    display: block;
  }
`
const AsideInner = styled.div`
  border-right: 1px solid var(--color-line);
  display: flex;
  height: 100%;
  flex-direction: column;
  width: var(--sidebar);
  @media screen and (max-width: ${mobileSize}) {
    border: 0;
    width: auto;
  }
`
export const AsideLogo = styled.div`
  background: var(--logo) 0 0 no-repeat;
  height: 27px;
  margin: 32px 0 54px 32px;
  width: 160px;
  @media screen and (max-width: ${mobileSize}) {
    display: none;
  }
`

const Sidebar: React.FC = () => {
  const sidebar = useAppSelector(state => state.app.sidebar)
  const dispatch = useAppDispatch()
  const [modal, setModal] = useState<boolean>(false)

  return (
    <>
      <Aside $hide={sidebar} className="backside">
        <AsideInner>
          <AsideLogo />
          <SidebarNav setModal={setModal} />
          <ThemeSwitcher />
        </AsideInner>
      </Aside>
      <AsideOverlay $hide={sidebar} onClick={() => dispatch(setSidebar(!sidebar))} />

      <SidebarToggle />

      <BoardAdd modal={modal} setModal={setModal} />
    </>
  )
}

export default Sidebar
