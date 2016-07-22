import * as React from 'react'

import { Todo } from '../documents/Todo'

import TodoItem from './TodoItem'

require('./TodoList.css')

export default class TodoList extends React.Component<Props, State> {
    
    private draggingItem: number

    constructor(props: Props) {
        super(props)
        this.state = { todos: props.initialTodos, draggingItem: null }
    }
    
    render() {
        return (
            <div className='todo-list'>
                <table
                    className={
                        'mdl-data-table mdl-js-data-table mdl-shadow--2dp'
                    }
                    onDragOver={this.dragOver}>
                    <tbody>
                        {this.state.todos.map((todo, index) =>
                            <TodoItem
                                todo={todo} index={index} key={todo.id}
                                onChange={this.todoChanged}
                                dragging={this.state.draggingItem == index}
                                dragStart={this.dragStart}
                                dragEnd={this.dragEnd}
                                dragOverItem={this.dragOverItem} />
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    private dragOver = (event: React.DragEvent) => {
        event.preventDefault()
        this.setState({ draggingItem: this.draggingItem } as State)
    }

    private dragStart = (index: number) => {
        this.draggingItem = index
    }

    private dragEnd = () => {
        this.setState({ draggingItem: null } as State)
    }

    private dragOverItem = (event: React.DragEvent, index: number) => {
        event.preventDefault()
        if (this.draggingItem === index) {
            return
        }
        let todo = this.state.todos[this.draggingItem],
            todos = this.state.todos.slice()
        todos.splice(this.draggingItem, 1)
        todos.splice(index, 0, todo)
        this.draggingItem = index
        this.setState({ todos } as State)
    }
    
    private todoChanged = (todo: Todo, index: number) => {
        let todos = this.state.todos.slice()
        todos[index] = todo
        this.setState({ todos } as State)
    }
}

interface Props {
    initialTodos: Todo[]
}

interface State {
    todos: Todo[]
    draggingItem: number
}