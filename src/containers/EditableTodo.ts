import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import Todo from '../model/Todo'
import { TodoAction, deleteTodo, toggleTodo } from '../actions'
import TodoItem from '../components/TodoItem'

const mapDispatchToProps = (dispatch: Dispatch<TodoAction>) => {
    return {
        onDelete: (id: number, position: number) => {
            dispatch(deleteTodo(id, position))
        },
        onToggle: (id: number) => {
            dispatch(toggleTodo(id))
        }
    }
}

const EditableTodo = connect<{}, {}, { todo: Todo }>(
    null,
    mapDispatchToProps
)(TodoItem)

export default EditableTodo