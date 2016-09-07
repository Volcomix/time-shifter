import * as React from 'react'
import * as moment from 'moment'
import Checkbox from 'material-ui/Checkbox'
import Toggle from 'material-ui/Toggle'
import TimePicker from 'material-ui/TimePicker'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import { grey900, grey600 } from 'material-ui/styles/colors'

import Todo from '../model/Todo'

export interface Props {
    todo: Todo
    hover: boolean
}

export interface Callbacks {
    onToggle: (id: number) => void
    onStartHourChange: (id: number, startHour: Date) => void
    onDurationChange: (id: number, duration: number) => void
    onTaskChange: (id: number, task: string) => void
    onDetailChange: (id: number, detail: string) => void
    onMove: (fromPos: number, toPos: number) => void
    onDelete: (id: number) => void
}

const style = {
    timeTextField: {
        width: 60
    } as React.CSSProperties,

    timeInput: {
        cursor: 'pointer'
    } as React.CSSProperties,

    underlineStyle: {
        borderBottomWidth: 0
    } as React.CSSProperties,

    underlineFocusStyle: {
        borderBottomWidth: 2
    } as React.CSSProperties
}

const TodoItem = ({
    todo,
    hover,
    onToggle,
    onStartHourChange,
    onDurationChange,
    onTaskChange,
    onDetailChange,
    onMove,
    onDelete
}: Props & Callbacks) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1
        }}
    >
        <Checkbox
            style={{ width: undefined }}
            checked={todo.isDone}
            onCheck={() => onToggle(todo.id)}
        />
        {/*<Toggle
            style={{
                width: undefined,
                paddingRight: 16
            }}
        />*/}
        <TimePicker
            hintText='Début'
            format='24hr'
            value={todo.startHour}
            textFieldStyle={style.timeTextField}
            inputStyle={style.timeInput}
            onChange={(e: {}, t: Date) => {
                const time = moment(t).startOf('minute').toDate()
                onStartHourChange(todo.id, time)
            }}
            underlineShow={false}
        />
        {/*<TimePicker
            hintText='Durée'
            format='24hr'
            value={moment({ 'minutes': todo.duration }).toDate()}
            textFieldStyle={style.timeTextField}
            inputStyle={style.timeInput}
            onChange={(e: {}, t: Date) => {
                const time = moment(t).startOf('minute')
                const today = moment({hour: 0})
                const duration = time.diff(today, 'minutes')
                onDurationChange(todo.id, duration)
            }}
            underlineShow={false}
        />*/}
        <TextField
            hintText={hover ? 'Tâche' : undefined}
            value={todo.task}
            style={{ flexGrow: 1 }}
            onChange={e => onTaskChange(todo.id, (e.target as HTMLInputElement).value)}
            underlineStyle={style.underlineStyle}
            underlineFocusStyle={style.underlineFocusStyle}
        />
        <TextField
            hintText={hover ? 'Détail' : undefined}
            value={todo.detail}
            onChange={e => onDetailChange(todo.id, (e.target as HTMLInputElement).value)}
            underlineStyle={style.underlineStyle}
            underlineFocusStyle={style.underlineFocusStyle}
        />
        <IconButton
            tooltip={''/*'Supprimer la tâche'*/}
            iconStyle={{
                transition: 'initial',
                visibility: hover ? 'visible' : 'hidden'
            }}
            tooltipPosition='bottom-left'
            onClick={() => onDelete(todo.id)}
        >
            <ActionDelete
                color={grey600}
                hoverColor={grey900}
            />
        </IconButton>
    </div>
    )

export default TodoItem