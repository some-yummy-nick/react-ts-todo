import React from 'react';
import {ITodo} from "../interfaces";

type TodoListProps = {
    todos: ITodo[]
    onToggle(id: number): void
    onRemove: (id: number) => void // можно через лямбда функцию
}

export const TodoList: React.FC<TodoListProps> = ({todos, onToggle, onRemove}) => {
    if (!todos.length) {
        return <p>Добавьте первое дело</p>;
    }

    const handleRemove = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        onRemove(id);
    };

    return (
        <>
            <ul>
                {todos.map(todo => {
                        const classes = ['todo'];
                        if (todo.completed) classes.push('completed');

                        return (
                            <li className={classes.join(' ')} key={todo.id}>
                                <label>
                                    <input type="checkbox" checked={todo.completed}
                                           onChange={onToggle.bind(null, todo.id)}/>
                                    <span>{todo.title}</span>
                                    <i className="material-icons red-text"
                                       onClick={e => handleRemove(e, todo.id)}>delete</i>
                                </label>
                            </li>
                        )
                    }
                )}
            </ul>
        </>
    )
};
