import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineYoutube, AiOutlineTikTok, AiOutlineFacebook, AiOutlineInstagram, AiOutlinePinterest } from "react-icons/ai";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f3f4f6;
  color: #e7b307;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  color: #e7b307;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; 
  margin-bottom: 20px;

  span {
    font-size: 2rem;
    color: black;
  }

  span:hover {
    color: #e96a0f; 
  }
`;

const Copyright = styled.span`
  font-size: 1rem;
  color: black;
`;

const Footer = () => {
    return (
        <StyledFooter>
            <NavContainer>
                <StyledLink to="/invest">Invest</StyledLink>
                <StyledLink to="/careers">Careers</StyledLink>
                <StyledLink to="/legal">Legal</StyledLink>
                <StyledLink to="/contact">Contact</StyledLink>
            </NavContainer>
            <SocialContainer>
                <span><AiOutlineYoutube /></span>
                <span><AiOutlineTikTok /></span>
                <span><AiOutlineFacebook /></span>
                <span><AiOutlineInstagram /></span>
                <span><AiOutlinePinterest /></span>
            </SocialContainer>
            <div>
                <Copyright>
                    &copy; 2024 by Indre
                </Copyright>
            </div>
        </StyledFooter>
    );
}

export default Footer;
