import React, {useState} from "react";

export const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(value.trim() === "") {
            return;
        }
        addTodo(value);
        setValue("")
    }
    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input type="text" value={value} className="todo-input" onChange={(e) => setValue(e.target.value)} placeholder="Create new todo" />
            <button type="submit" className="todo-btn">Add task</button>
        </form>
    )
}
