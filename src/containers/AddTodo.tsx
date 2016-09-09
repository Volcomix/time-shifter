import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { addTodo, setTodoCreated, TodoAction } from '../actions'

interface Props {
    dispatch: Dispatch<TodoAction>
}

interface State {
    isShowing: boolean
    isCreating: boolean
}

class AddTodo extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = { isShowing: false, isCreating: false }
    }

    render() {
        const { dispatch } = this.props
        return this.state.isCreating ? null : (
            <FloatingActionButton
                secondary={true}
                style={{
                    position: 'fixed',
                    bottom: 15,
                    right: 15,
                    zIndex: 100000,
                    opacity: this.state.isShowing ? 0 : undefined
                }}
                onClick={() => {
                    this.setState({ isShowing: false, isCreating: true })
                    dispatch(addTodo())
                    setTimeout(() => dispatch(setTodoCreated()), 50)
                    setTimeout(() => {
                        this.setState({ isShowing: true, isCreating: false })
                        setTimeout(() => {
                            this.setState({ isShowing: false, isCreating: false })
                        }, 50)
                    }, 450)
                }}
            >
                <ContentAdd />
            </FloatingActionButton>
        )
    }
}

export default connect(null)(AddTodo)