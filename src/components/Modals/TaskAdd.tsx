import { useForm } from 'react-hook-form'
import ModalBox from '../ModalBox'
import { nameToVal } from '../../helpers/helpers'
import { setNewTask } from '../../store/appSlice'
import { useAppDispatch } from '../../store/hooks'
import { AddFieldType, BoardType, NewTaskPayloadType, SelectOptionType } from '../../types'
import FormLine from '../FormLine'
import FormInput from '../FormInput'
import AddFields from '../AddFields'
import SelectBox from '../SelectBox'
import Btn from '../Btn'
import { useState } from 'react'

interface IAddTaskModal {
  addTaskWin: boolean
  board: BoardType
  selectOptions: SelectOptionType[]
  setAddTaskWin: React.Dispatch<React.SetStateAction<boolean>>
}

const AddTaskModal: React.FC<IAddTaskModal> = ({ addTaskWin, board, selectOptions, setAddTaskWin }) => {
  const dispatch = useAppDispatch()
  const [subtasks, setSubtasks] = useState<AddFieldType[]>([])
  const [statusTask, setStatusTask] = useState<string>('')
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  // createNewTask
  const createNewTask = (data: any) => {
    const newTask = {
      description: data.description,
      subtasks,
      status: statusTask ? statusTask : nameToVal(board?.columns[0].name!),
      title: data.title,
      boardId: board?.id
    } as NewTaskPayloadType
    dispatch(setNewTask(newTask))
    reset()
    setAddTaskWin(false)
  }

  return (
    <ModalBox show={addTaskWin} close={() => setAddTaskWin(false)} title="Add New Task">
      <form onSubmit={handleSubmit(createNewTask)}>
        <FormLine label="Title">
          <FormInput
            placeholder="e.g. Take coffee break"
            valid={register("title", {required: 'Required field', maxLength: 80})}
            error={errors && errors.title?.message!}
          />
        </FormLine>
        <FormLine label="Description">
          <FormInput
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            type="area"
            valid={register("description")}
          />
        </FormLine>
        <FormLine label="Subtasks">
          <AddFields btn="+ Add New Subtask" setFields={setSubtasks} list={[]} />
        </FormLine>
        <FormLine label="Status">
          <SelectBox options={selectOptions} handler={setStatusTask} />
        </FormLine>
        <Btn type="submit" title="Create Task" expand />
      </form>
    </ModalBox>
  )
}

export default AddTaskModal
