import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext'
type Props = {
    children: React.ReactNode
    allowedRoles: string[]
}

const ProtectedRoutes = ({ children, allowedRoles }: Props) => {

    const { token, role } = useContext(authContext)
    const isAllowed = role !== null && allowedRoles.includes(role)
    const accessibleRoute = token && isAllowed ? children : <Navigate to="/login" replace={true} />
    return accessibleRoute
}

export default ProtectedRoutes