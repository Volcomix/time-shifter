import * as React from 'react'

import { Todo } from '../documents/Todo'

import TodoItem from './TodoItem'

require('./TodoList.css')

interface Props {
    initialTodos: Todo[]
}

interface State {
    todos: Todo[]
    draggingTodo: Todo
}

export default class TodoList extends React.Component<Props, State> {
    
    private draggingTodo: Todo

    constructor(props: Props) {
        super(props)
        this.state = { todos: props.initialTodos, draggingTodo: null }
    }
    
    render() {
        return (
            <div>
                <ul onDragOver={this.dragOver}>
                    {this.state.todos.map((todo) =>
                        <TodoItem
                            todo={todo}
                            key={todo.id}
                            onChange={this.todoChanged}
                            dragging={this.state.draggingTodo === todo}
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
        this.setState({ draggingTodo: this.draggingTodo } as State)
    }

    private dragStart = (todo: Todo) => {
        this.draggingTodo = todo
    }

    private dragEnd = () => {
        this.setState({ draggingTodo: null } as State)
    }

    private dragOverItem = (event: React.DragEvent, todo: Todo) => {
        event.preventDefault()
        if (this.draggingTodo === todo) {
            return
        }
        const draggingPos = this.draggingTodo.position
        const overPos = todo.position

        const todos = this.state.todos.map(todo => {
            if (
                draggingPos > overPos &&
                todo.position >= overPos &&
                todo.position < draggingPos
            ) {
                todo.position++
            } else if (
                draggingPos < overPos &&
                todo.position > draggingPos &&
                todo.position <= overPos
            ) {
                todo.position--
            } else if (
                todo.position == draggingPos
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