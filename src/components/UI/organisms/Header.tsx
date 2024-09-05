import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

import Logo from "../atoms/Logo";


const StyledHeader = styled.header`
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 80px;
   width: 100%;
   padding: 0 20px;
   position: fixed;
   top: 0;
   left: 0;
   background-color: white;
   z-index: 1000;
   box-sizing: border-box;
`;
const LogoContainer = styled.div`
   display: flex;
   align-items: center;
   gap: 20px;
   font-size: 1.5rem;
`;
const StyledNav = styled.nav`
    flex: 1;
    display: flex;
    justify-content: center;
       ul{
        display: flex;
        gap: 20px;
        list-style: none;
        padding: 0;
        margin: 0;
      }
       a{
        text-decoration: none;
        color: inherit;
      }
       &:hover{
        color: #e96a0f;
       }
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;

  button {
    padding: 8px 16px;
    border: none;
    background-color: #e7b307;
    color: white;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #e96a0f;
    }

    a {
      color: white;
      text-decoration: none;
    }
  }
`;

const Header = () => {
    return ( 
        <StyledHeader>
            <LogoContainer>
               <div><Link to="/"><Logo /></Link></div>
               <span>Farmers Market</span>
            </LogoContainer>

            <StyledNav>
                <ul>
                   <li><NavLink to="/">Home</NavLink></li>
                </ul>
            </StyledNav> 

            <ButtonContainer>
               <button><Link to="/login">Login</Link></button> 
               <button><Link to="/register">Register</Link></button> 
            </ButtonContainer>    

        </StyledHeader>
     );
}
 
export default Header;