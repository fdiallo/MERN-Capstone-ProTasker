import { useState, useEffect } from "react";

function App() {
 
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
