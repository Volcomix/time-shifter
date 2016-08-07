import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import Todo from '../model/Todo'
import { dragTodo, dropTodo, TodoAction } from '../actions'
import DraggableItem, { Props, Callbacks } from '../components/DraggableItem'
import EditableTodo from './EditableTodo'

interface OwnProps extends Props {
    todo: Todo
}

let DraggableTodo = (props: OwnProps & Callbacks) => (
    <DraggableItem {...props}>
        <EditableTodo todo={props.todo} />
    </DraggableItem>
)

const mapDispatchToProps = (
    dispatch: Dispatch<TodoAction>,
    ownProps: OwnProps
): Callbacks => {
    return {
        onDragStart: () => {
            dispatch(dragTodo(ownProps.todo.id))
        },
        onDragEnd: () => {
            dispatch(dropTodo())
        }
    }
}

export default connect<{}, Callbacks, OwnProps>(
    null,
    mapDispatchToProps
)(DraggableTodo)