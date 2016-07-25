import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import Todo from '../model/Todo'
import * as Actions from '../actions'
import TodoItem from '../components/TodoItem'

const mapDispatchToProps = (dispatch: Dispatch<Actions.TodoAction>) => {
    return {
        onDelete: (id: number, position: number) => {
            dispatch(Actions.deleteTodo(id, position))
        },
        onToggle: (id: number) => {
            dispatch(Actions.toggleTodo(id))
        },
        onTaskChange: (id: number, task: string) => {
            dispatch(Actions.setTodoTask(id, task))
        }
    }
}

const EditableTodo = connect<{}, {}, { todo: Todo }>(
    null,
    mapDispatchToProps
)(TodoItem)

export default EditableTodo