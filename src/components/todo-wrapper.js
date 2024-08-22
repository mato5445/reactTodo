import React, {useEffect, useState} from "react";
import {TodoForm} from "./todo-form";
import {Todo} from "./todo";
import {EditTodoForm} from "./edit-todo-form";
import axios from "axios";
import {getTodoList, addNewTodo,deleteTodo} from "../services/todo-service";

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    useEffect(() => {    const loadData = async () => {
        const result = await getTodoList();
        setTodos(result);
    };
        loadData();
    }, []);

    const addTodo = async (todo) => {
        const result = await addNewTodo();
        setTodos([...todos, {id: result.data.id, task: result.data.task, completed: result.data.completed, isEditing: result.data.isEditing}])
    }

    const deleteOneTodo = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const editText =  (id, todo) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    }

    const editTodo = async (editedText, id) => {

        try{
            const response = await axios.put(`https://66c57948134eb8f434946b95.mockapi.io/api/v1/todo/${id}`, {task: editedText});
            if (response) {
                setTodos(
                    todos.map((todo) =>
                        todo.id === id ? { ...todo, task: response.data.task, isEditing: !todo.isEditing } : todo
                    )
                );
            }
        }
        catch(err){}

    };

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }


    return (
        <div className="todo-wrapper">
            <h1>What need's to be done?</h1>
            <TodoForm addTodo={addTodo}/>

            {todos.map((todo) =>
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTodo} task={todo}/>
                ) : (
                    <Todo
                        key={todo.id}
                        task={todo}
                        deleteOneTodo={deleteOneTodo}
                        editText={editText}
                        toggleComplete={toggleComplete}
                    />
                )
            )}
        </div>
    );
}
