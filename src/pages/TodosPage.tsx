import React, {useEffect, useState} from "react";
import {TodoForm} from "../components/TodoForm";
import {TodoList} from "../components/TodoList";
import {ITodo} from "../interfaces";

declare var confirm: (question: string) => boolean; // Чтобы typescript не ругался на глобальный метод

export const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[];
        setTodos(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addHandler = (title: string) => {
        const newTodo: ITodo = {
            title,
            id: Date.now(),
            completed: false
        };

        // setTodos([newTodo, ...todos]); перетирает предыдущий стейт

        setTodos(prev => [newTodo, ...prev]) // точно уверены что добавляем новый item в пред. стейт
    };

    const toggleHandler = (id: number) => {
        setTodos(prev =>
            prev.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        completed: !item.completed
                    }
                }
                return item;
            }))
    };

    const removeHandler = (id: number) => {
        const shouldRemove = confirm('Вы уверены, что хотите удалить элемент?');
        if (shouldRemove) setTodos(prev => prev.filter(item => item.id !== id))
    };

    return (
        <>
            <TodoForm onAdd={addHandler}/>
            <TodoList todos={todos} onToggle={toggleHandler} onRemove={removeHandler}/>
        </>
    )
};
