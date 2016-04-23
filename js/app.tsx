import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';

import { Todo } from './documents/Todo';

import TodoList from './components/TodoList';

let todos: Todo[] = [
    { done: true, task: 'Todo 1' },
    { task: 'Todo 2', detail: 'Pipoup' },
    { hour: moment().format('HH:mm') }
];

ReactDOM.render(<TodoList initialTodos={todos} />, document.getElementById('react'));