import { useAuth } from "../hooks/useAuth"

const MainPage = () => {
  const { logout } = useAuth()

  return (
    <div>
      <button onClick={logout}>
          logOut
      </button>
    </div>
  )
}

export default MainPage