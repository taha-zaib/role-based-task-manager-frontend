import { useNavigate } from "react-router-dom"

function Home() {

    const navigate = useNavigate();

    // const navigateToRegister = (e) => {

    //     e.preventDefault();

    //     try {

    //         navigate('/register')

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const navigateToLogin = (e) => {

    //     e.preventDefault();

    //     try {

    //         navigate('/login')

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <div>
            <h1>Task Manager</h1>
            <p>Organize your tasks with role-based access control.</p>
            <button
                onClick={() => navigate('/register')}
            >
                Register
            </button>
            <button
                onClick={() => navigate('/login')}
            >
                Login
            </button>
        </div>
    )
}

export default Home;