import { AuthProvider } from "./context/authContext"
import AppRouter from "./router/AppRouter"
import { BrowserRouter as Router } from "react-router"


function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRouter />
      </AuthProvider> 
    </Router>
  )
}

export default App
