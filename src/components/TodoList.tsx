import * as React from 'react'

import Todo from '../model/Todo'

interface Props {
    todos: Todo[]
}

const TodoList: React.StatelessComponent<Props> = ({ todos }) => (
    <ul>
        {todos.map(todo => (
            <li
                style={{
                    position: 'absolute',
                    top: todo.position * 50,
                    transition: 'top 150ms ease-out'
                }}
            >{todo.id}</li>
        ))}
    </ul>
)

export default TodoList