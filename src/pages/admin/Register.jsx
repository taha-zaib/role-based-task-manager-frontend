import { useState } from "react";
import { registerAdmin } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        adminName: '',
        adminEmail: '',
        adminUsername: '',
        password: ''
    })

    const [message, setMessage] = useState('')
    const [adminCode, setAdminCode] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const response = await registerAdmin(formData)
            setMessage("Admin Registration Successful!")
            setAdminCode(response.admin.adminCode)
            
            navigate('/login')
            console.log('Admin Registration Successful !')

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Something went wrong!"
            )
            console.log(error.response?.data)
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
            <h2>Admin Register</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <input 
                        type="text"
                        name="adminName"
                        placeholder="Enter Admin name"
                        value={formData.adminName}
                        onChange={handleChange}
                     />
                </div>

                <div>
                    <input 
                        type="email"
                        name="adminEmail"
                        placeholder="Enter Admin Email"
                        value={formData.adminEmail}
                        onChange={handleChange}
                     />
                </div>

                <div>
                    <input 
                        type="text"
                        name="adminUsername"
                        placeholder="Enter Username"
                        value={formData.adminUsername}
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

                <button type="submit">
                    Register
                </button>
                
            </form>
            {message && <p>{message}</p>}
            
            <p>Already have an admin account?</p>
            <button 
                onClick={() => navigate('/login')}
            >
                Login
            </button>

            <p>Want to register as user?</p>
            <button
                onClick={() => navigate('/register')}
            >
                Register
            </button>
        </div>
    )
}

export default Register;