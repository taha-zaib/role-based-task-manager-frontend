import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
    const { user } = useContext(AuthContext)

    return user?.role !== 'admin' ? <Navigate to='/dashboard' /> : <Outlet />
}

export default AdminRoute;