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
    SetDetail: 'SET_TODO_DETAIL',
    StartDraggingTodo: 'START_DRAGGING_TODO',
    DragTodo: 'DRAG_TODO',
    StopDraggingTodo: 'STOP_DRAGGING_TODO'
}

export interface TodoAction extends Action {
    id: number
}

export interface MoveAction extends Action {
    fromPos: number
    toPos: number
}

export interface SetValueAction extends TodoAction {
    value: Date | number | string
}

export interface DragAction extends Action {
    y: number
}

export interface StartDraggingAction extends TodoAction, DragAction {
}

export const addTodo = (position?: number): Action => {
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

export const setTodoStartHour = (id: number, startHour: Date): SetValueAction => {
    return {
        type: TodoActionType.SetStartHour,
        id,
        value: startHour
    }
}

export const setTodoDuration = (id: number, duration: number): SetValueAction => {
    return {
        type: TodoActionType.SetDuration,
        id,
        value: duration
    }
}

export const setTodoTask = (id: number, task: string): SetValueAction => {
    return {
        type: TodoActionType.SetTask,
        id,
        value: task
    }
}

export const setTodoDetail = (id: number, detail: string): SetValueAction => {
    return {
        type: TodoActionType.SetDetail,
        id,
        value: detail
    }
}

export const startDraggingTodo = (id: number, y: number): StartDraggingAction => {
    return {
        type: TodoActionType.StartDraggingTodo,
        id,
        y
    }
}

export const dragTodo = (y: number): DragAction => {
    return {
        type: TodoActionType.DragTodo,
        y
    }
}

export const stopDraggingTodo = (): Action => {
    return {
        type: TodoActionType.StopDraggingTodo
    }
}