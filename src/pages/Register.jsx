import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const response = await registerUser(formData)
            setMessage("Registration Successful!")

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Something went wrong!"
            )
            console.log(error.response.data)
        }

    }

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <input 
                        type="text"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                name: e.target.value
                            })
                        }} />
                </div>

                <div>
                    <input 
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={(e) =>{
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }} />
                </div>

                <div>
                    <input 
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                password: e.target.value
                            })
                        }} />
                </div>

                <button type="submit">
                    Register
                </button>
                
            </form>

            {message && <p>{message}</p>}
        </div>
    )
}

export default Register;