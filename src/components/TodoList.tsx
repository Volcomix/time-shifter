import * as React from 'react'
import Paper from 'material-ui/Paper'
import { List } from 'material-ui/List'

import Todo from '../model/Todo'
import EditableTodo from '../containers/EditableTodo'

interface Props {
    todos: Todo[]
}

const TodoList: React.StatelessComponent<Props> = ({ todos }) => (
    <Paper
        style={{
            position: 'absolute',
            top: 10,
            left: 10,
            right: 10,
            marginBottom: 10,
            height: todos.length * 80
        }}
    >
        <List>
            {todos.map(todo => (
                <EditableTodo key={todo.id} todo={todo} />
            ))}
        </List>
    </Paper>
)

export default TodoList