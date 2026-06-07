import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteUserAsAdmin, getUsers, promoteUserToAdmin } from "../services/adminService";


function AdminPanel() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();
    const { token, user, logout } = useContext(AuthContext)

    // LOGOUT
    const handleLogout = () => {
        logout();
        navigate('/login')
    }
    
    return (
        <div>
            <h1>Admin Panel</h1>

            <h2>
                Role: {user?.role}
            </h2>

            <h2>Admin Controls</h2>

            <button
                onClick={() => navigate('/admin/users')}
            >Users</button>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default AdminPanel;