import * as React from 'react'
import Paper from 'material-ui/Paper'

import Todo from '../model/Todo'
import EditableTodo from '../containers/EditableTodo'
import DraggableItem from './DraggableItem'

export interface Props {
    todos: Todo[]
}

const todoHeight = 68

const TodoList: React.StatelessComponent<Props> = ({ todos }) => (
    <Paper
        style={{
            position: 'absolute',
            top: 10,
            left: 10,
            right: 10,
            marginBottom: 10,
            height: todos.length * todoHeight
        }}
    >
        <ul>
            {todos.map(todo => (
                <DraggableItem key={todo.id} order={todo.order} height={todoHeight}>
                    <EditableTodo todo={todo} />
                </DraggableItem>
            ))}
        </ul>
    </Paper>
)

export default TodoList