import { useContext, useEffect } from "react";
import { deleteUserAsAdmin, getTasksByUserId, getUserById, getUsers, promoteUserToAdmin } from "../services/adminService";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTasks } from "../services/taskService";

function UserDetailsPage() {

    const { token } = useContext(AuthContext)
    const navigate = useNavigate();

    const [selectedUser, setSelectedUser] = useState(null)
    const [userLoading, setUserLoading] = useState(false)
    const [tasks, setTasks] = useState([])
    const [tasksLoading, setTasksLoading] = useState(false)

    const { id } = useParams();

    // USER INFO
    const getUserDetails = async (id) => {
        try {
            setUserLoading(true)
            const userData = await getUserById(id, token)

            setSelectedUser(userData)

            setUserLoading(false)
        } catch (error) {
            console.log(error)

            setSelectedUser(null);

            setUserLoading(false);
        }
    }

    // Action
    const promoteUser = async (id) => {
        try {
            await promoteUserToAdmin(id, token)

            setSelectedUser((prevUser) => ({
                ...prevUser,
                role: 'admin'
            }))
            
            // below code refreshes page
            // getUserDetails(id)

        } catch (error) {
            console.log(error)
        }
    }
    const deleteUser = async (id) => {
        try {
            await deleteUserAsAdmin(id, token)

            navigate('/admin/users', {replace: true})
        } catch (error) {
            console.log(error)
        }
    }

    // Task
    const fetchTasks = async () => {
        try {
            setTasksLoading(true)
            const data = await getTasksByUserId(id, token)

            setTasks(data.tasks)
            setTasksLoading(false)
        } catch (error) {
            console.log(error)
            setTasksLoading(false)
        }
    }

    useEffect(() => {
        getUserDetails(id);
        fetchTasks();
    }, [id])

    if (userLoading) {
        return <h2>Loading...</h2>
    }

    if (!selectedUser) {
        return <h2>No User Found!</h2>
    }

    return (
        <div>
            {/* User Info */}
            <div>
                <h2>User Info</h2>
                <h5>{selectedUser?.name}</h5>
                <h5>{selectedUser?.email}</h5>
                <h5>{selectedUser?.role}</h5>
                <h5>{selectedUser?.createdAt}</h5>
            </div>

            <hr />


            {/* View Tasks */}
            <div>
                {tasks.length === 0 ? (
                    <p>No tasks found!</p>
                ) : (
                    tasks.map((task) => (
                        <div key={task._id}>
                            <h3>{task.title}</h3>
                        </div>
                    ))
                )}
            </div>

            <hr />


            {/* Actions */}
            <div>
                {selectedUser?.role !== 'admin' && (
                    <div>
                        <div>
                            <button
                                onClick={() => promoteUser(id)}
                            >
                                Promote to Admin
                            </button>
                        </div>
                        <div>
                            <button
                            onClick={() => deleteUser(id)}
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserDetailsPage;