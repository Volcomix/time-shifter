import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';

import { Todo } from './documents/Todo';

import TodoList from './components/TodoList';

let todos: Todo[] = [
    { id: 0, done: true, task: 'Todo 1' },
    { id: 1, task: 'Todo 2', detail: 'Pipoup' },
    { id: 2, hour: moment().format('HH:mm') }
];

ReactDOM.render(
    <TodoList initialTodos={todos} />, document.getElementById('react')
);