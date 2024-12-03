import api from "./api"

export const testingConnection = async () => {
    try {
        const response = await api.get('/user/connection')
        const data = response.data
        return data
    } catch (error) {
        console.error("Error al conectar con el backend", error)
        return null
    }
}

export const loginUser = async (email:string, password: string): Promise<{ access_token: string, refresh_token: string} | null> => {
    const formData = new FormData()
    formData.append('username', email)
    formData.append('password', password)
    
    try {
        const response = await api.post('/user/token', formData, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        })
        const { access_token, refresh_token } = response.data
        return { access_token, refresh_token }
    } catch (error) {
        console.error("Error en el inicio de sesión", error)
        return null
    }
}


export const registerUser = async (email: string, password: string, confirmedPassword: string): Promise<{ access_token: string, refresh_token: string } | null> => {
    try {
        const response = await api.post('/user/register', { email, password, confirmed_password: confirmedPassword })
        const { access_token, refresh_token } = response.data
        return { access_token, refresh_token }
    } catch (error) {
        console.error("Error en el registro", error)
        return null
    }
}