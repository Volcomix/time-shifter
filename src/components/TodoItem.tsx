import * as React from 'react'
import * as moment from 'moment'
import { ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import TimePicker from 'material-ui/TimePicker'

import Todo from '../model/Todo'

interface Props {
    todo: Todo
}

const TodoItem: React.StatelessComponent<Props> = ({ todo }) => (
    <ListItem
        leftCheckbox={
            <Checkbox checked={todo.isDone} />
        }
        primaryText={todo.task}
        secondaryText={todo.detail}
    >
        <TimePicker
            hintText='Heure de début'
            format='24hr'
            value={todo.startHour}
        />
        <TimePicker
            hintText='Durée'
            format='24hr'
            value={moment({ 'minutes': todo.duration }).toDate()}
        />
    </ListItem>
)

export default TodoItem