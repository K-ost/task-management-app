import styled from "styled-components"
import { TaskType } from "../types"
import React, { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import SubTask from "./SubTask"
import ModalBox from "./ModalBox"
import DropDownBox from "./DropDownBox"
import { Dropdown } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { setSubTaskStatus, setTaskColumn } from "../store/appSlice"
import SelectBox from "./SelectBox"
import { getOptions } from "../helpers/helpers"
import FormLine from "./FormLine"
import TaskDelete from "./Modals/TaskDelete"
import TaskEdit from "./Modals/TaskEdit"

interface ITask {
  boardId: number
  columnId: number
  columnName: string
  index: number
  task: TaskType
}

// Styles
const TaskItem = styled.div<{ $over: boolean}>`
  background: var(--color-${props => props.$over ? 'purple' : 'main'});
  color: var(--color-${props => props.$over ? 'white' : 'title'});
  border-radius: 8px;
  box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.05);
  padding: 23px 16px;
  &:hover h3 { color: var(--color-purple); }
`
const TaskItemTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 19px;
  margin: 0 0 8px;
  transition: var(--animate);
`
const TaskItemText = styled.div`
  color: var(--color-text);
  font-size: 12px;
  line-height: 15px;
  font-weight: 500;
  margin: 0;
`
export const TaskDesc = styled.div`
  margin: 0 0 var(--gap);
`
const SubTaskTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  margin: 0 0 16px;
`

const Task: React.FC<ITask> = ({ boardId, columnId, columnName, index, task }) => {
  const boards = useAppSelector(state => state.app.boards)
  const [details, setDetails] = useState<boolean>(false)
  const [editTaskPopup, setEditTaskPopup] = useState<boolean>(false)
  const [delTaskPopup, setDelTaskPopup] = useState<boolean>(false)
  const completedTasks = task.subtasks.filter(el => el.isCompleted)
  const dispatch = useAppDispatch()
  const optionsList = getOptions(boards, boardId)
  

  // Change substask status
  const changeSubTaskHandler = (checked: boolean, subtask: string) => {
    dispatch(setSubTaskStatus({ checked, subtask, taskId: task.id, columnId, boardId }))
  }


  // Change task status
  const changeStatusHandler = (val: string) => {
    dispatch(setTaskColumn({ boardId, sourceColumn: columnId, destColumn: val, task }))
    setDetails(false)
  }


  // editTaskHandler
  const editTaskHandler = () => {
    setEditTaskPopup(true)
    setDetails(false)
  }


  // deleteTaskHandler
  const deleteTaskPopup = () => {
    setDelTaskPopup(true)
    setDetails(false)
  }

  
  return (
    <>
      <Draggable
        draggableId={task.id.toString()}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ margin: '0 0 20px', ...provided.draggableProps.style }}
          >
            <TaskItem $over={snapshot.isDragging} onClick={() => setDetails(true)}>
              <TaskItemTitle>{task.title}</TaskItemTitle>
              <TaskItemText>
                {task.subtasks.length
                  ? `${completedTasks.length} of ${task.subtasks.length} subtasks`
                  : 'There are no subtasks in this task'
                }
              </TaskItemText>
            </TaskItem>
          </div>
        )}
      </Draggable>


      <ModalBox title={task.title} show={details} close={() => setDetails(false)}>
        <DropDownBox>
          <Dropdown.Item onClick={editTaskHandler}>Edit Task</Dropdown.Item>
          <Dropdown.Item className="color-red" onClick={deleteTaskPopup}>Delete Task</Dropdown.Item>
        </DropDownBox>
        <TaskDesc dangerouslySetInnerHTML={{__html: task.description}} />
        <TaskDesc>
          <SubTaskTitle>Subtasks ({completedTasks.length} of {task.subtasks.length})</SubTaskTitle>
          {task.subtasks.map(subtask => <SubTask key={subtask.title} el={subtask} handler={changeSubTaskHandler} />)}
        </TaskDesc>
        <FormLine label="Current Status">
          <SelectBox handler={changeStatusHandler} val={columnName} options={optionsList} />
        </FormLine>
      </ModalBox>


      <TaskEdit
        boardId={boardId}
        columnId={columnId}
        editTaskPopup={editTaskPopup}
        setEditTaskPopup={setEditTaskPopup}
        task={task}
        optionsList={optionsList}
        columnName={columnName}
      />

      <TaskDelete
        boardId={boardId}
        columnId={columnId}
        deleteTask={delTaskPopup}
        setDeleteTask={setDelTaskPopup}
        setDetails={setDetails}
        task={task}
      />
    </>
  )
}

export default Task
