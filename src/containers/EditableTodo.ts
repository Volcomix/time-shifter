import { connect } from 'react-redux'

import Todo from '../model/Todo'
import { deleteTodo } from '../actions'
import TodoItem from '../components/TodoItem'

const mapDispatchToProps = (dispatch: any) => {
    return {
        onDelete: (id: number, position: number) => {
            dispatch(deleteTodo(id, position))
        }
    }
}

const EditableTodo = connect<{}, {onDelete: (id: number, position: number) => void}, { todo: Todo }>(
    null,
    mapDispatchToProps
)(TodoItem)

export default EditableTodo