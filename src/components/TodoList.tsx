import * as React from 'react'

import Todo from '../model/Todo'
import DraggableTodo from '../containers/DraggableTodo'

export interface Props {
    todos: Todo[]
}

export interface Callbacks {
    onMouseOut: React.MouseEventHandler
}

const todoHeight = 48

const TodoList = ({ todos, onMouseOut }: Props & Callbacks) => (
    <ul
        style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            borderTop: todos.length ? '1px solid rgba(0, 0, 0, 0.005)' : undefined,
            top: 9,
            left: 10,
            right: 10,
            marginTop: 0,
            marginBottom: 10,
            padding: 0,
            height: todos.length * todoHeight
        }}
        onMouseOut={onMouseOut}
    >
        {todos.map(todo => (
            <DraggableTodo
                key={todo.id}
                todo={todo}
                height={todoHeight}
            />
        ))}
    </ul>
)

export default TodoList