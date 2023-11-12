export type SubTaskType = {
  title: string
  isCompleted: boolean
}

export type TaskType = {
  id: number
  title: string
  description: string
  status: string
  subtasks: SubTaskType[]
}

export type ColumnType = {
  id: number
  name: string
  tasks: TaskType[]
}

export type BoardType = {
  id: number
  name: string
  slug: string
  columns: ColumnType[]
}

export type onDragType = {
  result: any
  board: string
  columns: ColumnType[]
}

export type AddFieldType = {
  id: number
  title: string
}

export interface NewBoardPayload {
  name: string
  columns: AddFieldType[]
}

export interface NewColPayload {
  boardId: number
  name: string
}

export interface EditBoardPayload extends NewBoardPayload {
  id: number
}

export type SubtaskPayload = {
  checked: boolean
  subtask: string
  taskId: number
  columnId: number
  boardId: number
}

export type ChangeColPayload = {
  boardId: number
  destColumn: string
  sourceColumn: number
  task: TaskType
}

export type DeleteTaskPayload = {
  boardId: number
  columnId: number
  taskId: number
}

export interface NewTaskPayloadType {
  title: string
  description: string
  status: string
  subtasks: AddFieldType[]
  boardId: number
}

export interface EditTaskPayloadType extends NewTaskPayloadType {
  id: number
  columnId: number
}

export type SelectOptionType = {
  label: string
  value: string
}