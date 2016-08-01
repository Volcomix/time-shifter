import { Action } from 'redux'

import Todo from '../model/Todo'

export const TodoActionType = {
    Add: 'ADD_TODO',
    Delete: 'DELETE_TODO',
    Move: 'MOVE_TODO',
    Toggle: 'TOGGLE_TODO',
    SetStartHour: 'SET_TODO_START_HOUR',
    SetDuration: 'SET_TODO_DURATION',
    SetTask: 'SET_TODO_TASK',
    SetDetail: 'SET_TODO_DETAIL'
}

export interface TodoAction extends Action, Todo {
    type: string
}

export interface MoveAction extends Action {
    type: string
    fromPos: number
    toPos: number
}

export const addTodo = (position?: number): TodoAction => {
    return {
        type: TodoActionType.Add
    }
}

export const deleteTodo = (id: number): TodoAction => {
    return {
        type: TodoActionType.Delete,
        id
    }
}

export const moveTodo = (fromPos: number, toPos: number): MoveAction => {
    return {
        type: TodoActionType.Move,
        fromPos,
        toPos
    }
}

export const toggleTodo = (id: number): TodoAction => {
    return {
        type: TodoActionType.Toggle,
        id
    }
}

export const setTodoStartHour = (id: number, startHour: Date): TodoAction => {
    return {
        type: TodoActionType.SetStartHour,
        id,
        startHour
    }
}

export const setTodoDuration = (id: number, duration: number): TodoAction => {
    return {
        type: TodoActionType.SetDuration,
        id,
        duration
    }
}

export const setTodoTask = (id: number, task: string): TodoAction => {
    return {
        type: TodoActionType.SetTask,
        id,
        task
    }
}

export const setTodoDetail = (id: number, detail: string): TodoAction => {
    return {
        type: TodoActionType.SetDetail,
        id,
        detail
    }
}