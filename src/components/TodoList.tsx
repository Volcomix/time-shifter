import * as React from 'react'
import Paper from 'material-ui/Paper'
import { List } from 'material-ui/List'

import Todo from '../model/Todo'
import TodoItem from './TodoItem'

interface Props {
    todos: Todo[]
}

const TodoList: React.StatelessComponent<Props> = ({ todos }) => (
    <Paper style={{ margin: 10 }}>
        <List>
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </List>
    </Paper>
)

export default TodoList