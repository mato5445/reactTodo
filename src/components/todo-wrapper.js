import React, {useEffect, useState} from "react";
import {TodoForm} from "./todo-form";
import {Todo} from "./todo";
import {EditTodoForm} from "./edit-todo-form";
import axios from "axios";

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        getTodoList();
    },[]);

    const getTodoList = async () => {
        try{
            const response = await axios.get("https://66c57948134eb8f434946b95.mockapi.io/api/v1/todo");
            if (response) {
                return response.data;
            }
        }
        catch(err){}
    }

    const addTodo = async (todo) => {
        try{
            const response = await axios.post("https://66c57948134eb8f434946b95.mockapi.io/api/v1/todo", {task: todo, completed: false, isEditing: false});
            if (response) {
                return setTodos([...todos, {id: response.data.id, task: response.data.task, completed: response.data.completed, isEditing: response.data.isEditing}])

            }
        }
        catch(err){}
    }

    const deleteTodo = async (id) => {
        try{
            await axios.delete(`https://66c57948134eb8f434946b95.mockapi.io/api/v1/todo/${id}`);

                setTodos(todos.filter((todo) => todo.id !== id));

        }
        catch(err){console.log('Something went wrong')}
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
                        deleteTodo={deleteTodo}
                        editText={editText}
                        toggleComplete={toggleComplete}
                    />
                )
            )}
        </div>
    );
}
