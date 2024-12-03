import React from "react"
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router"


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute