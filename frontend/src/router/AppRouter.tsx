import React from 'react'
import { Route, Routes } from 'react-router'
import AuthForm from '../pages/AuthForm'
import ProtectedRoute from '../components/ProtectedRoutes'
import MainPage from '../pages/mainPage'

const AppRouter: React.FC = () => (
  <Routes>
    {/* Rutas Públicas */}
    <Route path='/auth' element={<AuthForm />} />

    {/* Rutas privadas */}
    <Route 
        path='/browser'
        element={
            <ProtectedRoute>
                <MainPage />
            </ProtectedRoute>
        }
    />
  </Routes>
)

export default AppRouter