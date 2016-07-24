import * as React from 'react'
import { ListItem } from 'material-ui/List'

import Todo from '../model/Todo'

interface Props {
    todo: Todo
}

const TodoItem: React.StatelessComponent<Props> = ({ todo }) => (
    <ListItem
        primaryText={todo.id}
        secondaryText={todo.task}
    />
)

export default TodoItem