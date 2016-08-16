import { Action } from 'redux'
import * as moment from 'moment'
import { last, sortedIndexBy, assign, without } from 'lodash'

import Todo from '../model/Todo'
import {
    TodoAction,
    MoveAction,
    SetValueAction,
    StartDraggingAction,
    DragAction,
    TodoActionType
} from '../actions'

export interface TodosState {
    todos: number[]
    todosById: TodosMap
    orderedTodos: number[]
    draggingTodo: number
    draggingY: number
    mouseOverTodo: number
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
            detail: '',
            isDeleting: false
        }
    },
    draggingTodo: -1,
    draggingY: -1,
    mouseOverTodo: -1
}

const moveTodo = (state: TodosState, fromPos: number, toPos: number) => {
    if (toPos < 0 || toPos >= state.orderedTodos.length || fromPos === toPos) {
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
                    let newStartHour: Date
                    if (fromPos < toPos) {
                        newStartHour = moment(toTodo.startHour)
                            .subtract(fromTodo.duration, 'minutes')
                            .add(toTodo.duration, 'minutes')
                            .toDate()
                    } else {
                        newStartHour = toTodo.startHour
                    }
                    todo = assign({}, todo, {
                        order,
                        startHour: newStartHour
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
            const addId = last(state.todos) + 1
            const lastTodo = state.todosById[last(state.orderedTodos)]
            return assign({}, state, {
                todos: [...state.todos, addId],
                orderedTodos: [...state.orderedTodos, addId],
                todosById: assign({}, state.todosById, {
                    [addId]: {
                        id: addId,
                        order: state.orderedTodos.length,
                        isDone: false,
                        startHour: moment(lastTodo.startHour)
                            .add(lastTodo.duration, 'minutes')
                            .toDate(),
                        duration: 60,
                        task: '',
                        detail: '',
                        deleting: false
                    }
                })
            })
        case TodoActionType.Delete:
            const { id: deleteId } = action as TodoAction
            const deleteTodo = state.todosById[deleteId]
            return assign({}, state, {
                orderedTodos: without(state.orderedTodos, deleteId),
                todosById: state.todos.reduce((obj, id) => {
                    let todo = state.todosById[id]
                    if (id === deleteId) {
                        todo = assign({}, todo, {
                            isDeleting: true
                        })
                    } else if (todo.order > deleteTodo.order) {
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
            })
        case TodoActionType.Deleted:
            const { id: deletedId } = action as TodoAction
            const deletedTodo = state.todosById[deletedId]
            return assign({}, state, {
                todos: without(state.todos, deletedId),
                orderedTodos: without(state.orderedTodos, deletedId),
                todosById: state.todos.reduce((obj, id) => {
                    if (id === deletedId) {
                        return obj
                    }
                    let todo = state.todosById[id]
                    if (todo.order > deletedTodo.order) {
                        todo = assign({}, todo, {
                            order: todo.order - 1,
                            startHour: moment(todo.startHour)
                                .subtract(deletedTodo.duration, 'minutes')
                                .toDate()
                        })
                    }
                    obj[id] = todo
                    return obj
                }, {} as TodosMap)
            })
        case TodoActionType.Move:
            const { fromPos: moveFromPos, toPos: moveToPos } = action as MoveAction
            return moveTodo(state, moveFromPos, moveToPos)
        case TodoActionType.SetStartHour:
            const { id: startHourId, value: startHour } = action as SetValueAction
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
            const { id: durationId, value: duration } = action as SetValueAction
            const durationTodo = state.todosById[durationId]
            const durationDiff = (duration as number) - durationTodo.duration
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
            const { id: taskId, value: task} = action as SetValueAction
            return assign({}, state, {
                todosById: assign({}, state.todosById, {
                    [taskId]: assign({}, state.todosById[taskId], {
                        task
                    })
                })
            })
        case TodoActionType.SetDetail:
            const { id: detailId, value: detail} = action as SetValueAction
            return assign({}, state, {
                todosById: assign({}, state.todosById, {
                    [detailId]: assign({}, state.todosById[detailId], {
                        detail
                    })
                })
            })
        case TodoActionType.StartDraggingTodo:
            const {
                id: startDraggingId,
                y: startDraggingY
            } = action as StartDraggingAction
            return assign({}, state, {
                draggingTodo: startDraggingId,
                draggingY: startDraggingY
            })
        case TodoActionType.DragTodo:
            const { y: dragY, position: dragPos } = action as DragAction
            const fromPos = state.todosById[state.draggingTodo].order
            const dragState = moveTodo(state, fromPos, dragPos)
            return assign({}, dragState, {
                draggingY: dragY
            })
        case TodoActionType.StopDraggingTodo:
            return assign({}, state, {
                draggingTodo: -1
            })
        case TodoActionType.MouseOverTodo:
            const { id: overId } = action as TodoAction
            return assign({}, state, {
                mouseOverTodo: overId
            })
        case TodoActionType.MouseOutTodo:
            return assign({}, state, {
                mouseOverTodo: -1
            })
        default:
            return state
    }
}

export const getTodos = (state: TodosState) => {
    return state.todos.map(id => state.todosById[id])
}

export default todos