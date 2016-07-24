import * as React from 'react'
import * as moment from 'moment'

import { Todo } from '../documents/Todo'

import TodoItem from './TodoItem'

interface Props {
    initialTodos: Todo[]
}

interface State {
    todos: Todo[]
    draggingItem: Todo
}

const itemHeight = 41

export default class TodoList extends React.Component<Props, State> {
    
    private draggingItem: Todo
    private overItem: Todo

    constructor(props: Props) {
        super(props)
        this.state = { todos: props.initialTodos, draggingItem: null }
    }
    
    render() {
        return (
            <div>
                <ul
                    className='mdl-shadow--2dp'
                    style={{
                        margin: 0,
                        padding: 0,
                        listStyle: 'none',
                        height: this.state.todos.length * itemHeight,
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        right: 10,
                        minWidth: 514
                    }}
                    onDragOver={this.dragOver}
                >
                    {this.state.todos.map(todo =>
                        <TodoItem
                            todo={todo}
                            height={itemHeight}
                            key={todo.id}
                            onChange={this.todoChanged}
                            isDragging={this.state.draggingItem === todo}
                            isDragInProgress={!!this.state.draggingItem}
                            dragStart={this.dragStart}
                            dragEnd={this.dragEnd}
                            dragOverItem={this.dragOverItem}
                        />
                    )}
                </ul>
            </div>
        )
    }

    private dragOver = (event: React.DragEvent) => {
        event.preventDefault()
        if (this.state.draggingItem === this.draggingItem) {
            return
        }
        this.setState({ draggingItem: this.draggingItem } as State)
    }

    private dragStart = (todo: Todo) => {
        this.draggingItem = todo
    }

    private dragEnd = () => {
        this.setState({ draggingItem: null } as State)
    }

    private dragOverItem = (event: React.DragEvent, todo: Todo) => {
        event.preventDefault()
        if (this.overItem === todo) {
            return
        }
        this.overItem = todo
        if (this.draggingItem === todo) {
            return
        }
        const draggingPos = this.draggingItem.position
        const overPos = todo.position

        const todos = this.state.todos.map(todo => {
            if (
                draggingPos > overPos &&
                todo.position >= overPos &&
                todo.position < draggingPos
            ) {
                todo.position++
                if (todo.hour) {
                    const hour = moment(todo.hour, 'HH:mm').add(1, 'hour')
                    todo.hour = hour.format('HH:mm')
                }
            } else if (
                draggingPos < overPos &&
                todo.position > draggingPos &&
                todo.position <= overPos
            ) {
                todo.position--
                if (todo.hour) {
                    const hour = moment(todo.hour, 'HH:mm').add(-1, 'hour')
                    todo.hour = hour.format('HH:mm')
                }
            } else if (
                todo.position === draggingPos
            ) {
                todo.position = overPos
            }
            return todo
        })

        this.setState({ todos } as State)
    }
    
    private todoChanged = (todo: Todo) => {
        this.setState({ todos: this.state.todos } as State)
    }
}