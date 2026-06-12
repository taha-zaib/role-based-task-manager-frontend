import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        adminCode: ''
    })

    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const response = await registerUser(formData)
            setMessage("Registration received, awaiting admin approval.")

            console.log(response)
            console.log('Registration received, awaiting admin approval.')

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Something went wrong!"
            )
            console.log(error.response.data)
        }

    }

    const handleChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <h2>Create Account</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <input 
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="adminCode"
                        placeholder="Enter admin code"
                        value={formData.adminCode}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">
                    Register
                </button>
                
            </form>
            {message && <p>{message}</p>}

            <p>Want to register as admin?</p>
            <button
                onClick={() => navigate('/admin/register')}
            >
                Admin Registration
            </button>

            <p>Already have an account?</p>
            <button 
                onClick={() => navigate('/login')}
            >
                Login
            </button>
        </div>
    )
}

export default Register;