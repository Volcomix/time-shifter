import { Action } from 'redux'
import * as moment from 'moment'
import { last, sortedIndexBy, assign, without } from 'lodash'

import Todo from '../model/Todo'
import { TodoAction, MoveAction, TodoActionType } from '../actions'

export interface TodosState {
    todos: number[]
    todosById: TodosMap
    orderedTodos: number[]
}

interface TodosMap {
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

const moveTodo = (state: TodosState, fromPos: number, toPos: number) => {
    if (toPos < 0 || toPos >= state.orderedTodos.length) {
        return state
    }
    const fromTodo = state.todosById[state.orderedTodos[fromPos]]
    const toTodo = state.todosById[state.orderedTodos[toPos]]
    const moveDiff = fromPos > toPos ? fromTodo.duration : -fromTodo.duration
    const rangeMin = Math.min(fromPos, toPos)
    const rangeMax = Math.max(fromPos, toPos)
    const orderedTodos = [...state.orderedTodos]
    orderedTodos.splice(toPos, 0, ...orderedTodos.splice(fromPos, 1))
    return assign({}, state, {
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
                            .add(moveDiff, 'minutes')
                            .toDate()
                    })
                }
            }
            obj[id] = todo
            return obj
        }, {} as TodosMap)
    })
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
                todosById: assign({}, state.todosById, {
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
                }, {} as TodosMap)
            }
        case TodoActionType.Move:
            const { fromPos: moveFromPos, toPos: moveToPos } = action as MoveAction
            return moveTodo(state, moveFromPos, moveToPos)
        case TodoActionType.SetStartHour:
            const { id: startHourId, startHour } = action as TodoAction
            let startHourTodo = state.todosById[startHourId]
            let nextState = state
            if (startHourTodo.startHour > startHour) {
                const startHourFromPos = startHourTodo.order
                const startHourToPos = sortedIndexBy(
                    state.orderedTodos,
                    startHourId,
                    id => {
                        if (id === startHourId) {
                            return startHour
                        }
                        return state.todosById[id].startHour
                    }
                )
                nextState = moveTodo(state, startHourFromPos, startHourToPos)
                startHourTodo = nextState.todosById[startHourId]
            }
            const startHourDiff = moment(startHour)
                .diff(moment(startHourTodo.startHour), 'minutes')
            return assign({}, nextState, {
                todosById: nextState.todos.reduce((obj, id) => {
                    let todo = nextState.todosById[id]
                    if (todo.order === startHourTodo.order - 1) {
                        todo = assign({}, todo, {
                            duration: todo.duration + startHourDiff
                        })
                    } else if (todo.order >= startHourTodo.order) {
                        todo = assign({}, todo, {
                            startHour: moment(todo.startHour)
                                .add(startHourDiff, 'minutes')
                                .toDate()
                        })
                    }
                    obj[id] = todo
                    return obj
                }, {} as TodosMap)
            })
        case TodoActionType.SetDuration:
            const { id: durationId, duration } = action as TodoAction
            const durationTodo = state.todosById[durationId]
            const durationDiff = duration - durationTodo.duration
            return assign({}, state, {
                todosById: state.todos.reduce((obj, id) => {
                    let todo = state.todosById[id]
                    if (id === durationId) {
                        todo = assign({}, todo, {
                            duration
                        })
                    } else if (todo.order > durationTodo.order) {
                        todo = assign({}, todo, {
                            startHour: moment(todo.startHour)
                                .add(durationDiff, 'minutes')
                                .toDate()
                        })
                    }
                    obj[id] = todo
                    return obj
                }, {} as TodosMap)
            })
        case TodoActionType.Toggle:
            const { id: toggleId } = action as TodoAction
            const toggleTodo = state.todosById[toggleId]
            return assign({}, state, {
                todosById: assign({}, state.todosById, {
                    [toggleId]: assign({}, toggleTodo, {
                        isDone: !toggleTodo.isDone
                    })
                })
            })
        case TodoActionType.SetTask:
            const { id: taskId, task} = action as TodoAction
            return assign({}, state, {
                todosById: assign({}, state.todosById, {
                    [taskId]: assign({}, state.todosById[taskId], {
                        task
                    })
                })
            })
        case TodoActionType.SetDetail:
            const { id: detailId, detail} = action as TodoAction
            return assign({}, state, {
                todosById: assign({}, state.todosById, {
                    [detailId]: assign({}, state.todosById[detailId], {
                        detail
                    })
                })
            })
        default:
            return state
    }
}

export const getTodos = (state: TodosState) => {
    return state.todos.map(id => state.todosById[id])
}

export default todos