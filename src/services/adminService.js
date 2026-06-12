import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const getUsers = async (token) => {
    const response = await axios.get(
        `${API_URL}/admin/users`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}

export const getUserById = async (id, token) => {
    const response = await axios.get(
        `${API_URL}/admin/users/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}

export const getTasksByUserId = async (id, token) => {
    const response = await axios.get(
        `${API_URL}/admin/users/${id}/tasks`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}

export const promoteUserToAdmin = async (id, token) => {
    const response = await axios.patch(
        `${API_URL}/admin/users/${id}/promote`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}

export const deleteUserAsAdmin = async (id, token) => {
    const response = await axios.delete(
        `${API_URL}/admin/users/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}