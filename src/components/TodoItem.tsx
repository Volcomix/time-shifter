import * as React from 'react'
import * as moment from 'moment'
import { ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import TimePicker from 'material-ui/TimePicker'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'

import Todo from '../model/Todo'

interface Props {
    todo: Todo
    onToggle: (id: number) => void
    onStartHourChange: (id: number, startHour: Date) => void
    onDurationChange: (id: number, duration: number) => void
    onTaskChange: (id: number, task: string) => void
    onDetailChange: (id: number, detail: string) => void
    onMove: (fromPos: number, toPos: number) => void
    onDelete: (id: number) => void
}

const TodoItem = ({
    todo,
    onToggle,
    onStartHourChange,
    onDurationChange,
    onTaskChange,
    onDetailChange,
    onMove,
    onDelete
}: Props) => (
    <ListItem
        style={{
            display: 'flex',
            position: 'absolute',
            top: todo.order * 80,
            left: 0,
            right: 0
        }}
        leftCheckbox={
            <Checkbox
                checked={todo.isDone}
                style={{ top: 24 }}
                onCheck={() => onToggle(todo.id)}
            />
        }
    >
        <TimePicker
            hintText='Début'
            format='24hr'
            value={todo.startHour}
            style={{ display: 'inline' }}
            textFieldStyle={{ width: 100 }}
            onChange={(e: {}, t: Date) => {
                const time = moment(t).startOf('minute').toDate()
                onStartHourChange(todo.id, time)
            }}
        />
        <TimePicker
            hintText='Durée'
            format='24hr'
            value={moment({ 'minutes': todo.duration }).toDate()}
            style={{ display: 'inline' }}
            textFieldStyle={{ width: 100 }}
            onChange={(e: {}, t: Date) => {
                const time = moment(t).startOf('minute')
                const today = moment({hour: 0})
                const duration = time.diff(today, 'minutes')
                onDurationChange(todo.id, duration)
            }}
        />
        <TextField
            hintText='Tâche'
            value={todo.task}
            style={{ flexGrow: 1 }}
            onChange={e => onTaskChange(todo.id, (e.target as HTMLInputElement).value)}
        />
        <TextField
            hintText='Détail'
            value={todo.detail}
            onChange={e => onDetailChange(todo.id, (e.target as HTMLInputElement).value)}
        />
        <IconButton
            tooltip='Déplacer la tâche vers le haut'
            onClick={() => onMove(todo.order, todo.order - 1)}
        >
            <ArrowUp />
        </IconButton>
        <IconButton
            tooltip='Déplacer la tâche vers le bas'
            onClick={() => onMove(todo.order, todo.order + 1)}
        >
            <ArrowDown />
        </IconButton>
        <IconButton
            tooltip='Supprimer la tâche'
            tooltipPosition='bottom-left'
            onClick={() => onDelete(todo.id)}
        >
            <ActionDelete />
        </IconButton>
    </ListItem>
)

export default TodoItem