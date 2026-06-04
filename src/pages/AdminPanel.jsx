import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteUserAsAdmin, getUsers, promoteUserToAdmin } from "../services/adminService";


function AdminPanel() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();
    const { token, user, logout } = useContext(AuthContext)

    // USERS
    const fetchUsers = async () => {
        try {
            setLoading(true)
            const data = await getUsers(token);

            setLoading(false)
            setUsers(data)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const promoteUser = async (id) => {
        try {
            await promoteUserToAdmin(id, token)

            fetchUsers();

        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (id) => {
        try {
            await deleteUserAsAdmin(id, token)

            fetchUsers();
        } catch (error) {
            console.log(error)
        }
    }

    // LOGOUT
    const handleLogout = () => {
        logout();
        navigate('/login')
    }


    // EFFECT
    useEffect(() => {
        fetchUsers();
    }, [])

    if (loading) {
        return <h2>Loading...</h2>
    }

    
    return (
        <div>
            <h1>Admin Panel</h1>

            <h2>
                Role: {user?.role}
            </h2>

            <h2>Admin Controls</h2>

            <h2>Admins ({users.filter(u => u.role === "admin").length})</h2>
            {users
                .filter(user => user.role === 'admin')
                .map((singleUser) => (
                    <div key={singleUser._id}>
                        <h3>{singleUser.name}</h3>
                        <p>{singleUser.email}</p>
                        <p>{singleUser.role}</p>
                    </div>
            ))}

            <h2>Users ({users.filter(u => u.role !== "admin").length})</h2>

            {users
                .filter(user => user.role !== 'admin')
                .map((singleUser) => (
                    <div key={singleUser._id}>

                        <h3>{singleUser.name}</h3>
                        <p>{singleUser.email}</p>
                        <p>{singleUser.role}</p>

                        {singleUser.role !== 'admin' && (
                            <button 
                                onClick={() => promoteUser(singleUser._id)}
                            >
                                Promote to Admin
                            </button>
                        )}

                        {singleUser._id !== user?.id && (
                            <button
                                onClick={() => deleteUser(singleUser._id)}
                            >
                                Delete User
                            </button>
                        )}

                    </div>
                ))}

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default AdminPanel;