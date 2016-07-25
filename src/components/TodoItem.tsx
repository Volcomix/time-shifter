import * as React from 'react'
import * as moment from 'moment'
import { ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import TimePicker from 'material-ui/TimePicker'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'

import Todo from '../model/Todo'

interface Props {
    todo: Todo
    onToggle: (id: number) => void
    onTaskChange: (id: number, task: string) => void
    onDelete: (id: number, position: number) => void
}

const TodoItem = ({ todo, onToggle, onTaskChange, onDelete }: Props) => (
    <ListItem
        leftCheckbox={
            <Checkbox
                checked={todo.isDone}
                style={{ top: 24 }}
                onClick={() => onToggle(todo.id)}
            />
        }
        style={{
            display: 'flex',
            position: 'absolute',
            top: todo.position * 80,
            left: 0,
            right: 0
        }}
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
            onChange={e =>
                onTaskChange(todo.id, (e.target as HTMLInputElement).value)
            }
        />
        <TextField
            hintText='Détail'
            value={todo.detail}
        />
        <IconButton
            tooltip='Supprimer la tâche'
            tooltipPosition='bottom-left'
            onClick={() => onDelete(todo.id, todo.position)}
        >
            <ActionDelete />
        </IconButton>
    </ListItem>
)

export default TodoItem