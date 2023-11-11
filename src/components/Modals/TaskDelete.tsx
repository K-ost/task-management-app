import { deleteTaskReducer } from "../../store/appSlice"
import { useAppDispatch } from "../../store/hooks"
import { TaskType } from "../../types"
import Btn from "../Btn"
import ModalBox from "../ModalBox"
import { TaskDesc } from "../Task"

interface ITaskDelete {
  boardId: number
  columnId: number
  deleteTask: boolean
  setDeleteTask: React.Dispatch<React.SetStateAction<boolean>>
  setDetails: React.Dispatch<React.SetStateAction<boolean>>
  task: TaskType
}

const TaskDelete: React.FC<ITaskDelete> = ({ boardId, columnId, deleteTask, setDeleteTask, setDetails, task }) => {
  const dispatch = useAppDispatch()
  
  // deleteTaskHandler
  const deleteTaskHandler = () => {
    dispatch(deleteTaskReducer({ boardId, columnId, taskId: task.id }))
    setDetails(false)
  }

  return (
    <ModalBox title="Delete this task?" show={deleteTask} close={() => setDeleteTask(false)} del>
      <TaskDesc>
        Are you sure you want to delete the "{task.title}" task and its subtasks? This action cannot be reversed.
      </TaskDesc>
      <div className="row">
        <div className="col-12 col-md-6">
          <Btn title="Delete" color="red" handler={deleteTaskHandler} expand />
        </div>
        <div className="col-12 col-md-6">
          <Btn title="Cancel" color="secondary" handler={() => setDeleteTask(false)} expand />
        </div>
      </div>
    </ModalBox>
  )
}

export default TaskDelete
