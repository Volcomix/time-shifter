import * as React from 'react'

import { Todo } from '../documents/Todo'

import Checkbox from './Checkbox'
import TextField from './TextField'

interface Props {
    todo: Todo
    onChange: (todo: Todo) => void
    dragging: boolean
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
        
        return (
            <li
                style={{
                    position: 'absolute',
                    top: this.props.todo.position * 100,
                    transition: 'top 100ms',
                    visibility: this.props.dragging ? 'hidden' : null
                }}
                draggable={true}
                onDragStart={this.dragStart}
                onDragEnd={this.dragEnd}
                onDragOver={this.dragOver}
            >
                <Checkbox
                    id={doneId}
                    checked={this.props.todo.done}
                    onChange={this.doneChanged}
                />
                <TextField
                    type='time'
                    id={hourId}
                    value={this.props.todo.hour}
                    onChange={this.hourChanged}
                />
                <TextField
                    label='Tâche...'
                    id={taskId}
                    value={this.props.todo.task}
                    onChange={this.taskChanged}
                />
                <TextField
                    label='Détail...'
                    id={detailId}
                    value={this.props.todo.detail}
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