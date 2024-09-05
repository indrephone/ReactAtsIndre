import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
    return ( 
        <header>
            <div>
               <div>logo</div>
            </div>

            <nav>
                <ul>
                    <li>Home</li>
                   
                </ul>
            </nav> 

            <div>
               <button><Link to="/login">Login</Link></button> 
               <button><Link to="/register">Register</Link></button> 
            </div>    

        </header>
     );
}
 
export default Header;