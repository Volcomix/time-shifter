import { Action } from 'redux'

import Todo from '../model/Todo'

export enum TodoActionType {
    Add = 1,
    Delete,
    Move,
    Toggle,
    SetStartHour,
    SetDuration,
    SetTask,
    SetDetail
}

export interface TodoAction extends Action, Todo {
    type: TodoActionType
}

export interface StartHourAction extends Action {
    type: TodoActionType
    id: number
    startHour: Date
    difference?: number
}

export interface DurationAction extends Action {
    type: TodoActionType
    id: number
    duration: number
    startHour: Date
    difference: number
}

export interface MoveAction extends Action {
    type: TodoActionType
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

export const setTodoStartHour = (
    id: number,
    startHour: Date,
    difference?: number
): StartHourAction => {
    return {
        type: TodoActionType.SetStartHour,
        id,
        startHour,
        difference
    }
}

export const setTodoDuration = (
    id: number,
    duration: number,
    startHour: Date,
    difference: number
): DurationAction => {
    return {
        type: TodoActionType.SetDuration,
        id,
        duration,
        startHour,
        difference
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