import * as React from 'react';

import { Todo } from '../documents/Todo';

import TodoItem from './TodoItem';

require('./TodoList.css');

export default class TodoList extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = { todos: props.initialTodos, dragging: false };
    }
    
    render() {
        return (
            <div className='todo-list'>
                <table
                    className={
                        'mdl-data-table mdl-js-data-table mdl-shadow--2dp'
                    }
                    onDragOver={this.dragOver}>
                    <tbody>
                        {this.state.todos.map((todo, index) =>
                            <TodoItem
                                todo={todo} index={index} key={index}
                                onChange={this.todoChanged}
                                dragging={this.state.dragging}
                                dragEnd={this.dragEnd} />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    private dragOver = (event: React.DragEvent) => {
        this.setState({ todos: this.state.todos, dragging: true });
    }

    private dragEnd = () => {
        this.setState({ todos: this.state.todos, dragging: false });
    }
    
    private todoChanged = (todo: Todo, index: number) => {
        let todos = this.state.todos;
        todos[index] = todo;
        this.setState({ todos, dragging: this.state.dragging });
    }
}

interface Props {
    initialTodos: Todo[];
}

interface State {
    todos: Todo[];
    dragging: boolean;
}