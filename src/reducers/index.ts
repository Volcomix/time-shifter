import { Action } from 'redux'

import Todo from '../model/Todo'
import { TodoAction, MoveAction, TodoActionType } from '../actions'

const initialState: Todo[] = [{
    id: 0,
    position: 0,
    isDone: false,
    duration: 60
}]

const todo = (state: Todo, action: TodoAction): Todo => {
    switch (action.type) {
        case TodoActionType.Add:
            return {
                id: action.id,
                position: action.position,
                isDone: false,
                duration: 60
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

const moveTodo = (state: Todo, action: MoveAction): Todo => {
    if (
        action.fromPos < action.toPos &&
        state.position > action.fromPos &&
        state.position <= action.toPos
    ) {
        return Object.assign({}, state, {
            position: state.position - 1
        })
    } else if (
        action.fromPos > action.toPos &&
        state.position < action.fromPos &&
        state.position >= action.toPos
    ) {
        return Object.assign({}, state, {
            position: state.position + 1
        })
    } else if (
        state.position === action.fromPos
    ) {
        return Object.assign({}, state, {
            position: action.toPos
        })
    }
    return state
}

const todos = (state = initialState, action: Action): Todo[] => {
    switch (action.type) {
        case TodoActionType.Add:
            const addAction: TodoAction = action
            addAction.id = state.length
            addAction.position = state.length
            return [
                ...state,
                todo(undefined, addAction)
            ]
        case TodoActionType.Delete:
            const deleteAction: TodoAction = action
            return state.filter(todo =>
                todo.id !== deleteAction.id
            ).map(todo => {
                if (todo.position > deleteAction.position) {
                    return Object.assign({}, todo, {
                        position: todo.position - 1
                    })
                }
                return todo
            })
        case TodoActionType.Move:
            return state.map(t =>
                moveTodo(t, action as MoveAction)
            )

        case TodoActionType.Toggle:
        case TodoActionType.SetStartHour:
        case TodoActionType.SetDuration:
        case TodoActionType.SetTask:
        case TodoActionType.SetDetail:
            return state.map(t =>
                todo(t, action as TodoAction)
            )

        default:
            return state
    }
}

export default todos