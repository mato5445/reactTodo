import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({task, deleteTodo, editText, toggleComplete}) => {

    return (
        <div className="todo">
            <p className={`${task.completed ? "completed" : ""}`} onClick={() => toggleComplete(task.id)}>{task.task}</p>

            <div className='todo-icons'>
                <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editText(task.id, task.task)} />
                <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(task.id)} />
            </div>
        </div>
    )
}
