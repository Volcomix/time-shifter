import * as React from 'react'
import * as moment from 'moment'
import { ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import TimePicker from 'material-ui/TimePicker'
import TextField from 'material-ui/TextField'

import Todo from '../model/Todo'

interface Props {
    todo: Todo
}

const TodoItem: React.StatelessComponent<Props> = ({ todo }) => (
    <ListItem
        leftCheckbox={
            <Checkbox
                checked={todo.isDone}
                style={{ top: 24 }}
            />
        }
        style={{ display: 'flex' }}
    >
        <TimePicker
            hintText='Heure de début'
            format='24hr'
            value={todo.startHour}
            style={{ display: 'inline' }}
            textFieldStyle={{ width: 120 }}
        />
        <TimePicker
            hintText='Durée'
            format='24hr'
            value={moment({ 'minutes': todo.duration }).toDate()}
            style={{ display: 'inline' }}
            textFieldStyle={{ width: 120 }}
        />
        <TextField
            hintText='Tâche'
            value={todo.task}
            style={{ flexGrow: 1 }}
        />
        <TextField
            hintText='Détail'
            value={todo.detail}
        />
    </ListItem>
)

export default TodoItem