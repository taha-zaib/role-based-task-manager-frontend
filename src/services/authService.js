import axios from "axios";

const API_URL = 'https://role-based-task-manager-production.up.railway.app/api/auth'

export const registerUser = async (formData) => {
    const response = await axios.post(
        `${API_URL}/register`,
        formData
    )

    return response.data;
}

export const loginUser = async (formData) => {
    const response = await axios.post(
        `${API_URL}/login`,
        formData
    )

    return response.data;
}