import { Action } from 'redux'
import * as moment from 'moment'

import Todo from '../model/Todo'
import {
    TodoAction,
    StartHourAction,
    DurationAction,
    MoveAction,
    TodoActionType
} from '../actions'

const initialState: Todo[] = [{
    id: 0,
    position: 0,
    isDone: false,
    startHour: moment({ hour: 9 }).toDate(),
    duration: 60,
    task: '',
    detail: ''
}]

const todo = (state: Todo, action: TodoAction): Todo => {
    switch (action.type) {
        case TodoActionType.Add:
            return {
                id: action.id,
                position: action.position,
                isDone: false,
                startHour: action.startHour,
                duration: 60,
                task: '',
                detail: ''
            }
        case TodoActionType.Toggle:
            if (state.id !== action.id) {
                return state
            }
            return Object.assign({}, state, { isDone: !state.isDone })
        case TodoActionType.SetTask:
            if (state.id !== action.id) {
                return state
            }
            return Object.assign({}, state, { task: action.task })
        case TodoActionType.SetDetail:
            if (state.id !== action.id) {
                return state
            }
            return Object.assign({}, state, { detail: action.detail })
        default:
            return state
    }
}

const startHour = (state: Todo, action: StartHourAction): Todo => {
    if (action.difference === undefined && state.id === action.id) {
        return Object.assign({}, state, { startHour: action.startHour })
    }
    if (state.startHour >= action.startHour) {
        const startHour = moment(state.startHour).add(
            action.difference,
            'minutes'
        ).toDate()
        return Object.assign({}, state, { startHour })
    }
    const newStartHour = moment(action.startHour).add(action.difference, 'minutes')
    if (moment(state.startHour).isBefore(newStartHour) &&
        (moment(state.startHour).add(state.duration, 'minutes')
            .isSameOrAfter(newStartHour) ||
        moment(state.startHour).add(state.duration, 'minutes')
            .isSame(moment(action.startHour)))) {
        return Object.assign({}, state, {
            duration: moment(newStartHour).diff(moment(state.startHour), 'minutes')
        })
    }
    return state
}

const duration = (state: Todo, action: DurationAction): Todo => {
    if (state.id === action.id) {
        return Object.assign({}, state, { duration: action.duration })
    }
    if (state.startHour > action.startHour) {
        return Object.assign({}, state, {
            startHour: moment(state.startHour).add(
                action.difference,
                'minutes'
            ).toDate()
        })
    }
    return state
}

const moveTodo = (
    state: Todo,
    { fromPos, toPos }: MoveAction,
    difference: number,
    toStartHour: Date
): Todo => {
    if (fromPos < toPos && state.position > fromPos && state.position <= toPos) {
        return Object.assign({}, state, {
            position: state.position - 1,
            startHour: moment(state.startHour).add(difference, 'minutes').toDate()
        })
    } else if (fromPos > toPos && state.position < fromPos && state.position >= toPos) {
        return Object.assign({}, state, {
            position: state.position + 1,
            startHour: moment(state.startHour).add(difference, 'minutes').toDate()
        })
    } else if (state.position === fromPos) {
        return Object.assign({}, state, {
            position: toPos,
            startHour: toStartHour
        })
    }
    return state
}

const todos = (state = initialState, action: Action): Todo[] => {
    switch (action.type) {
        case TodoActionType.Add:
            const addAction: TodoAction = action
            addAction.id = Math.max(-1, ...state.map(todo => todo.id)) + 1
            addAction.position = state.length
            const lastTodo = state.reduce((lastTodo, todo) => {
                if (!lastTodo && !todo.startHour) {
                    return null
                }
                if (!lastTodo || todo.startHour > lastTodo.startHour) {
                    return todo
                }
                return lastTodo
            }, null)
            if (lastTodo) {
                const nextHour =  moment(lastTodo.startHour).add(
                    lastTodo.duration,
                    'minutes'
                )
                addAction.startHour = nextHour.toDate()
            }
            return [...state, todo(undefined, addAction)]
        case TodoActionType.Delete:
            const deleteAction: TodoAction = action
            return state.filter(todo =>
                todo.id !== deleteAction.id
            ).map(todo => {
                if (todo.position > deleteAction.position) {
                    return Object.assign({}, todo, { position: todo.position - 1 })
                }
                return todo
            })
        case TodoActionType.Move:
            const moveAction = action as MoveAction
            if (moveAction.toPos < 0 || moveAction.toPos >= state.length) {
                return state
            }
            let sorted = state.slice()
            sorted.sort((a, b) => a.position - b.position)
            let difference = 0
            if (moveAction.fromPos < moveAction.toPos) {
                difference = -sorted[moveAction.fromPos].duration
            } else if (moveAction.fromPos > moveAction.toPos) {
                difference = sorted[moveAction.fromPos].duration
            }
            let toStartHour = sorted[moveAction.toPos].startHour
            return state.map(todo =>
                moveTodo(todo, moveAction, difference, toStartHour)
            )
        
        case TodoActionType.SetStartHour:
            return state.map(t =>
                startHour(t, action as StartHourAction)
            )

        case TodoActionType.SetDuration:
            return state.map(t =>
                duration(t, action as DurationAction)
            )

        case TodoActionType.Toggle:
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