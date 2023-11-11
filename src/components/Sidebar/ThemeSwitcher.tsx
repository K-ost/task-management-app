import styled from "styled-components"
import sun from "../../assets/icon-light-theme.svg"
import moon from "../../assets/icon-dark-theme.svg"
import { mobileSize } from "../../helpers/helpers"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setTheme } from "../../store/appSlice"

const Switcher = styled.div`
  margin: var(--gap) var(--gap) 84px;
  @media screen and (max-width: ${mobileSize}) {
    margin: 0 var(--main);
  }
`
const SwitcherBody = styled.div`
  align-items: center;
  background: var(--color-dark);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  height: 48px;
`
const SwitcherLabel = styled.label`
  cursor: pointer;
  display: block;
  position: relative;
  padding: 0 40px;
  &::after, &::before {
    background-position: center;
    background-repeat: no-repeat;
    content: '';
    display: block;
    height: 30px;
    margin-top: -15px;
    position: absolute;
    top: 50%;
    width: 30px;
  }
  &::after { background-image: url(${moon}); right: 0; }
  &::before { background-image: url(${sun}); left: 0; }
`
const Toggle = styled.input.attrs({ type: "checkbox" })`
  background: var(--color-purple);
  border: 0;
  border-radius: 20px;
  cursor: pointer;
  display: block;
  height: 20px;
  margin: 0;
  padding: 0;
  position: relative;
  width: 36px;
  -webkit-appearance: none;
  &::before {
    background: var(--color-white);
    border-radius: 16px;
    content: '';
    display: block;
    height: 16px;
    left: 2px;
    position: absolute;
    top: 2px;
    transition: var(--animate);
    width: 16px;
  }
  &:checked::before { transform: translateX(16px); }
`

const ThemeSwitcher: React.FC = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.app.theme)

  return (
    <Switcher>
      <SwitcherBody>
        <SwitcherLabel>
          <Toggle
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setTheme(e.target.checked))}
            checked={theme}
          />
        </SwitcherLabel>
      </SwitcherBody>
    </Switcher>
  )
}

export default ThemeSwitcher
