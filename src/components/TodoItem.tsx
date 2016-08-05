import * as React from 'react'
import * as moment from 'moment'
import { ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import Toggle from 'material-ui/Toggle'
import TimePicker from 'material-ui/TimePicker'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionReorder from 'material-ui/svg-icons/action/reorder'
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import { grey500 } from 'material-ui/styles/colors'

import Todo from '../model/Todo'

export interface Props {
    todo: Todo
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

export interface State {
    isDragging: boolean,
    top: number
}

class TodoItem extends React.Component<Props & Callbacks, State> {
    private target: Node
    private handle: HTMLDivElement

    constructor(props: Props & Callbacks) {
        super(props)
        this.state = { isDragging: false, top: -1 }
    }

    render() {
        const {
            todo,
            onToggle,
            onStartHourChange,
            onDurationChange,
            onTaskChange,
            onDetailChange,
            onMove,
            onDelete
        } = this.props

        return (
            <ListItem
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    top: this.state.isDragging ? this.state.top : todo.order * 80,
                    left: 0,
                    right: 0,
                    transition: this.state.isDragging ? 'all 0.1ms' : 'all 200ms'
                }}
                disabled={true}
                draggable={true}
                onMouseDown={ev => this.target = ev.target as Node}
                onDragStart={ev => {
                    if (this.handle.contains(this.target)) {
                        ev.dataTransfer.effectAllowed = 'move'

                        // Typescript definition does not declare setDragImage
                        ;(ev.dataTransfer as any).setDragImage(new Image(), 0, 0)
                        
                        ev.dataTransfer.setData('text/plain', todo.id.toString())
                        this.setState({ isDragging: true, top: ev.clientY - 50 })
                    } else {
                        ev.preventDefault()
                    }
                }}
                onDrag={ev => {
                    this.setState({ isDragging: true, top: ev.clientY - 50 })
                }}
                onDragEnd={ev =>
                    this.setState({ isDragging: false, top: -1 })
                }
            >
                <Checkbox
                    style={{ width: undefined }}
                    checked={todo.isDone}
                    onCheck={() => onToggle(todo.id)}
                />
                <Toggle
                    style={{
                        width: undefined,
                        paddingRight: 16
                    }}
                />
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
                    onChange={e =>
                        onTaskChange(todo.id, (e.target as HTMLInputElement).value)
                    }
                />
                <TextField
                    hintText='Détail'
                    value={todo.detail}
                    onChange={e =>
                        onDetailChange(todo.id, (e.target as HTMLInputElement).value)
                    }
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
                    onClick={() => onDelete(todo.id)}
                >
                    <ActionDelete />
                </IconButton>
                <div ref={node => this.handle = node}>
                    <ActionReorder style={{ cursor: 'move' }} color={grey500} />
                </div>
            </ListItem>
        )
    }
}

export default TodoItem