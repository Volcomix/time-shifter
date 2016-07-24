import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import * as moment from 'moment'

import todoApp from './reducers'
import * as actions from './actions'

let store = createStore(
    todoApp,
    (window as any).devToolsExtension && (window as any).devToolsExtension()
)

/*
import { Todo } from './documents/Todo'

import TodoList from './components/TodoList'

const todos: Todo[] = [
    { id: 0, done: true, task: 'Todo 1', position: 0 },
    { id: 1, task: 'Todo 2', detail: 'Pipoup', position: 1 },
    { id: 2, hour: moment().format('HH:mm'), position: 2 }
]

ReactDOM.render(
    <TodoList initialTodos={todos} />, document.getElementById('root')
)
*/