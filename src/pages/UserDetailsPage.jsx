import { useContext, useEffect } from "react";
import { getUserById, getUsers, promoteUserToAdmin } from "../services/adminService";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useParams } from "react-router-dom";

function UserDetailsPage() {

    const { token } = useContext(AuthContext)

    const [user, setUser] = useState(null)
    const [task, setTasks] = useState([])
    const [loading, setLoading] = useState(false)

    const { id } = useParams();


    const getUserDetails = async (id) => {
        try {
            setLoading(true)
            const userData = await getUserById(id, token)

            setLoading(false)
            setUser(userData)

        } catch (error) {
            console.log(error)
        }
    }
    const promoteUser = async (id) => {
        try {
            await promoteUserToAdmin(id, token)

            setUser((prevUser) => ({
                ...prevUser,
                role: 'admin'
            }))
            
            // below code refreshes page
            // getUserDetails(id)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserDetails(id);
    }, [id])

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            {/* User Info */}
            <div>
                <h2>User Info</h2>
                <h5>{user?.name}</h5>
                <h5>{user?.email}</h5>
                <h5>{user?.role}</h5>
                <h5>{user?.createdAt}</h5>
            </div>

            {/* Actions */}
            <div>
                {user?.role !== 'admin' && (
                    <button
                        onClick={() => promoteUser(id)}
                    >
                        Promote to Admin
                    </button>
                )}
            </div>
        </div>
    )
}

export default UserDetailsPage;