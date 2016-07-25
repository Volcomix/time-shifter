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
        onTaskChange: (id: number, task: string) => {
            dispatch(Actions.setTodoTask(id, task))
        },
        onDetailChange: (id: number, detail: string) => {
            dispatch(Actions.setTodoDetail(id, detail))
        },
        onDelete: (id: number, position: number) => {
            dispatch(Actions.deleteTodo(id, position))
        }
    }
}

const EditableTodo = connect<{}, {}, { todo: Todo }>(
    null,
    mapDispatchToProps
)(TodoItem)

export default EditableTodo