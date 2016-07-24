import { Action } from 'redux'

import Todo from '../model/Todo'
import { TodoAction, TodoActionType } from '../actions'

const todos = (state: Todo[] = [], action: TodoAction): Todo[] => {
    switch (action.type) {
        case TodoActionType.Add:
            return [
                ...state,
                {
                    id: action.id,
                    position: action.position
                }
            ]
        case TodoActionType.Delete:
            return state.filter(todo => todo.id === action.id)
        case TodoActionType.Move:
            return state // TODO
        case TodoActionType.Toggle:
            return state.map(todo => {
                if (todo.id === action.id) {
                    return Object.assign({}, todo, {
                        isDone: !todo.isDone
                    })
                }
                return todo
            })
        case TodoActionType.SetStartHour:
            return state.map(todo => {
                if (todo.id === action.id) {
                    return Object.assign({}, todo, {
                        startHour: todo.startHour
                    })
                }
                return todo
            })
        case TodoActionType.SetDuration:
            return state.map(todo => {
                if (todo.id === action.id) {
                    return Object.assign({}, todo, {
                        duration: todo.duration
                    })
                }
                return todo
            })
        case TodoActionType.SetTask:
            return state.map(todo => {
                if (todo.id === action.id) {
                    return Object.assign({}, todo, {
                        task: todo.task
                    })
                }
                return todo
            })
        case TodoActionType.SetDetail:
            return state.map(todo => {
                if (todo.id === action.id) {
                    return Object.assign({}, todo, {
                        detail: todo.detail
                    })
                }
                return todo
            })
        default:
            return state
    }
}