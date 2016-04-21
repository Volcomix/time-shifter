import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Todo } from './documents/Todo';

import TodoList from './components/TodoList';

let todos: Todo[] = [
    { done: true, task: 'Todo 1' },
    { task: 'Todo 2', detail: 'Pipoup' },
    { hour: new Date() }
];

ReactDOM.render(<TodoList todos={todos} />, document.getElementById('react'));