import { Dropdown } from "react-bootstrap"
import { AlignType } from "react-bootstrap/esm/types"

interface IDropDownBox {
  align?: AlignType
  children: React.ReactNode
}

const DropDownBox: React.FC<IDropDownBox> = ({ align = 'end', children }) => {
  return (
    <Dropdown align={align}>
      <Dropdown.Toggle className="dropdown-dots" aria-label="Dropdown dots">
        <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {children}
      </Dropdown.Menu>
    </Dropdown>
  )
}
export default DropDownBox
