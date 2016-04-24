import * as React from 'react';

import { Todo } from '../documents/Todo';

import TextField from './TextField';

export default class TodoItem extends React.Component<Props, {}> {
    
    render() {
        let hourId = 'item-hour-' + this.props.index,
            taskId = 'item-task-' + this.props.index,
            detailId = 'item-detail-' + this.props.index;
        
        return (
            <tr className={this.props.todo.done ? 'is-selected' : ''}>
                <td className='mdl-data-table__cell--non-numeric'>
                    <TextField
                        id={hourId} value={this.props.todo.hour} type='time'
                        onChange={this.hourChanged} />
                </td>
                <td className='mdl-data-table__cell--non-numeric'>
                    <TextField
                        id={taskId} value={this.props.todo.task} label='Tâche...'
                        onChange={this.taskChanged}/>
                </td>
                <td className='mdl-data-table__cell--non-numeric'>
                    <TextField
                        id={detailId} value={this.props.todo.detail} label='Détail...'
                        onChange={this.detailChanged}/>
                </td>
            </tr>
        );
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
}