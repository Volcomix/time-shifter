import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as injectTapEventPlugin from 'react-tap-event-plugin'

import todoApp from './reducers'
import App from './components/App'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

let store = createStore(
    todoApp,
    (window as any).devToolsExtension && (window as any).devToolsExtension()
)

render(
    <Provider store={store}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
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