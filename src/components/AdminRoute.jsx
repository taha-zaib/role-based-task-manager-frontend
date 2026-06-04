import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const { user } = useContext(AuthContext)

    return user?.role !== 'admin' ? <Navigate to='/dashboard' /> : children
}

export default AdminRoute;