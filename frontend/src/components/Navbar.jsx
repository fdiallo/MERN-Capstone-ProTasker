import Logout from './Logout'
import { Link } from 'react-router-dom'

export default function Navbar({token, logOut}){
    if(token) 
    return(
        <nav>
        <br /><p>Project Managment</p><br />
        <Logout logOut={logOut}/>
        </nav>
    )
    else
    return(
        <nav>
       <br /> <p>Pro Task Management App</p><br />
        <Link to="/register">Register</Link><br />
        <Link to="/login">Log In</Link>
        </nav>
    )
}