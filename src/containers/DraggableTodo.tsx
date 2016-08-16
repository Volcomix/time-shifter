import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import Todo from '../model/Todo'
import * as Actions from '../actions'
import { TodosState } from '../reducers'
import DraggableItem, { Callbacks } from '../components/DraggableItem'
import EditableTodo from './EditableTodo'

interface StateProps {
    isDragging: boolean
    draggingY: number
    hover: boolean
}

interface OwnProps {
    todo: Todo
    height: number
}

let DraggableTodo = (props: StateProps & OwnProps & Callbacks) => (
    <DraggableItem
        order={props.todo.order}
        height={props.height}
        isDragging={props.isDragging}
        draggingY={props.draggingY}
        hover={props.hover}
        isDeleting={props.todo.isDeleting}
        onMouseOver={props.onMouseOver}
        onDragStart={props.onDragStart}
        onDrag={props.onDrag}
        onDragEnd={props.onDragEnd}
    >
        <EditableTodo todo={props.todo} hover={props.hover} />
    </DraggableItem>
)

const mapStateToProps = (state: TodosState, { todo }: OwnProps): StateProps => {
    const isDragging = state.draggingTodo === todo.id
    return {
        isDragging,
        draggingY: isDragging ? state.draggingY : -1,
        hover: state.mouseOverTodo === todo.id
    }
}

const mapDispatchToProps = (
    dispatch: Dispatch<Actions.TodoAction>,
    { todo }: OwnProps
): Callbacks => {
    return {
        onMouseOver: () => {
            dispatch(Actions.mouseOverTodo(todo.id))
        },
        onDragStart: y => {
            dispatch(Actions.startDraggingTodo(todo.id, y))
        },
        onDrag: (y, position) => {
            dispatch(Actions.dragTodo(y, position))
        },
        onDragEnd: () => {
            dispatch(Actions.stopDraggingTodo())
        }
    }
}

export default connect<StateProps, Callbacks, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(DraggableTodo)