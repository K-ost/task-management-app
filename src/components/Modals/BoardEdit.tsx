import { useState } from "react"
import { AddFieldColumns } from "../../helpers/helpers"
import { AddFieldType, BoardType, ColumnType, EditBoardPayload } from "../../types"
import AddFields from "../AddFields"
import Btn from "../Btn"
import FormInput from "../FormInput"
import FormLine from "../FormLine"
import ModalBox from "../ModalBox"
import { useForm } from "react-hook-form"
import { useAppDispatch } from "../../store/hooks"
import { editBoardReducer } from "../../store/appSlice"

interface IEditBoard {
  board: BoardType
  editBoard: boolean
  setEditBoard: React.Dispatch<React.SetStateAction<boolean>>
}

const EditBoard: React.FC<IEditBoard> = ({ board, editBoard, setEditBoard }) => {
  const dispatch = useAppDispatch()
  const [columns, setColumns] = useState<AddFieldType[]>([])

  // React hook form
  const { register, handleSubmit, formState: { errors } } = useForm({
    // defaultValues: {
    //   name: board?.name!
    // }
  })

  // editBoardHandler
  const editBoardHandler = (data: any) => {
    const editedBoard: EditBoardPayload = {
      cols: columns,
      name: data.name,
      id: board.id
    }
    dispatch(editBoardReducer(editedBoard))
    setEditBoard(false)
  }
  
  
  // Board Columns
  let boardCols: ColumnType[] = []
  if (board) {
    boardCols = board.columns
  }

  return (
    <ModalBox show={editBoard} close={() => setEditBoard(false)} title="Edit Board?">
      <form onSubmit={handleSubmit(editBoardHandler)}>
        <FormLine label="Board Name">
          <FormInput
            value={board?.name!}
            valid={register('name', {required: 'Required field', minLength: 3, maxLength: 80 })}
            error={errors && errors.name?.message}
          />
        </FormLine>
        <FormLine label="Board Columns">
          <AddFields btn="+ Add New Column" list={AddFieldColumns(boardCols)} setFields={setColumns} />
        </FormLine>
        <Btn type="submit" title="Save Changes" expand />
      </form>
    </ModalBox>
  )
}

export default EditBoard
