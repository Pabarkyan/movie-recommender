import { CiUser } from "react-icons/ci"
import { useAuth } from "../hooks/useAuth"


const Navbar = () => {
    const { logout } = useAuth()
    
    return (
        <div className="sticky w-full h-30 px-6 py-4 border-b flex justify-between items-center">
            <button onClick={logout} 
                className="text-bg_white font-bold text-sm rounded-xl bg-main_theme_1 p-4 hover:bg-main_theme_3 transition-all cursor-pointer"
            >
              logOut
            </button>
            <h2 className="text-xl text-center text-black font-semibold">
                MOVIERECOMMENDER
            </h2>
            <CiUser />
        </div>
    )
}

export default Navbar