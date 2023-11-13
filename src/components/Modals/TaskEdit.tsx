import { useEffect, useState } from "react"
import { AddFieldSubtasks } from "../../helpers/helpers"
import { EditTaskPayloadType, SelectOptionType, TaskType } from "../../types"
import Btn from "../Btn"
import FormInput from "../FormInput"
import FormLine from "../FormLine"
import ModalBox from "../ModalBox"
import SelectBox from "../SelectBox"
import { useFieldArray, useForm } from "react-hook-form"
import { useAppDispatch } from "../../store/hooks"
import { editTaskReducer } from "../../store/appSlice"
import AddFields from "../AddFields"

interface ITaskEdit {
  boardId: number
  columnId: number
  columnName: string
  editTaskPopup: boolean
  optionsList: SelectOptionType[]
  setEditTaskPopup: React.Dispatch<React.SetStateAction<boolean>>
  task: TaskType
}

const TaskEdit: React.FC<ITaskEdit> = ({ boardId, columnId, columnName, editTaskPopup, optionsList, setEditTaskPopup, task }) => {
  const [status, setStatus] = useState<string>(task.status)
  const dispatch = useAppDispatch()

  // objValues
  const objValues = {
    title: task.title,
    description: task.description,
    columns: task && AddFieldSubtasks(task.subtasks)
  }

  // Validation of form
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: objValues })
  const { fields, append, remove } = useFieldArray({ control, name: "columns" })

  useEffect(() => {
    reset(objValues)
  }, [task])

  // editTaskHandler
  const editTaskHandler = (data: any) => {
    const editedTask = {
      boardId,
      columnId,
      description: data.description,
      id: task.id,
      status,
      subtasks: data.columns,
      title: data.title
    } as EditTaskPayloadType
    dispatch(editTaskReducer(editedTask))
    setEditTaskPopup(false)
  }

  return (
    <ModalBox title="Edit task" show={editTaskPopup} close={() => setEditTaskPopup(false)}>
      <form onSubmit={handleSubmit(editTaskHandler)}>
        <FormLine label="Title">
          <FormInput
            value={task.title}
            valid={register('title', {required: 'Required field', maxLength: 80 })}
            error={errors && errors.title?.message}
          />
        </FormLine>

        <FormLine label="Description">
          <FormInput value={task.description} type="area" valid={register('description')} />
        </FormLine>

        <AddFields
          btn="+ Add New Subtask"
          fields={fields}
          label="Subtasks"
          append={append}
          remove={remove}
          errors={errors}
          register={register}
        />

        <FormLine label="Current Status">
          <SelectBox handler={setStatus} val={columnName} options={optionsList} />
        </FormLine>

        <Btn title="Save Changes" type="submit" expand />
      </form>
    </ModalBox>
  )
}

export default TaskEdit
