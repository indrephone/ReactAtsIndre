import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UsersContext from "../../../contexts/UsersContext";
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
   const context = useContext(UsersContext);
   const { loggedInUser, logOutUser } = context || { loggedInUser: null, logOutUser: () => {} };
   const handleLogout = () => {
      logOutUser();
   };

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
              {loggedInUser ? (
               <React.Fragment>
                  <span>Welcome, {loggedInUser.username}</span>
                  <button onClick={handleLogout}>Logout</button>
               </React.Fragment>

              ) : (
               <React.Fragment>
               <button><Link to="/login">Login</Link></button> 
               <button><Link to="/register">Register</Link></button> 
               </React.Fragment>

              )}
              </ButtonContainer>    

        </StyledHeader>
     );
}
 
export default Header;