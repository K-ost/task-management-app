import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BoardType, ChangeColPayload, ColumnType, DeleteTaskPayload, NewBoardPayload, SubTaskType, SubtaskPayload, TaskType, NewTaskPayloadType, onDragType, EditBoardPayload, EditTaskPayloadType, NewColPayload } from '../types'
import { nameToVal } from '../helpers/helpers'

const LSName = 'boards'

// Define a type for the slice state
interface appState {
  boards: BoardType[]
  loading: boolean
  sidebar: boolean
  theme: boolean
}

// Define the initial state using that type
const initialState: appState = {
  boards: [],
  loading: true,
  sidebar: true,
  theme: false
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setBoards: (state) => {
      const boardsStorage = JSON.parse(localStorage.getItem('boards')!)
      state.boards = boardsStorage
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebar = action.payload
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.theme = true
        localStorage.setItem('theme', 'theme')
        document.body.setAttribute('data-theme', 'dark')
      } else {
        state.theme = false
        localStorage.removeItem('theme')
        document.body.setAttribute('data-theme', 'light')
      }
      
    },

    // setNewBoard
    setNewBoard: (state, action: PayloadAction<NewBoardPayload>) => {
      const newCols: ColumnType[] = action.payload.columns.map(el => {
        return { id: el.id, name: el.title, tasks: [] }
      })
      const newBoard: BoardType = {
        id: Date.now(),
        name: action.payload.name,
        slug: nameToVal(action.payload.name),
        columns: newCols
      }
      state.boards = [...state.boards, newBoard]
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },
    
    
    // editBoardReducer
    editBoardReducer: (state, action: PayloadAction<EditBoardPayload>) => {
      const currentBoard = state.boards.find(el => el.id === action.payload.id)
      
      const output = action.payload.columns.map(edCol => {
        let newCol = {} as ColumnType
        const existedCol = currentBoard?.columns ? !!currentBoard?.columns.find(el => el.id === edCol.id) : false

        // Creating new columns
        if (existedCol) {
          currentBoard?.columns.forEach(oldCol => {
            if (oldCol.id === edCol.id) {
              newCol = { id: edCol.id, name: edCol.title, tasks: oldCol.tasks } as ColumnType
            }
          })
        } else {
          newCol = { id: edCol.id, name: edCol.title, tasks: [] } as ColumnType
        }
        
        return newCol
      })
      
      currentBoard!.name = action.payload.name
      currentBoard!.columns = output
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },

    // removeBoard
    removeBoard: (state, action: PayloadAction<number>) => {
      state.boards = state.boards.filter(el => el.id !== action.payload)
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },

    // setColumn
    setColumn: (state, action: PayloadAction<NewColPayload>) => {
      const currentBoard = state.boards.find(el => el.id === action.payload.boardId)
      const newColumn: ColumnType = { id: Date.now(), name: action.payload.name, tasks: [] }
      currentBoard!.columns = [...currentBoard?.columns!, newColumn]
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },

    // onDragEnd
    onDragEnd: (state, action: PayloadAction<onDragType>) => {
      const result = action.payload.result
      if (!result.destination) return

      const source = result.source
      const destination = result.destination
      const currentBoard = state.boards.find(el => el.slug === action.payload.board)
      
      if (source.droppableId !== destination.droppableId) {
        
        const sourceColumn = action.payload.columns[source.droppableId]
        const destColumn = action.payload.columns[destination.droppableId]
        const sourceItems = [...sourceColumn.tasks]
        const destItems = [...destColumn.tasks]
        const [removed] = sourceItems.splice(source.index, 1)
        destItems.splice(destination.index, 0, removed)

        // State
        const sourceCol = currentBoard!.columns.find(col => col.id === sourceColumn.id)
        const destCol = currentBoard!.columns.find(col => col.id === destColumn.id)
        sourceCol!.tasks = sourceItems
        destCol!.tasks = destItems
        
      } else {

        const columnState = action.payload.columns[source.droppableId]
        const copiedItemsState = [...columnState.tasks]
        const [removedState] = copiedItemsState.splice(source.index, 1)
        copiedItemsState.splice(destination.index, 0, removedState)

        // State
        const currentCol = currentBoard!.columns.find(col => col.id === columnState.id)
        currentCol!.tasks = copiedItemsState

      }

      localStorage.setItem(LSName, JSON.stringify(state.boards))
    },

    // setTaskColumn
    setTaskColumn: (state, action: PayloadAction<ChangeColPayload>) => {
      const board = state.boards.find(el => el.id === action.payload.boardId)
      const sourceColumn = board?.columns.find(el => el.id === action.payload.sourceColumn)
      const destColumn = board?.columns.find(el => nameToVal(el.name) === action.payload.destColumn)

      sourceColumn!.tasks = sourceColumn!.tasks.filter(el => el.id !== action.payload.task.id)
      destColumn!.tasks = [...destColumn!.tasks, action.payload.task]
      
      localStorage.setItem(LSName, JSON.stringify(state.boards))
    },

    // setSubTaskStatus
    setSubTaskStatus: (state, action: PayloadAction<SubtaskPayload>) => {
      const board = state.boards.find(el => el.id === action.payload.boardId)
      const column = board?.columns.find(el => el.id === action.payload.columnId)
      const task = column?.tasks.find(el => el.id === action.payload.taskId)
      const subtask = task?.subtasks.find(el => el.title === action.payload.subtask)
      subtask!.isCompleted = action.payload.checked
      localStorage.setItem(LSName, JSON.stringify(state.boards))
    },

    // deleteTaskReducer
    deleteTaskReducer: (state, action: PayloadAction<DeleteTaskPayload>) => {
      const board = state.boards.find(el => el.id === action.payload.boardId)
      const column = board?.columns.find(el => el.id === action.payload.columnId)
      column!.tasks = column!.tasks.filter(el => el.id !== action.payload.taskId)
      localStorage.setItem(LSName, JSON.stringify(state.boards))
    },

    // setNewTask
    setNewTask: (state, action: PayloadAction<NewTaskPayloadType>) => {
      const subtasks: SubTaskType[] = action.payload.subtasks.map(el => {
        return { title: el.title, isCompleted: false }
      })
      const newTask = {
        id: Date.now(),
        description: action.payload.description,
        status: action.payload.status,
        title: action.payload.title,
        subtasks
      } as TaskType

      const board = state.boards.find(el => el.id === action.payload.boardId)
      const column = board?.columns.find(el => nameToVal(el.name) === action.payload.status)
      column!.tasks = [...column!.tasks, newTask]
      localStorage.setItem(LSName, JSON.stringify(state.boards))
    },

    // editTaskReducer
    editTaskReducer: (state, action: PayloadAction<EditTaskPayloadType>) => {
      const currentBoard = state.boards.find(el => el.id === action.payload.boardId)
      const currentColumn = currentBoard?.columns.find(el => el.id === action.payload.columnId)
      const currentDestColumn = currentBoard?.columns.find(el => nameToVal(el.name) === action.payload.status)
      const currentTask = currentColumn?.tasks.find(el => el.id === action.payload.id)

      currentTask!.title = action.payload.title
      currentTask!.description = action.payload.description
      currentTask!.status = action.payload.status

      // Cretion of subtasks
      const newSubtasks: SubTaskType[] = action.payload.subtasks.map(el => {
        const checkComplete = currentTask?.subtasks.find(s => s.title === el.title)
        let complete: boolean = false
        if (checkComplete) complete = checkComplete.isCompleted
        return { isCompleted: complete, title: el.title }
      })
      currentTask!.subtasks = newSubtasks

      if (currentColumn?.name !== action.payload.status) {
        const copiedTask = { ...currentTask! }
        currentColumn!.tasks = currentColumn!.tasks.filter(el => el.id !== action.payload.id)
        currentDestColumn!.tasks = [...currentDestColumn!.tasks, copiedTask]
      }
      localStorage.setItem(LSName, JSON.stringify(state.boards))
    }
  },
})

export const { setBoards, setLoading, setSidebar, setTheme, setNewBoard, removeBoard, setColumn, onDragEnd, setTaskColumn, setSubTaskStatus, deleteTaskReducer, setNewTask, editBoardReducer, editTaskReducer } = appSlice.actions
export default appSlice.reducer