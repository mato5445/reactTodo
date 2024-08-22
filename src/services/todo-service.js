import axios from "axios";

export const getTodoList = async () => {
    try{
        const response = await axios.get("https://66c57948134eb8f434946b95.mockapi.io/api/v1/todo");
        if (response) {
            return response.data;
        }
    }
    catch(err){}
}

export const addNewTodo = async (todo) => {

    try{
        const response = await axios.post("https://66c57948134eb8f434946b95.mockapi.io/api/v1/todo", {task: todo, completed: false, isEditing: false});
        if (response) {
            return response.data;
        }
    }
    catch(err){console.log('Problem occure During adding todo')
    }
}

export const deleteTodo = async (id) => {
    try{
        const response = await axios.delete(`https://66c57948134eb8f434946b95.mockapi.io/api/v1/todo/${id}`);
        if (response) {
            return response.data;
        }
    }
    catch(err){console.log('Something went wrong')}
}


