import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function ProtectedRoutes({ children }) {
    
    // const token = localStorage.getItem('token')
    const { token } = useContext(AuthContext)

    return token ? children : <Navigate to="/login" replace />

    // <<below code have a bug of coming back to login page when press back>>
    // if(!token) {
    //     return <Navigate to='/login' replace />
    // }
    
    // return children

}

export default ProtectedRoutes