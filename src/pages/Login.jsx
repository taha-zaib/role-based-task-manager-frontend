import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/authService';


function Login() {
    const { login } = useContext(AuthContext)
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    
    const [message, setMessage] = useState('')
    
    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
        
            const data = await loginUser(formData);

            // storing the token in local storage of the browser
            // localStorage.setItem(
            //     'token',
            //     response.data.token
            // );
            login(
                data.token,
                data.user
            )

            setMessage(`Login Successful as ${data.user.role}`)

            //navigate
            if (data.user.role === 'admin') {
                navigate('/admin')
            } else {
                navigate('/dashboard')
            }

        } catch (error) {
            setMessage(
                error.data?.message || 'Something went wrong!'
            )
        }
    }

    return (
        <div>

            <h2>Welcome!</h2>
            
            <form onSubmit={handleSubmit}>

                <div>
                    <input 
                        type="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }/>
                </div>

                <div>
                    <input 
                        type="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value
                            })
                        }/>
                </div>

                <button type="submit">
                    Submit
                </button>

            </form>
            {message && <p>{message}</p>}

            <p>Don't have an account?</p>
            <button
                onClick={() => navigate('/register')}
            >
                Register
            </button>


        </div>
    )    
}


export default Login;