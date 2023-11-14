import { DragDropContext, Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import Btn from "./Btn"
import Task from "./Task"
import Header from "./Header"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { onDragEnd } from "../store/appSlice"
import { Dropdown } from "react-bootstrap"
import { useState } from "react"
import DropDownBox from "./DropDownBox"
import AddCol from "./AddCol"
import { getOptions } from "../helpers/helpers"
import TaskAdd from "./Modals/TaskAdd"
import DeleteBoard from "./Modals/DeleteBoard"
import BoardEdit from "./Modals/BoardEdit"
import ColumnAdd from "./Modals/ColumnAdd"

interface IBoard {
  slug: string
}

// Styles
const ColumnDragArea = styled.div<{ $bg: boolean }>`
  background: ${props => props.$bg ? 'rgba(0,0,0,0.1)' : '0'};
  border-radius: var(--radius);
  flex-grow: 1;
  transition: var(--animate);
`

const Board: React.FC<IBoard> = ({ slug }) => {
  const boards = useAppSelector(state => state.app.boards)
  const dispatch = useAppDispatch()
  const board = boards.find(el => el.slug === slug)
  const [editBoard, setEditBoard] = useState<boolean>(false)
  const [delBoard, setDelBoard] = useState<boolean>(false)
  const [addColWin, setAddColWin] = useState<boolean>(false)
  const [addTaskWin, setAddTaskWin] = useState<boolean>(false)
  const selectOptions = getOptions(boards, board?.id!)

  return (
    <>
      <Header title={board?.name!}>
        <Btn
          title="+ Add New Task"
          size="large"
          handler={() => setAddTaskWin(true)}
          disabled={!board?.columns.length}
          className="addbtn"
        />
        <DropDownBox>
          <Dropdown.Item onClick={() => setEditBoard(true)}>Edit Board</Dropdown.Item>
          <Dropdown.Item className="color-red" onClick={() => setDelBoard(true)}>Delete Board</Dropdown.Item>
        </DropDownBox>
      </Header>

      <main className="main">

      {!board?.columns.length
        ? <div className="column_empty">
            <div>
              <h2>This board is empty. Create a new column to get started.</h2>
              <Btn title="+ Add New Column" handler={() => setAddColWin(true)} />
            </div>
          </div>
        :
        <div className="columns">
          <DragDropContext onDragEnd={result => dispatch(onDragEnd({ result, board: board?.slug!, columns: board?.columns! }))}>
            {board?.columns.map((column, index) => (
              <div className="column" key={column.id}>
                <div className="column-header">
                  {column.name} ({column.tasks.length})
                </div>
                <Droppable droppableId={index.toString()}>
                  {(provided, snapshot) => (
                    <ColumnDragArea
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      $bg={snapshot.isDraggingOver}
                    >
                      {column.tasks.map((task, index) => (
                        <Task
                          key={task.id}
                          task={task}
                          index={index}
                          columnId={column.id}
                          columnName={column.name}
                          boardId={board.id}
                        />
                      ))}
                      {provided.placeholder}
                    </ColumnDragArea>
                  )}
                </Droppable>
              </div>
            ))}
            <AddCol handler={setAddColWin} />
          </DragDropContext>
        </div>
        }
      </main>

      <ColumnAdd boardId={board?.id!} close={setAddColWin} show={addColWin} />

      <BoardEdit board={board!} editBoard={editBoard} setEditBoard={setEditBoard} />
      
      <DeleteBoard board={board!} delBoard={delBoard} setDelBoard={setDelBoard} />

      <TaskAdd addTaskWin={addTaskWin} board={board!} setAddTaskWin={setAddTaskWin} selectOptions={selectOptions} />
    </>
  )
}

export default Board
