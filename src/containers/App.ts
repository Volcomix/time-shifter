import { connect } from 'react-redux'

import Todo from '../model/Todo'
import TodoList from '../components/TodoList'

const mapStateToProps = (state: Todo[]) => {
    return {
        todos: state
    }
}

const App = connect(
    mapStateToProps
)(TodoList)

export default App