import * as React from 'react';

import { Todo } from '../documents/Todo';

import Checkbox from './Checkbox';
import TextField from './TextField';

export default class TodoItem extends React.Component<Props, State> {
    
    constructor(props) {
        super(props);
        this.state = { dragging: false }
    }
    
    render() {
        let doneId = `item-done-${this.props.index}`,
            hourId = `item-hour-${this.props.index}`,
            taskId = `item-task-${this.props.index}`,
            detailId = `item-detail-${this.props.index}`;
        
        return (
            <tr
                draggable={true}
                onDragStart={this.dragStart}
                onDragEnd={this.dragEnd}
                className={
                    this.state.dragging && this.props.dragging ?
                    'dragging' : null
                }>
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
        event.dataTransfer.setData('Text', `${this.props.index}`);
        event.dataTransfer.effectAllowed = 'move';
        this.setState({ dragging: true });
    }
    
    private dragEnd = (event: React.DragEvent) => {
        this.setState({ dragging: false });
        this.props.dragEnd();
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
    dragEnd: () => void;
}

interface State {
    dragging: boolean;
}