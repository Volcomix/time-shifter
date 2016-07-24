import { Action } from 'redux'

import Todo from '../model/Todo'
import { TodoAction, TodoActionType } from '../actions'

const todo = (state: Todo, action: TodoAction): Todo => {
    switch (action.type) {
        case TodoActionType.Add:
            return {
                id: action.id,
                position: action.position,
                isDone: false
            }
        case TodoActionType.Toggle:
            if (state.id !== action.id) {
                return state
            }

            return Object.assign({}, state, {
                isDone: !state.isDone
            })
        case TodoActionType.SetStartHour:
            if (state.id !== action.id) {
                return state
            }

            return Object.assign({}, state, {
                startHour: action.startHour
            })
        case TodoActionType.SetDuration:
            if (state.id !== action.id) {
                return state
            }

            return Object.assign({}, state, {
                duration: action.duration
            })
        case TodoActionType.SetTask:
            if (state.id !== action.id) {
                return state
            }

            return Object.assign({}, state, {
                task: action.task
            })
        case TodoActionType.SetDetail:
            if (state.id !== action.id) {
                return state
            }

            return Object.assign({}, state, {
                detail: action.detail
            })
        default:
            return state
    }
}

const todos = (state: Todo[] = [], action: TodoAction): Todo[] => {
    switch (action.type) {
        case TodoActionType.Add:
            return [
                ...state,
                todo(undefined, action)
            ]
        case TodoActionType.Delete:
            return state.filter(todo =>
                todo.id === action.id
            )
        case TodoActionType.Move:
            return state // TODO
        case TodoActionType.Toggle:
        case TodoActionType.SetStartHour:
        case TodoActionType.SetDuration:
        case TodoActionType.SetTask:
        case TodoActionType.SetDetail:
            return state.map(t =>
                todo(t, action)
            )
        default:
            return state
    }
}

export default todos