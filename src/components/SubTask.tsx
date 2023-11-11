import styled from "styled-components"
import { SubTaskType } from "../types"
import check from "../assets/icon-check.svg"

interface ISubTask {
  el: SubTaskType
  handler: (checked: boolean, subtask: string) => void
}

// Styles
const Item = styled.div`
  margin: 0 0 10px;
  &:last-child { margin: 0; }
`
const Label = styled.label<{ $checked: boolean }>`
  align-items: center;
  background: var(--color-dark);
  border-radius: 4px;
  color: var(--color-${props => props.$checked ? 'text' : 'title'});
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  cursor: pointer;
  display: flex;
  padding: 13px 16px;
  transition: var(--animate);
  ${props => props.$checked && 'text-decoration: line-through;'}
  &:hover { background: rgba(99, 95, 199, 0.25); }
`
const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  background: var(--color-main) url(${check}) -9999px no-repeat;
  border: 1px solid rgba(130, 143, 163, 0.25);
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  height: 16px;
  margin: 0 10px 0 0;
  padding: 0;
  min-width: 16px;
  max-width: 16px;
  -webkit-appearance: none;
  &:checked {
    background-color: var(--color-purple);
    background-position: center;
    border-color: transparent;
  }
`

const SubTask: React.FC<ISubTask> = ({ el, handler }) => {
  return (
    <Item>
      <Label $checked={el.isCompleted}>
        <CheckBox
          defaultChecked={el.isCompleted}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e.target.checked, el.title)}
        />
        {el.title}
      </Label>
    </Item>
  )
}

export default SubTask
