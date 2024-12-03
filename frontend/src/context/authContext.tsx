import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContextProps, AuthContextProviderProps } from "../types";


export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("access_token"))
    const navigate = useNavigate()

    const login = ({ access_token, refresh_token }: {access_token: string, refresh_token: string }) => {
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        setIsAuthenticated(true)
        navigate('/browser')
    }

    const logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        setIsAuthenticated(false)
        navigate('auth')
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}