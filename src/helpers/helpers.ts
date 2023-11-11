export const mobileSize = '720px'

import { AddFieldType, BoardType, ColumnType, SelectOptionType, SubTaskType, TaskType } from "../types"

export const columnsLS: ColumnType[] = JSON.parse(localStorage.getItem('columns')!)
export const tasksLS: TaskType[] = JSON.parse(localStorage.getItem('tasks')!)


// Name to Value
export const nameToVal = (str: string) => str.toLowerCase().split(' ').join('-')

// Getting boards for sidebar
export const getBoards = (): BoardType[] => {
  const boards: BoardType[] = JSON.parse(localStorage.getItem('boards')!)
  return boards
}

// getOptions
export const getOptions = (boards: BoardType[], boardId: number): SelectOptionType[] => {
  const currentBoard = boards.find(el => el.id === boardId!)
  return currentBoard?.columns!.map(el => {
    return { label: el.name, value: nameToVal(el.name) }
  })!
}

// AddFieldColumns
export const AddFieldColumns = (array: ColumnType[]): AddFieldType[] => {
  let countId = 0
  return array!.map(el => {
    return {
      id: array.length ? el.id : countId += 1,
      title: el.name
    }
  })
}

// AddFieldSubtasks
export const AddFieldSubtasks = (array: SubTaskType[]): AddFieldType[] => {
  let countId = 0
  return array.map(el => {
    return { id: countId+=1, title: el.title }
  })
}