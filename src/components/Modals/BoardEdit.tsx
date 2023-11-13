import { BoardType, EditBoardPayload } from "../../types"
import Btn from "../Btn"
import FormInput from "../FormInput"
import FormLine from "../FormLine"
import ModalBox from "../ModalBox"
import { useFieldArray, useForm } from "react-hook-form"
import { useAppDispatch } from "../../store/hooks"
import { editBoardReducer } from "../../store/appSlice"
import AddFields from "../AddFields"
import { useEffect, useMemo, useState } from "react"
import { AddFieldColumns } from "../../helpers/helpers"

interface IEditBoard {
  board: BoardType
  editBoard: boolean
  setEditBoard: React.Dispatch<React.SetStateAction<boolean>>
}

const EditBoard: React.FC<IEditBoard> = ({ board, editBoard, setEditBoard }) => {
  const dispatch = useAppDispatch()

  // objValues
  const objValues = {
    name: board && board.name,
    columns: board && AddFieldColumns(board.columns)
  }

  // Form validate
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: objValues
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns"
  })

  useEffect(() => {
    reset(objValues)
  }, [board])
  

  // editBoardHandler
  const editBoardHandler = (data: any) => {
    const editedBoard: EditBoardPayload = {
      columns: data.columns,
      name: data.name,
      id: board.id
    }
    dispatch(editBoardReducer(editedBoard))
    setEditBoard(false)
  }


  return (
    <ModalBox show={editBoard} close={() => setEditBoard(false)} title="Edit Board?">
      <form onSubmit={handleSubmit(editBoardHandler)}>
        <FormLine label="Board Name">
          <FormInput
            valid={register('name', {required: 'Required field', minLength: 3, maxLength: 80 })}
            error={errors && errors.name?.message}
          />
        </FormLine>
        
        <AddFields
          btn="+ Add New Column"
          fields={fields}
          label="Board Columns"
          append={append}
          remove={remove}
          errors={errors}
          register={register}
        />
        
        <Btn type="submit" title="Save Changes" expand />
      </form>
    </ModalBox>
  )
}

export default EditBoard
