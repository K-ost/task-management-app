import { Modal } from "react-bootstrap"
import styled from "styled-components"

interface IModalBox {
  children: React.ReactNode
  close: () => void
  del?: boolean
  show: boolean
  title?: string
  className?: string
}

const ModalBoxTitle = styled.h2<{ $del: boolean }>`
  color: var(--color-${props => props.$del ? 'red' : 'title'});
  margin: 0 50px var(--gap) 0;
`


const ModalBox: React.FC<IModalBox> = ({ children, className, close, del = false, show, title }) => {
  return (
    <>
      <Modal show={show} onHide={close} centered className={className}>
        <Modal.Body>
          <ModalBoxTitle $del={del}>{title}</ModalBoxTitle>
          {children}
        </Modal.Body>
      </Modal>
    </>    
  )
}

export default ModalBox
