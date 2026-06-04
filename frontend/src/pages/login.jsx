
import { useState, useEffect } from "react";

function Login({ setLogin }) {
  
  async function getData(body) {
    const data = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("Login Response Data: ", data)
    
    const response = await data.json();
    setLogin(response.token, response.user)
    return response;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      username: e.target[0].value,
      password: e.target[1].value
    };
    getData(body);
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: <input name="username" /><br />
        </label>
        <label htmlFor="password">Password: 
        <input name="password" /><br /><br />
        </label>
        <input type="submit" value="Login" />
      </form>
    </>
  );
}

export default Login;



// import { useState, useEffect } from "react";



// function Login({setToken, setUser}) {
//   async function getData(body) {
//     //const data = await fetch("http://localhost:3000/api/users/login", {
//     const data = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });
//     const response = await data.json();
//     console.log(response);
//     setToken(response.token);
//     setUser(response.user)
//     return response;
//   }
//   useEffect(() => {
//     // getData();
//   }, []);
//   function handleSubmit(e) {
//     e.preventDefault();
//     const body = {
//       username: e.target[0].value,
//       password: e.target[1].value
//     };
//     console.log(body)
//     getData(body);
//   }
//   return (
//     <>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="username">Username: </label>
//         <input name="username"></input>
//         <label htmlFor="password">Password: </label>
//         <input name="password"></input>
//         <input type="submit" value="Login" />
//       </form>
//     </>
//   );
// }

// export default Login;