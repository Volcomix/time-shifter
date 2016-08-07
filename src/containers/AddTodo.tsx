import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { addTodo, TodoAction } from '../actions'

interface Props {
    dispatch: Dispatch<TodoAction>
}

let AddTodo = ({ dispatch }: Props) => (
    <FloatingActionButton
        secondary={true}
        style={{
            position: 'fixed',
            bottom: 15,
            right: 15,
            zIndex: 100000
        }}
        onClick={() => dispatch(addTodo())}
    >
        <ContentAdd />
    </FloatingActionButton>
)

export default connect(null)(AddTodo)