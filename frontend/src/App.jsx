import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register.jsx";
import Books from "./pages/projects.jsx";
import Login from "./pages/login.jsx";
import Navbar from "./components/Navbar.jsx";


function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    async function checkToken() {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        const userResp = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/users",
          {
            headers: {
              Authorization: "Bearer " + localToken,
            },
          },
        );
        const valid = await userResp.json()
        if(valid._id){
          setToken(localToken);
          setUser(valid)
        }
      }
    }
    try{
      checkToken();
    } catch(error) {
      console.error(error)
    }
  }, []);

  function handleLogOut() {
    localStorage.removeItem("token");
    setUser([]);
    setToken("");
  }
  function handleLogIn(token, user) {
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
  }
  return (
    <>
      <Navbar token={token} logOut={handleLogOut} />
      {token ? (
        <Routes>
          <Route path="*" element={<Projects token={token} user={user} />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/register"
            element={<Register setLogin={handleLogIn} />}
          />
          <Route path="*" element={<Login setLogin={handleLogIn} />} />
        </Routes>
      )}
    </>
  );
}

export default App;




// import { useState, useEffect } from "react";
// import { Routes, Route} from 'react-router-dom'
// import Register from "./pages/register.jsx"
// import Login from "./pages/login.jsx"
// function App() {
//   const [token, setToken] = useState("")
//   const [user, setUser] = useState({})

//   return (
//     <>
//       <h1>Library Frontend</h1>
     
//       {token ? <h1>Welcome {user.username}!</h1> : <h3>Please log in.</h3>}
      
//       <Routes>
//         <Route path="/register" element={<Register setToken={setToken} setUser={setUser} />} />
//         <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
       
//       </Routes>
//     </>
//   );
// }

// export default App;
