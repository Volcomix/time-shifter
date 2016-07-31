import { Action } from 'redux'
import * as moment from 'moment'
import { last, sortedIndex, assign, without } from 'lodash'

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

/*const startHour = (state: Todo, action: StartHourAction): Todo => {
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
}*/

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
                todosById: assign<{}, TodosMap>({}, state.todosById, {
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
            const startHourTodo = state.todosById[startHourId]
            const startHourFromPos = startHourTodo.order
            const startHourToPos = sortedIndex(
                state.orderedTodos,
                +startHour,
                id => {
                    return +(state.todosById[id].startHour)
                }
            )
            return moveTodo(state, startHourFromPos, startHourToPos + 1)
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
        */
        case TodoActionType.SetDuration:
            const { id: durationId, duration } = action as TodoAction
            const durationTodo = state.todosById[durationId]
            const durationDiff = duration - durationTodo.duration
            return assign<{}, TodosState>({}, state, {
                todosById: state.todos.reduce((obj, id) => {
                    let todo = state.todosById[id]
                    if (id === durationId) {
                        todo = assign<{}, Todo>({}, todo, {
                            duration
                        })
                    } else if (todo.order > durationTodo.order) {
                        todo = assign<{}, Todo>({}, todo, {
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
            return assign<{}, TodosState>({}, state, {
                todosById: assign<{}, TodosMap>({}, state.todosById, {
                    [toggleId]: assign({}, toggleTodo, {
                        isDone: !toggleTodo.isDone
                    })
                })
            })
        case TodoActionType.SetTask:
            const { id: taskId, task} = action as TodoAction
            return assign<{}, TodosState>({}, state, {
                todosById: assign<{}, TodosMap>({}, state.todosById, {
                    [taskId]: assign({}, state.todosById[taskId], {
                        task
                    })
                })
            })
        case TodoActionType.SetDetail:
            const { id: detailId, detail} = action as TodoAction
            return assign<{}, TodosState>({}, state, {
                todosById: assign<{}, TodosMap>({}, state.todosById, {
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