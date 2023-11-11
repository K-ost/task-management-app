import styled from "styled-components"

interface IAddCol {
  handler: React.Dispatch<React.SetStateAction<boolean>>
}

// Styles
const AddColWrap = styled.div`
  padding-right: var(--main);
`
const AddColWrapInner = styled.div`
  align-items: center;
  background: var(--add);
  border-radius: 6px;
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  justify-content: center;
  min-height: 100%;
  min-width: var(--column);
  max-width: var(--column);
  transition: var(--animate);
  h1 { margin: 0; }
  &:hover {
    background: rgba(0,0,0,0.12);
    h1 { color: var(--color-purple); }
  }
}
`

const AddCol: React.FC<IAddCol> = ({ handler }) => {
  return (
    <AddColWrap>
      <AddColWrapInner onClick={() => handler(true)}>
        <h1>+ New Column</h1>
      </AddColWrapInner>
    </AddColWrap>
  )
}

export default AddCol
