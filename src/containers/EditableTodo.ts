import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import Todo from '../model/Todo'
import * as Actions from '../actions'
import TodoItem, { Props, Callbacks } from '../components/TodoItem'

const mapDispatchToProps = (dispatch: Dispatch<Actions.TodoAction>): Callbacks => {
    return {
        onToggle: (id: number) => {
            dispatch(Actions.toggleTodo(id))
        },
        onStartHourChange: (id: number, startHour: Date) => {
            dispatch(Actions.setTodoStartHour(id, startHour))
        },
        onDurationChange: (id: number, duration: number) => {
            dispatch(Actions.setTodoDuration(id, duration))
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

const EditableTodo = connect<{}, Callbacks, Props>(
    null,
    mapDispatchToProps
)(TodoItem)

export default EditableTodo