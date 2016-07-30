import { Action } from 'redux'
import * as moment from 'moment'
import { last, assign, without } from 'lodash'

import Todo from '../model/Todo'
import {
    TodoAction,
    StartHourAction,
    DurationAction,
    MoveAction,
    TodoActionType
} from '../actions'

export interface TodosState {
    todos: number[]
    todosById: TodoMap
    orderedTodos: number[]
}

interface TodoMap {
    [propName: number]: Todo
}

const initialState: TodosState = {
    todos: [0],
    orderedTodos: [0],
    todosById: {
        0: {
            id: 0,
            order: 0,
            isDone: false,
            startHour: moment({ hour: 9 }).toDate(),
            duration: 60,
            task: '',
            detail: ''
        }
    }
}

const todo = (state: Todo, action: TodoAction): Todo => {
    switch (action.type) {
        case TodoActionType.Toggle:
            if (state.id !== action.id) {
                return state
            }
            return assign({}, state, { isDone: !state.isDone })
        case TodoActionType.SetTask:
            if (state.id !== action.id) {
                return state
            }
            return assign({}, state, { task: action.task })
        case TodoActionType.SetDetail:
            if (state.id !== action.id) {
                return state
            }
            return assign({}, state, { detail: action.detail })
        default:
            return state
    }
}

const startHour = (state: Todo, action: StartHourAction): Todo => {
    if (action.difference === undefined && state.id === action.id) {
        return assign({}, state, { startHour: action.startHour })
    }
    if (state.startHour >= action.startHour) {
        const startHour = moment(state.startHour).add(
            action.difference,
            'minutes'
        ).toDate()
        return assign({}, state, { startHour })
    }
    const newStartHour = moment(action.startHour).add(action.difference, 'minutes')
    if (moment(state.startHour).isBefore(newStartHour) &&
        (moment(state.startHour).add(state.duration, 'minutes')
            .isSameOrAfter(newStartHour) ||
        moment(state.startHour).add(state.duration, 'minutes')
            .isSame(moment(action.startHour)))) {
        return assign({}, state, {
            duration: moment(newStartHour).diff(moment(state.startHour), 'minutes')
        })
    }
    return state
}

const duration = (state: Todo, action: DurationAction): Todo => {
    if (state.id === action.id) {
        return assign({}, state, { duration: action.duration })
    }
    if (state.startHour > action.startHour) {
        return assign({}, state, {
            startHour: moment(state.startHour).add(
                action.difference,
                'minutes'
            ).toDate()
        })
    }
    return state
}

const todos = (state = initialState, action: Action): TodosState => {
    switch (action.type) {
        case TodoActionType.Add:
            if (state.todos.length === 0) {
                return initialState
            }
            const id = last(state.todos) + 1
            const lastTodo = state.todosById[last(state.orderedTodos)]
            return {
                todos: [...state.todos, id],
                orderedTodos: [...state.orderedTodos, id],
                todosById: assign<{}, TodoMap>({}, state.todosById, {
                    [id]: {
                        id,
                        order: state.orderedTodos.length,
                        isDone: false,
                        startHour: moment(lastTodo.startHour)
                            .add(lastTodo.duration, 'minutes')
                            .toDate(),
                        duration: 60,
                        task: '',
                        detail: ''
                    }
                })
            }
        case TodoActionType.Delete:
            const { id: deleteId } = action as TodoAction
            const deleteTodo = state.todosById[deleteId]
            return {
                todos: without(state.todos, deleteId),
                orderedTodos: without(state.orderedTodos, deleteId),
                todosById: state.todos.reduce((obj, id) => {
                    if (id === deleteId) {
                        return obj
                    }
                    let todo = state.todosById[id]
                    if (todo.order > deleteTodo.order) {
                        todo = assign({}, todo, {
                            order: todo.order - 1,
                            startHour: moment(todo.startHour)
                                .subtract(deleteTodo.duration, 'minutes')
                                .toDate()
                        })
                    }
                    obj[id] = todo
                    return obj
                }, {} as TodoMap)
            }
        case TodoActionType.Move:
            let { fromPos, toPos } = action as MoveAction
            if (toPos < 0 || toPos >= state.orderedTodos.length) {
                return state
            }
            const fromTodo = state.todosById[state.orderedTodos[fromPos]]
            const toTodo = state.todosById[state.orderedTodos[toPos]]
            const difference = fromPos > toPos ? fromTodo.duration : -fromTodo.duration
            const rangeMin = Math.min(fromPos, toPos)
            const rangeMax = Math.max(fromPos, toPos)
            const orderedTodos = [...state.orderedTodos]
            orderedTodos.splice(toPos, 0, ...orderedTodos.splice(fromPos, 1))
            return assign<{}, TodosState>({}, state, {
                orderedTodos,
                todosById: orderedTodos.reduce((obj, id, order) => {
                    let todo = state.todosById[id]
                    if (order >= rangeMin && order <= rangeMax) {
                        if (todo.order === fromPos) {
                            todo = assign({}, todo, {
                                order,
                                startHour: toTodo.startHour
                            })
                        } else {
                            todo = assign({}, todo, {
                                order,
                                startHour: moment(todo.startHour)
                                    .add(difference, 'minutes')
                                    .toDate()
                            })
                        }
                    }
                    obj[id] = todo
                    return obj
                }, {} as TodoMap)
            })
        
        /*case TodoActionType.SetStartHour:
            const startHourAction = action as StartHourAction
            let nextState = state
            if (startHourAction.difference < 0) {
                const nextStartHour = moment(startHourAction.startHour)
                    .add(startHourAction.difference, 'minutes')
                    .toDate()
                let fromPos: number
                const maxTodo = state.reduce((maxTodo, todo) => {
                    if (todo.id === startHourAction.id) {
                        fromPos = todo.position
                    }
                    if (todo.startHour < nextStartHour && (
                            !maxTodo || todo.position > maxTodo.position
                        )) {
                        return todo
                    }
                    return maxTodo
                }, null)
                if (maxTodo) {
                    const localMoveAction: MoveAction = {
                        type: TodoActionType.Move,
                        fromPos,
                        toPos: maxTodo ? maxTodo.position + 1 : -1
                    }
                    nextState = todos(state, localMoveAction)
                    const newStartHour = moment(maxTodo.startHour)
                        .add(maxTodo.duration, 'minutes')
                    startHourAction.startHour = newStartHour.toDate()
                    startHourAction.difference = moment(nextStartHour)
                        .diff(newStartHour, 'minutes')
                }
            }
            return nextState.map(t =>
                startHour(t, startHourAction)
            )

        case TodoActionType.SetDuration:
            return state.map(t =>
                duration(t, action as DurationAction)
            )*/

        case TodoActionType.Toggle:
            const toggleAction = action as TodoAction
            return assign<{}, TodosState>({}, state, {
                todosById: assign<{}, TodoMap>({}, state.todosById, {
                    [toggleAction.id]: assign({}, state.todosById[toggleAction.id], {
                        isDone: !state.todosById[toggleAction.id].isDone
                    })
                })
            })
        /*case TodoActionType.SetTask:
        case TodoActionType.SetDetail:
            return state.map(t =>
                todo(t, action as TodoAction)
            )*/

        default:
            return state
    }
}

export function getTodos(state: TodosState) {
    return state.todos.map(id => state.todosById[id])
}

export default todos