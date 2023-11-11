import { useNavigate } from "react-router-dom"
import { removeBoard } from "../../store/appSlice"
import { useAppDispatch } from "../../store/hooks"
import { BoardType } from "../../types"
import Btn from "../Btn"
import ModalBox from "../ModalBox"

interface IDeleteBoard {
  board: BoardType
  delBoard: boolean
  setDelBoard: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteBoard: React.FC<IDeleteBoard> = ({ board, delBoard, setDelBoard }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // removeBoardHandler
  const removeBoardHandler = () => {
    dispatch(removeBoard(board?.id!))
    setDelBoard(false)
    navigate(`/`)
  }

  return (
    <ModalBox show={delBoard} close={() => setDelBoard(false)} title="Delete this board?" del>
      <p>Are you sure you want to delete the "{board?.name}" board? This action will remove all columns and tasks and cannot be reversed.</p>
      <div className="row">
        <div className="col-12 col-md-6">
          <Btn title="Delete" color="red" handler={removeBoardHandler} expand />
        </div>
        <div className="col-12 col-md-6">
          <Btn title="Cancel" color="secondary" handler={() => setDelBoard(false)} expand />
        </div>
      </div>
    </ModalBox>
  )
}

export default DeleteBoard
