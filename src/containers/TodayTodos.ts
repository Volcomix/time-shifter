import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { TodoAction, mouseOutTodo } from '../actions'
import { TodosState, getTodos } from '../reducers'
import TodoList, { Props, Callbacks } from '../components/TodoList'

const mapStateToProps = (state: TodosState): Props => {
    return {
        todos: getTodos(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TodoAction>): Callbacks => {
    return {
        onMouseOut: () => {
            dispatch(mouseOutTodo())
        }
    }
}

const TodayTodos = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default TodayTodos