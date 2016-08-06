import * as React from 'react'

import Todo from '../model/Todo'
import EditableTodo from '../containers/EditableTodo'
import DraggableItem from './DraggableItem'

export interface Props {
    todos: Todo[]
}

const todoHeight = 68

const TodoList: React.StatelessComponent<Props> = ({ todos }) => (
    <ul
        style={{
            position: 'absolute',
            top: 10,
            left: 10,
            right: 10,
            marginBottom: 10,
            height: todos.length * todoHeight
        }}
    >
        {todos.map(todo => (
            <DraggableItem key={todo.id} order={todo.order} height={todoHeight}>
                <EditableTodo todo={todo} />
            </DraggableItem>
        ))}
    </ul>
)

export default TodoList