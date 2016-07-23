import * as React from 'react'

import { Todo } from '../documents/Todo'

import Checkbox from './Checkbox'
import TextField from './TextField'

interface Props {
    todo: Todo
    height: number
    onChange: (todo: Todo) => void
    isDragging: boolean
    isDragInProgress: boolean
    dragStart: (todo: Todo) => void
    dragEnd: () => void
    dragOverItem: (event: React.DragEvent, todo: Todo) => void
}

export default class TodoItem extends React.Component<Props, {}> {    
    render() {
        const doneId = `item-done-${this.props.todo.id}`
        const hourId = `item-hour-${this.props.todo.id}`
        const taskId = `item-task-${this.props.todo.id}`
        const detailId = `item-detail-${this.props.todo.id}`

        const pointerEvents = this.props.isDragInProgress ? 'none': null
        const border = '1px solid rgba(0, 0, 0, 0.12)'
        const margin = '0px 18px'
        const padding = '4px 0px'
        
        return (
            <li
                className={this.props.isDragging ? 'mdl-shadow--8dp' : null}
                style={{
                    position: 'absolute',
                    transition: 'top 150ms ease-out, box-shadow 250ms ease-out',
                    display: 'flex',
                    alignItems: 'center',
                    top: this.props.todo.position * this.props.height,
                    left: 0,
                    right: 0,
                    borderTop: this.props.todo.position === 0 ? border : null,
                    marginTop: this.props.todo.position === 0 ? -1 : null,
                    borderBottom: border,
                    borderLeft: border,
                    borderRight: border

                }}
                draggable={true}
                onDragStart={this.dragStart}
                onDragEnd={this.dragEnd}
                onDragOver={this.dragOver}
            >
                <Checkbox
                    id={doneId}
                    checked={this.props.todo.done}
                    style={{
                        width: 24,
                        margin,
                        padding,
                        pointerEvents
                    }}
                    onChange={this.doneChanged}
                />
                <TextField
                    type='time'
                    id={hourId}
                    value={this.props.todo.hour}
                    style={{
                        width: 90,
                        margin,
                        padding,
                        pointerEvents
                    }}
                    onChange={this.hourChanged}
                />
                <TextField
                    label='Tâche...'
                    id={taskId}
                    value={this.props.todo.task}
                    style={{
                        flexGrow: 1,
                        minWidth: 250,
                        margin,
                        padding,
                        pointerEvents
                    }}
                    onChange={this.taskChanged}
                />
                <TextField
                    label='Détail...'
                    id={detailId}
                    value={this.props.todo.detail}
                    style={{
                        width: 300,
                        minWidth: 150,
                        margin,
                        padding,
                        pointerEvents
                    }}
                    onChange={this.detailChanged}
                />
            </li>
        )
    }
    
    private dragStart = (event: React.DragEvent) => {
        event.dataTransfer.setData('Text', `${this.props.todo.id}`)
        event.dataTransfer.effectAllowed = 'move'
        this.setState({ dragging: true })
        this.props.dragStart(this.props.todo)
    }
    
    private dragEnd = (event: React.DragEvent) => {
        this.setState({ dragging: false })
        this.props.dragEnd()
    }

    private dragOver = (event: React.DragEvent) => {
        this.props.dragOverItem(event, this.props.todo)
    }
    
    private doneChanged = (newChecked: boolean) => {
        this.updateTodo(todo => todo.done = newChecked)
    }
    
    private hourChanged = (newHour: string) => {
        this.updateTodo(todo => todo.hour = newHour)
    }
    
    private taskChanged = (newTask: string) => {
        this.updateTodo(todo => todo.task = newTask)
    }
    
    private detailChanged = (newDetail: string) => {
        this.updateTodo(todo => todo.detail = newDetail)
    }
    
    private updateTodo(updateFunction: (todo: Todo) => void) {
        const { todo, onChange } = this.props
        updateFunction(todo)
        onChange(todo)
    }
}