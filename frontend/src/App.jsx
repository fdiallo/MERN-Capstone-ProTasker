import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    console.log(e)
    const body = {
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    }
    getData(body)
  }

  async function getData(body) {
    
    const data = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await data.json();
    console.log(response);
    setToken(response.token)
    return response;
  }

  return (
    <>
      <h1>Library Frontend</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username: </label><input name="username"></input>
      <label htmlFor="email">Email: </label><input name="email"></input>
      <label htmlFor="password">Password: </label><input name="password"></input>
      <input type="submit" value="Register" />
      </form>
    </>
  );
}

export default App;



// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
      
//     </>
//   )
// }

// export default App
