import * as React from 'react'

import Todo from '../model/Todo'
import DraggableTodo from '../containers/DraggableTodo'

export interface Props {
    todos: Todo[]
    draggingTodo: number
}

const todoHeight = 68

const TodoList = ({ todos, draggingTodo }: Props) => (
    <ul
        style={{
            position: 'absolute',
            top: 10,
            left: 10,
            right: 10,
            marginTop: 0,
            marginBottom: 10,
            padding: 0,
            height: todos.length * todoHeight
        }}
    >
        {todos.map(todo => (
            <DraggableTodo
                key={todo.id}
                isDragging={draggingTodo === todo.id}
                todo={todo}
                y={todo.order * todoHeight}
            />
        ))}
    </ul>
)

export default TodoList