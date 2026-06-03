import { useState, useEffect } from "react";
import { Routes, Route} from 'react-router-dom'
import Register from "./pages/register.jsx"
import Login from "./pages/login.jsx"
function App() {
  const [token, setToken] = useState("")
  const [user, setUser] = useState({})

  return (
    <>
      <h1>Library Frontend</h1>
     
      {token ? <h1>Welcome {user.username}!</h1> : <h3>Please log in.</h3>}
      
      <Routes>
        <Route path="/register" element={<Register setToken={setToken} setUser={setUser} />} />
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
       
      </Routes>
    </>
  );
}

export default App;
