import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const registerUser = async (formData) => {
    const response = await axios.post(
        `${API_URL}/auth/register`,
        formData
    )


    return response.data;
}

export const loginUser = async (formData) => {
    const response = await axios.post(
        `${API_URL}/auth/login`,
        formData
    )

    return response.data;
}

export const registerAdmin = async (formData) => {
    const response = await axios.post(
        `${API_URL}/auth/admin/register`,
        formData
    )

    return response.data
}