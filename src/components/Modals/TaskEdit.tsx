import { useState } from "react"
import { AddFieldSubtasks } from "../../helpers/helpers"
import { EditTaskPayloadType, SelectOptionType, TaskType } from "../../types"
import Btn from "../Btn"
import FormInput from "../FormInput"
import FormLine from "../FormLine"
import ModalBox from "../ModalBox"
import SelectBox from "../SelectBox"
import { useForm } from "react-hook-form"
import { useAppDispatch } from "../../store/hooks"
import { editTaskReducer } from "../../store/appSlice"

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
  const [subtasks, setSubtasks] = useState<any>([])
  const [status, setStatus] = useState<string>(task.status)
  const dispatch = useAppDispatch()

  // Validation of form
  const { register, handleSubmit, formState: { errors } } = useForm()

  // editTaskHandler
  const editTaskHandler = (data: any) => {
    const editedTask = {
      boardId,
      columnId,
      description: data.description,
      id: task.id,
      status,
      subtasks,
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
            valid={register('title', {required: 'Required field', minLength: 3, maxLength: 80 })}
            error={errors && errors.title?.message}
          />
        </FormLine>
        <FormLine label="Description">
          <FormInput value={task.description} type="area" valid={register('description')} />
        </FormLine>
        {/* <FormLine label="Subtasks">
          <AddFields btn="+ Add New Subtask" list={AddFieldSubtasks(task.subtasks)} setFields={setSubtasks} />
        </FormLine> */}
        <FormLine label="Current Status">
          <SelectBox handler={setStatus} val={columnName} options={optionsList} />
        </FormLine>
        <Btn title="Save Changes" type="submit" expand />
      </form>
    </ModalBox>
  )
}

export default TaskEdit
