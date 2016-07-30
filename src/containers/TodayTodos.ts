import { connect } from 'react-redux'

import { TodosState, getTodos } from '../reducers'
import TodoList from '../components/TodoList'

const mapStateToProps = (state: TodosState) => {
    return {
        todos: getTodos(state)
    }
}

const TodayTodos = connect(
    mapStateToProps
)(TodoList)

export default TodayTodos