import * as React from 'react'

import TodayTodos from '../containers/TodayTodos'
import AddTodo from '../containers/AddTodo'

const App = () => (
    <div>
        <TodayTodos />
        <AddTodo />
    </div>
)

export default App