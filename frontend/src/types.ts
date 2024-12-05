import { ReactNode } from "react"

export interface AuthContextProps {
    isAuthenticated: boolean
    login: (tokens: { access_token: string, refresh_token: string }) => void
    logout: () => void
}

export interface AuthContextProviderProps {
    children: ReactNode
}

export interface Movies {
    title: string
    rating: number
    rating_count: number
    genres: string
}

export interface SearchState {
    title: string
    number: number
}