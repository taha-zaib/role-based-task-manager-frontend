import { useNavigate } from "react-router-dom"

function Home() {

    const navigate = useNavigate();

    const navigateToRegister = (e) => {

        e.preventDefault();

        try {

            navigate('/register')

        } catch (error) {
            console.log(error);
        }
    }

    const navigateToLogin = (e) => {

        e.preventDefault();

        try {

            navigate('/login')

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <button onClick={navigateToRegister} style={{ margin: '20px', padding: '10px 20px', fontSize: '30px' }}>Register</button>
            <button onClick={navigateToLogin} style={{ margin: '20px', padding: '10px 20px', fontSize: '30px' }}>Login</button>
        </div>
    )
}

export default Home;