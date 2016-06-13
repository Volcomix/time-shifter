import * as React from 'react';

import { Todo } from '../documents/Todo';

import Checkbox from './Checkbox';
import TextField from './TextField';

export default class TodoItem extends React.Component<Props, {}> {    
    render() {
        let doneId = `item-done-${this.props.todo.id}`,
            hourId = `item-hour-${this.props.todo.id}`,
            taskId = `item-task-${this.props.todo.id}`,
            detailId = `item-detail-${this.props.todo.id}`;
        
        return (
            <tr
                draggable={true}
                onDragStart={this.dragStart}
                onDragEnd={this.dragEnd}
                onDragOver={this.dragOver}
                className={this.props.dragging ? 'dragging' : null}>
                <td className='mdl-data-table__cell--non-numeric'>
                    <Checkbox
                        id={doneId} checked={this.props.todo.done}
                        onChange={this.doneChanged} />
                </td>
                <td className='mdl-data-table__cell--non-numeric'>
                    <TextField
                        id={hourId} value={this.props.todo.hour}
                        type='time' onChange={this.hourChanged} />
                </td>
                <td className='mdl-data-table__cell--non-numeric'>
                    <TextField
                        id={taskId} value={this.props.todo.task}
                        label='Tâche...' onChange={this.taskChanged}/>
                </td>
                <td className='mdl-data-table__cell--non-numeric'>
                    <TextField
                        id={detailId} value={this.props.todo.detail}
                        label='Détail...' onChange={this.detailChanged}/>
                </td>
            </tr>
        );
    }
    
    private dragStart = (event: React.DragEvent) => {
        event.dataTransfer.setData('Text', `${this.props.todo.id}`);
        event.dataTransfer.effectAllowed = 'move';
        this.setState({ dragging: true });
        this.props.dragStart(this.props.index);
    }
    
    private dragEnd = (event: React.DragEvent) => {
        this.setState({ dragging: false });
        this.props.dragEnd();
    }

    private dragOver = (event: React.DragEvent) => {
        this.props.dragOverItem(event, this.props.index);
    }
    
    private doneChanged = (newChecked: boolean) => {
        this.updateTodo(todo => todo.done = newChecked)
    }
    
    private hourChanged = (newHour: string) => {
        this.updateTodo(todo => todo.hour = newHour);
    }
    
    private taskChanged = (newTask: string) => {
        this.updateTodo(todo => todo.task = newTask);
    }
    
    private detailChanged = (newDetail: string) => {
        this.updateTodo(todo => todo.detail = newDetail);
    }
    
    private updateTodo(updateFunction: (todo: Todo) => void) {
        let { index, todo, onChange } = this.props;
        updateFunction(todo);
        onChange(todo, index);
    }
}

interface Props {
    index: number;
    todo: Todo;
    onChange: (todo: Todo, index: number) => void;
    dragging: boolean;
    dragStart: (index: number) => void;
    dragEnd: () => void;
    dragOverItem: (event: React.DragEvent, index: number) => void;
}