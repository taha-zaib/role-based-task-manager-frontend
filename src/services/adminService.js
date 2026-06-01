import axios from "axios";

const API_URL = 'https://role-based-task-manager-production.up.railway.app/api/admin';

export const getUsers = async (token) => {
    const response = await axios.get(
        `${API_URL}/users`,
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
        `${API_URL}/users/${id}/promote`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}