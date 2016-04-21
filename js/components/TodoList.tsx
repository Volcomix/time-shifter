import * as React from 'react';

import { Todo } from '../documents/Todo';

import TodoItem from './TodoItem';

export default class TodoList extends React.Component<Props, {}> {
    
    render() {
        return (
            <table className={
                'mdl-data-table mdl-js-data-table ' +
                'mdl-data-table--selectable mdl-shadow--2dp'}>
                <thead>
                    <tr>
                        <th className='mdl-data-table__cell--non-numeric'>Heure</th>
                        <th className='mdl-data-table__cell--non-numeric'>Tâche</th>
                        <th className='mdl-data-table__cell--non-numeric'>Détail</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.todos.map((todo, index) =>
                        <TodoItem todo={todo} index={index} key={index} />
                    )}
                </tbody>
            </table>
        );
    }
}

interface Props {
    todos: Todo[];
}