import { useFieldArray, useForm } from "react-hook-form"
import { useAppDispatch } from "../../store/hooks"
import ModalBox from "../ModalBox"
import { setNewBoard, setSidebar } from "../../store/appSlice"
import FormLine from "../FormLine"
import FormInput from "../FormInput"
import AddFields from "../AddFields"
import Btn from "../Btn"
import { NewBoardPayload } from "../../types"

interface IAddBoardModal {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AddBoardModal: React.FC<IAddBoardModal> = ({ modal, setModal }) => {
  const dispatch = useAppDispatch()

  // Form validate
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      columns: [] as any
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns"
  })

  // createNewBoard
  const createNewBoard = (data: NewBoardPayload) => {
    dispatch(setNewBoard(data))
    setModal(false)
    dispatch(setSidebar(true))
    reset()
  }
  
  

  return (
    <ModalBox title="Add New Board" show={modal} close={() => setModal(false)}>
      <form onSubmit={handleSubmit(createNewBoard)}>
        <FormLine label="Name">
          <FormInput
            placeholder="e.g. Web Design"
            valid={register("name", {required: 'Required field', minLength: { value: 3, message: 'Min' }, maxLength: 80})}
            error={errors && errors.name?.message!}
          />
        </FormLine>

        <AddFields
          btn="+ Add New Column"
          fields={fields}
          label="Columns"
          append={append}
          remove={remove}
          errors={errors}
          register={register}
        />

        <Btn type="submit" title="Create New Board" expand />
      </form>
    </ModalBox>
  )
}

export default AddBoardModal
