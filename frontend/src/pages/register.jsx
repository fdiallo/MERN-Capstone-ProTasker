import { useState, useEffect } from "react";


function Register({ setToken, setUser }) {
  

  async function getData(body) {
    //const data = await fetch("http://localhost:3000/api/users/register", {
    const data = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await data.json();
    console.log(response);
    setToken(response.token);
    setUser(response.user)
    return response;
  }


  useEffect(() => {
    // getData();
  }, []);


  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    const body = {
      username: e.target[0].value.trim(),
      email: e.target[1].value.trim(),
      password: e.target[2].value.trim(),
    };
    console.log(body)
    getData(body);
  }
  
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input name="username"></input>
        <label htmlFor="email">Email: </label>
        <input name="email"></input>
        <label htmlFor="password">Password: </label>
        <input name="password"></input>
        <input type="submit" value="Register" />
      </form>
    </>
  );
}

export default Register;