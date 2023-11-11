import { useForm } from "react-hook-form"
import Btn from "../Btn"
import ModalBox from "../ModalBox"
import FormLine from "../FormLine"
import FormInput from "../FormInput"
import { NewColPayload } from "../../types"
import { useAppDispatch } from "../../store/hooks"
import { setColumn } from "../../store/appSlice"

interface IColumnAdd {
  boardId: number
  show: boolean
  close: React.Dispatch<React.SetStateAction<boolean>>
}

const ColumnAdd: React.FC<IColumnAdd> = ({ boardId, close, show }) => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  // newColHandler
  const newColHandler = (data: any) => {
    const newCol: NewColPayload = { boardId, name: data.name }
    dispatch(setColumn(newCol))
    reset()
    close(false)
  }

  return (
    <ModalBox close={() => close(false)} show={show} title="Add New Column">
      <form onSubmit={handleSubmit(newColHandler)}>
        <FormLine label="Name">
          <FormInput
            placeholder="Column Name"
            valid={register("name", {required: 'Required field', maxLength: 80})}
            error={errors && errors.name?.message!}
          />
        </FormLine>
        <Btn title="Add Column" expand type="submit" />
      </form>
    </ModalBox>
  )
}

export default ColumnAdd
