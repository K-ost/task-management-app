import { useFieldArray, useForm } from 'react-hook-form'
import ModalBox from '../ModalBox'
import { nameToVal } from '../../helpers/helpers'
import { setNewTask } from '../../store/appSlice'
import { useAppDispatch } from '../../store/hooks'
import { BoardType, NewTaskPayloadType, SelectOptionType } from '../../types'
import FormLine from '../FormLine'
import FormInput from '../FormInput'
import SelectBox from '../SelectBox'
import Btn from '../Btn'
import { useState } from 'react'
import AddFields from '../AddFields'

interface IAddTaskModal {
  addTaskWin: boolean
  board: BoardType
  selectOptions: SelectOptionType[]
  setAddTaskWin: React.Dispatch<React.SetStateAction<boolean>>
}

const AddTaskModal: React.FC<IAddTaskModal> = ({ addTaskWin, board, selectOptions, setAddTaskWin }) => {
  const [statusTask, setStatusTask] = useState<string>('')
  const dispatch = useAppDispatch()
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      columns: [] as any
    }
  })
  const { fields, append, remove } = useFieldArray({ control, name: "columns" })

  // createNewTask
  const createNewTask = (data: any) => {
    const newTask = {
      description: data.description,
      subtasks: data.columns,
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
            valid={register("title", {required: 'Required field', minLength: { value: 3, message: 'Min' }, maxLength: 80})}
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
        
        <AddFields
          btn="+ Add New Subtask"
          fields={fields}
          label="Subtasks"
          append={append}
          remove={remove}
          errors={errors}
          register={register}
        />

        <FormLine label="Status">
          <SelectBox options={selectOptions} handler={setStatusTask} />
        </FormLine>

        <Btn type="submit" title="Create Task" expand />
      </form>
    </ModalBox>
  )
}

export default AddTaskModal
