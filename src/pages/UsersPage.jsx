import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUsers } from "../services/adminService";
import { useNavigate } from "react-router-dom";

function UsersPage() {
    const naviagte = useNavigate();

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

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

    useEffect(() => {
        fetchUsers();
    }, [])

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            <h2>Users</h2>

            {users
                .map((singleUser) => (
                    <div key={singleUser._id}>
                        <button onClick={() => naviagte(`/admin/users/${singleUser._id}`)}>
                            <p>Name: {singleUser.name}</p>
                            <p>Email: {singleUser.email}</p>
                            <p>Role: {singleUser.role}</p>

                            {/* {singleUser.role !== 'admin' && (
                                <button 
                                    onClick={() => promoteUser(singleUser._id)}
                                >
                                    Promote to Admin
                                </button>
                            )} */}

                            {/* {singleUser._id !== user?.id && (
                                <button
                                    onClick={() => deleteUser(singleUser._id)}
                                >
                                    Delete User
                                </button>
                            )} */}
                        </button>
                    </div>
            ))}
        </div>
    )
}

export default UsersPage;