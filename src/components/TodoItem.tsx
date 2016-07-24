import * as React from 'react'

import Todo from '../model/Todo'

interface Props {
    todo: Todo
}

const TodoItem: React.StatelessComponent<Props> = ({ todo }) => (
    <div>{todo.id}</div>
)

export default TodoItem