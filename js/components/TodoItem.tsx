import * as React from 'react';
import * as moment from 'moment';

import { Todo } from '../documents/Todo';

import TextField from './TextField';

export default class TodoItem extends React.Component<Props, {}> {
    
    hourChanged(event: React.FormEvent) {
        (event.target as HTMLInputElement).value;
    }
    
    render() {
        let hourId = 'item-hour-' + this.props.index;
        let taskId = 'item-task-' + this.props.index;
        let detailId = 'item-detail-' + this.props.index;
        
        let time = this.props.todo.hour && moment(this.props.todo.hour).format('HH:mm');
        
        return (
            <tr className={this.props.todo.done ? 'is-selected' : ''}>
                <td className='mdl-data-table__cell--non-numeric'>
                    <TextField id={hourId} value={time} type='time'
                        onChange={this.hourChanged} />
                </td>
                <td className='mdl-data-table__cell--non-numeric'>
                    <TextField
                        id={taskId} value={this.props.todo.task}
                        label='Tâche...' />
                </td>
                <td className='mdl-data-table__cell--non-numeric'>
                    <TextField
                        id={detailId} value={this.props.todo.detail}
                        label='Détail...' />
                </td>
            </tr>
        );
    }
}

interface Props {
    index: number;
    todo: Todo;
}