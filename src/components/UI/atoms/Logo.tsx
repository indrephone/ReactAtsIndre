import styled from "styled-components";

const StyledLogo = styled.img`
   width: 60px;
   height: 60px;
   cursor: pointer;
`

const Logo = () => {
    return ( 
       <StyledLogo src="/websiteLogo.jpeg" alt="Logo" />
     );
}
 
export default Logo;