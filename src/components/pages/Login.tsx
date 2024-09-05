import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import bcrypt from 'bcryptjs';
import styled from "styled-components";

import UsersContext, { UsersContextTypes } from "../../contexts/UsersContext";
import Heading from "../UI/atoms/Heading";
import InputField from "../UI/molecules/InputField";
import Input from "../UI/atoms/Input";

const FormContainer = styled.div`
  margin-top: 120px; /* Ensures the form is pushed below the fixed MainOutlet */
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  background-color: #f9f9f9;
  padding: 30px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center; /* Center content inside the form */
`;

// Styled form elements
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center; /* Center input fields */
`;

const SubmitButton = styled(Input)`
  padding: 12px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const Login = () => {
  const navigate = useNavigate();
  const { users, logInUser } = useContext(UsersContext) as UsersContextTypes;
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const foundUser = users.find(
      (user) =>
        user.email === inputValues.email
    );

    if (foundUser && bcrypt.compareSync(inputValues.password, foundUser.password)) {
      logInUser(foundUser);
      navigate("/");
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <FormContainer>
      <Heading text="Login" size={1} />
      <StyledForm onSubmit={handleFormSubmit}>
        <InputField
          text="Email:"
          type="email"
          name="email"
          id="email"
          placeholderText="Enter your email..."
          value={inputValues.email}
          onChangeF={handleInputChange}
        />
        <InputField
          text="Password:"
          type="password"
          name="password"
          id="password"
          placeholderText="Enter your password..."
          value={inputValues.password}
          onChangeF={handleInputChange}
        />

        <SubmitButton type="submit" value="Login" name="login" id="login" />
        {errorMessage && <ErrorMessage style={{ color: "red" }}>{errorMessage}</ErrorMessage>}
      </StyledForm>
      <p>
        Go <Link to="/register">Register</Link>
      </p>
    </FormContainer>
  );
};

export default Login;
