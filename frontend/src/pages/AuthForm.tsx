import { useState } from 'react'
import myImage from '../assets/popcorn.png'
import { loginUser, registerUser } from '../service/auth'
import { useAuth } from '../hooks/useAuth'

const AuthForm = () => {
    const { login } = useAuth()
    
    const [isRegistering, isSetRegistering] = useState(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmedPassword, setConfirmedPassword] = useState<string>('')

    const registerState = isRegistering ? 'Register' : 'Login'
    const registerMessage = isRegistering ? 'I got an account' : 'Dont have an account?'


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        switch (name) {
            case "email":
                setEmail(value)
                break
            case "password":
                setPassword(value)
                break
            case "confirmedPassword":
                setConfirmedPassword(value)
                break
            default:
                break
        } 
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (isRegistering) {
            const tokens = await registerUser(email, password, confirmedPassword)
            if (tokens) {
                login(tokens)
            } else {
                alert("Error en el registro")
            }
        } else {
            const tokens = await loginUser(email, password)
            if (tokens) {
                login(tokens)
            } else {
                alert("Error en el inicio de sesion")
            }
        }
        toggleAuthMode()
    }

    const toggleAuthMode = () => {
        setEmail('')
        setConfirmedPassword('')
        setPassword('')
    }

    const toggleRegister = () => {
        isSetRegistering(!isRegistering)
        toggleAuthMode()
    }


  return (
    <div className='w-full min-h-screen p-16 bg-bg_slate'>
        <div className='flex items-center justify-center'>
            <div className='bg-bg_white p-16 gap-8 flex flex-col rounded-lg justify-center items-center'>
                <div className='flex justify-center items-center flex-col gap-2'>
                    <h2 className='font-semibold text-4xl  text-letter_bold'>MOVIERECOMMENDER</h2>
                    <img src={myImage} alt="Descripción de la imagen" className='bg-transparent'/>
                    <span className='font-semibold text-xl text-letter_bold'>Making decisions easier</span>
                    <span className='text-letter_bold text-md'>{registerState} and start browsing</span>
                </div>
                <form className='flex flex-col gap-6 px-10 w-full' onSubmit={handleSubmit}>
                    <div className='rounded-lg border relative p-2 w-full'>
                        <span className='p-1 absolute -top-4 left-1 text-main_theme_1 font-semibold text-sm bg-bg_white'>
                            E-mail
                        </span>
                        <input 
                            className='w-full h-full p-2 outline-none'
                            type="email"
                            value={email}
                            name='email'
                            onChange={handleInput}
                        />
                    </div>
                    <div className='rounded-lg border relative p-2'>
                        <span className='p-1 absolute -top-4 left-1 text-main_theme_1 font-semibold text-sm bg-bg_white'>
                            password
                        </span>
                        <input 
                            className='w-full h-full p-2 outline-none'
                            type="password"
                            value={password}
                            name='password'
                            onChange={handleInput}
                        />
                    </div>
                    {isRegistering && (
                        <div className='rounded-lg border relative p-2'>
                            <span className='p-1 absolute -top-4 left-1 text-main_theme_1 font-semibold text-sm bg-bg_white'>
                                Confirm password
                            </span>
                            <input 
                                className='w-full h-full p-2 outline-none'
                                type="password"
                                value={confirmedPassword}
                                name='confirmedPassword'
                                onChange={handleInput}
                            />
                        </div>
                    )}
                    <div className='mt-4 w-full flex flex-col px-6 gap-4 justify-center items-center'>
                        <div className='flex flex-col items-center text-sm'>
                            <span className=' text-letter_bold text-[12px]'>{registerMessage}</span>
                            <span className='text-main_theme_3 font-semibold hover:text-main_theme_3 transition-all cursor-pointer'
                                onClick={toggleRegister}    
                            >
                                {isRegistering ? 'Log in' : 'Register'}
                            </span>
                        </div>
                        <button className='text-bg_white font-bold text-xl bg-main_theme_1 p-4 w-full hover:bg-main_theme_3 transition-all cursor-pointer'
                            type='submit'
                        >
                            {registerState}
                        </button>
                    </div>
                </form> 
            </div>
        </div>
    </div>
  )
}

export default AuthForm