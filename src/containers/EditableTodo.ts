import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import Todo from '../model/Todo'
import * as Actions from '../actions'
import TodoItem from '../components/TodoItem'

const mapDispatchToProps = (dispatch: Dispatch<Actions.TodoAction>) => {
    return {
        onToggle: (id: number) => {
            dispatch(Actions.toggleTodo(id))
        },
        onStartHourChange: (id: number, startHour: Date, difference?: number) => {
            dispatch(Actions.setTodoStartHour(id, startHour, difference))
        },
        onDurationChange: (id: number, duration: number, startHour: Date, difference: number) => {
            dispatch(Actions.setTodoDuration(id, duration, startHour, difference))
        },
        onTaskChange: (id: number, task: string) => {
            dispatch(Actions.setTodoTask(id, task))
        },
        onDetailChange: (id: number, detail: string) => {
            dispatch(Actions.setTodoDetail(id, detail))
        },
        onMove: (fromPos: number, toPos: number) => {
            dispatch(Actions.moveTodo(fromPos, toPos))
        },
        onDelete: (id: number) => {
            dispatch(Actions.deleteTodo(id))
        }
    }
}

const EditableTodo = connect<{}, {}, { todo: Todo }>(
    null,
    mapDispatchToProps
)(TodoItem)

export default EditableTodo