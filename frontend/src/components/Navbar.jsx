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
       <br /> <h2>Pro Task Management App</h2>
        </nav>
    )
}