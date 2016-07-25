import { connect } from 'react-redux'

import Todo from '../model/Todo'
import { deleteTodo } from '../actions'
import TodoItem from '../components/TodoItem'

const mapDispatchToProps = (dispatch: any) => {
    return {
        onDelete: (id: any) => {
            dispatch(deleteTodo(id))
        }
    }
}

const EditableTodo = connect<{}, {onDelete: (id: number) => void}, { todo: Todo }>(
    null,
    mapDispatchToProps
)(TodoItem)

export default EditableTodo