import * as React from 'react';

import { Todo } from '../documents/Todo';

import TodoItem from './TodoItem';

require('./TodoList.css');

export default class TodoList extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = { todos: props.initialTodos };
    }
    
    render() {
        return (
            <table className={
                'todo-list ' +
                'mdl-data-table mdl-js-data-table mdl-shadow--2dp'
            }>
                <tbody>
                    {this.state.todos.map((todo, index) =>
                        <TodoItem
                            todo={todo} index={index} key={index}
                            onChange={this.todoChanged} />
                    )}
                </tbody>
            </table>
        );
    }
    
    private todoChanged = (todo: Todo, index: number) => {
        let todos = this.state.todos;
        todos[index] = todo;
        this.setState({ todos });
    }
}

interface Props {
    initialTodos: Todo[];
}

interface State {
    todos: Todo[];
}