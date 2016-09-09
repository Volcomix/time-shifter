import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { addTodo, setTodoCreated, TodoAction } from '../actions'

interface Props {
    dispatch: Dispatch<TodoAction>
}

interface State {
    isCreating: boolean
    isCreated: boolean
    isShowing: boolean
}

class AddTodo extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = { isCreated: false, isCreating: false, isShowing: false }
    }

    render() {
        const { dispatch } = this.props
        return this.state.isCreating ? null : this.state.isCreated ? (
            <Paper
                circle={true}
                zDepth={2}
                style={{position: 'fixed',
                    textAlign: 'center',
                    backgroundColor: 'rgb(255, 64, 129)',
                    zIndex: 100000,
                    bottom: this.state.isShowing ? 15 : 43,
                    right: this.state.isShowing ? 15 : 43,
                    width: this.state.isShowing ? 56 : 0,
                    height: this.state.isShowing ? 56: 0
                }}
            >
                <ContentAdd
                    style={{
                        width: this.state.isShowing ? 24 : 0,
                        height: this.state.isShowing ? 56 : 0,
                        lineHeight: `${this.state.isShowing ? 56 : 0}px`,
                        fill: 'white',
                        color: 'white'
                    }}
                />
            </Paper>
        ) : (
            <FloatingActionButton
                secondary={true}
                style={{
                    position: 'fixed',
                    bottom: 15,
                    right: 15,
                    zIndex: 100000
                }}
                onClick={() => {
                    this.setState({
                        isCreating: true,
                        isCreated: false,
                        isShowing: false,
                    })
                    dispatch(addTodo())
                    setTimeout(() => dispatch(setTodoCreated()), 50)
                    setTimeout(() => {
                        this.setState({
                            isCreating: false,
                            isCreated: true,
                            isShowing: false
                        })
                        setTimeout(() => {
                            this.setState({
                                isCreating: false,
                                isCreated: true,
                                isShowing: true
                            })
                            setTimeout(() => {
                                this.setState({
                                    isCreating: false,
                                    isCreated: false,
                                    isShowing: false
                                })
                            }, 450)
                        }, 50)
                    }, 250)
                }}
            >
                <ContentAdd />
            </FloatingActionButton>
        )
    }
}

export default connect(null)(AddTodo)