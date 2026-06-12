import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getTasks, createTask, deleteTask, toggleTaskStatus } from "../../services/taskService";


function Dashboard() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();
    const { token, logout } = useContext(AuthContext)


    const addTask = async (e) => {
        e.preventDefault();

        try {
        
            // const token = localStorage.getItem('token')

            const response = await createTask(title, token)

            setTitle('');
            fetchTasks();

        } catch (error) {
            console.log(error)
        }

    }

    const fetchTasks = async () => {
        try {
            
            // const token = localStorage.getItem('token')
            setLoading(true)
            const data = await getTasks(token);

            setLoading(false);
            setTasks(data.tasks);

        } catch (error) {
            setLoading(false);
            console.log(error);
        }

    }

    const toggleTask = async (task) => {
        try {
            
            // const token = localStorage.getItem('token')
            
            await toggleTaskStatus(task, token)

            fetchTasks();

        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteTask = async (taskId) => {
        try {
            
            // const token = localStorage.getItem('token')

            const response = await deleteTask(taskId, token)

            fetchTasks();

        } catch (error) {
            console.log(error)
        }
    }


    const handleLogout = () => {
        logout();
        navigate('/login')
    }

    useEffect(() => {
        fetchTasks();
    }, [])

    if (loading) {
        return <h2>Loading...</h2>
    }
    

    return (
        <div>
            <h1>Dashboard</h1>

            {/*TASK FORM*/}
            <form onSubmit={addTask}>
                <input 
                    type="text"
                    placeholder="Enter Task"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />

                <button type="submit">
                    Add Task
                </button>
            </form>
            
            {/*TASK LIST*/ }
            {tasks.length === 0 ? (
                <p>No tasks found</p>
            ) : (
                tasks.map((task) => (
                    <div key={task._id}>
                        <h3 style={{
                                textDecoration: task.completed ? 'line-through' : 'none'
                            }}
                        >
                            {task.title}
                        </h3>

                        <button onClick={() => toggleTask(task)}>
                            {task.completed ? 'Completed' : 'Mark Completed'}
                        </button>

                        <button onClick={() => handleDeleteTask(task._id)} >
                            Delete
                        </button>
                    </div>
                ))
            )}

            {/*LOGOUT*/}
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Dashboard;