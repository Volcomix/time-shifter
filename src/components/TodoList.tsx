import * as React from 'react'

import Todo from '../model/Todo'
import TodoItem from './TodoItem'

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
            >
                <TodoItem key={todo.id} todo={todo} />
            </li>
        ))}
    </ul>
)

export default TodoList