import axios from "axios";

const API_URL = 'https://role-based-task-manager-production.up.railway.app/api/tasks';

export const getTasks = async (token) => {
    const response = await axios.get(
        API_URL,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}

export const createTask = async (title, token) => {
    const response = await axios.post(
        API_URL,
        { title },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}

export const toggleTaskStatus = async (task, token) => {
    const response = await axios.put(
        `${API_URL}/${task._id}`,
        {
            completed: !task.completed
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}

export const deleteTask = async (id, token) => {
    const response = await axios.delete(
        `${API_URL}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}