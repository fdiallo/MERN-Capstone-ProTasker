import Logout from './Logout'
import { Link } from 'react-router-dom'

export default function Navbar({token, logOut}){
    if(token) 
    return(
        <nav>
        <p>Paul's Cool Library</p>
        <Logout logOut={logOut}/>
        </nav>
    )
    else
    return(
        <nav>
        <p>Pro Task Management App</p>
        <Link to="/register">Register</Link><br />
        <Link to="/login">Log In</Link>
        </nav>
    )
}