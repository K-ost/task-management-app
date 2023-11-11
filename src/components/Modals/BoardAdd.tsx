import { Controller, useFieldArray, useForm } from "react-hook-form"
import { useAppDispatch } from "../../store/hooks"
import ModalBox from "../ModalBox"
import { setNewBoard, setSidebar } from "../../store/appSlice"
import { useState } from "react"
import FormLine from "../FormLine"
import FormInput from "../FormInput"
import AddFields from "../AddFields"
import Btn from "../Btn"
import { AddFieldType } from "../../types"

interface IAddBoardModal {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AddBoardModal: React.FC<IAddBoardModal> = ({ modal, setModal }) => {
  const dispatch = useAppDispatch()
  const [cols, setCols] = useState<AddFieldType[]>([])

  // Form validate
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  })

  const createNewBoard = (data: any) =>{
    dispatch(setNewBoard({ cols, name: data.name }))
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
            valid={register("name", {required: 'Required field', maxLength: 80})}
            error={errors && errors.name?.message!}
          />
        </FormLine>

        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <input {...register(`columns.${index}.title`, {required: 'Required field'})} />
              <button type="button" onClick={() => remove(index)}>Delete</button>
              
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => append({ title: '' })}
        >
          append
        </button>

        {/* <AddFields setFields={setCols} btn="+ Add New Column" label="Columns" list={[]} /> */}
        <Btn type="submit" title="Create New Board" expand />
      </form>
    </ModalBox>
  )
}

export default AddBoardModal
