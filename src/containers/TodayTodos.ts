import { connect } from 'react-redux'

import { TodosState, getTodos } from '../reducers'
import TodoList, { Props } from '../components/TodoList'

const mapStateToProps = (state: TodosState): Props => {
    return {
        todos: getTodos(state),
        draggingTodo: state.draggingTodo
    }
}

const TodayTodos = connect(
    mapStateToProps
)(TodoList)

export default TodayTodos