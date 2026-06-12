import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const getTasks = async (token) => {
    const response = await axios.get(
        `${API_URL}/tasks`,
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
        `${API_URL}/tasks`,
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
        `${API_URL}/tasks/${task._id}`,
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
        `${API_URL}/tasks/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}