import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import styled from "styled-components";

interface ISidebarNav {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// Styles
const NavBox = styled.nav`
  flex: 1;
`;
const NavBoxTitle = styled.h4`
  color: var(--color-grey);
  margin: 0;
  padding: 0 0 19px var(--navlink-icon);
`;
const NavBoxList = styled.ul`
  margin: 0;
  padding: 0 var(--gap) 0 0;
  li {
    list-style: none;
    font-size: 15px;
    line-height: 20px;
    a.active {
      background: var(--color-purple);
      color: var(--color-white);
      svg path {
        fill: var(--color-white);
      }
    }
  }
`;
const itemStyles = `
  border-radius: 0 40px 40px 0;
  color: var(--color-text);
  display: block;
  padding: 14px 20px 15px var(--navlink-lp);
  position: relative;
  text-decoration: none;
  svg {
    display: block;
    left: var(--navlink-icon);
    margin-top: -8px;
    position: absolute;
    top: 50%;
  }
`;
const NavItemLink = styled(NavLink)`
  ${itemStyles}
`;
const AddCol = styled.button`
  ${itemStyles}
  background: 0;
  border: 0;
  color: var(--color-purple);
  cursor: pointer;
  outline: none;
  -webkit-appearance: none;
  svg path {
    fill: var(--color-purple);
  }
`;

const SidebarNav: React.FC<ISidebarNav> = ({ setModal }) => {
  const boards = useAppSelector((state) => state.app.boards);

  return (
    <NavBox>
      <NavBoxTitle>ALL BOARDS ({boards.length})</NavBoxTitle>
      <NavBoxList>
        {boards.map((item) => (
          <li key={item.id}>
            <NavItemLink to={item.slug}>
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                  fill="#828FA3"
                />
              </svg>
              {item.name}
            </NavItemLink>
          </li>
        ))}
        <li>
          <AddCol onClick={() => setModal(true)} data-testid="addBoard">
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                fill="#828FA3"
              />
            </svg>
            + Create New Board
          </AddCol>
        </li>
      </NavBoxList>
    </NavBox>
  );
};

export default SidebarNav;
