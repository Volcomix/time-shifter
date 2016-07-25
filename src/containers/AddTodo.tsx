import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { addTodo, TodoAction } from '../actions'

interface Props {
    dispatch?: Dispatch<TodoAction>
}

let AddTodo: React.StatelessComponent<Props> = ({ dispatch }) => (
    <FloatingActionButton
        secondary={true}
        style={{
            position: 'absolute',
            bottom: 15,
            right: 15
        }}
        onClick={() => dispatch(addTodo())}
    >
        <ContentAdd />
    </FloatingActionButton>
)

AddTodo = connect()(AddTodo)

export default AddTodo