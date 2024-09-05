import { useContext, useState } from "react";
import { v4 as generateID } from "uuid";
import { Link,useNavigate } from "react-router-dom";
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

type FormValues = {
  username: string;
  password: string;
  passwordRepeat: string;
  email: string;
  profilePicture: string;
  dob: string;
};

type ErrorMessages = {
  username: string;
  password: string;
  passwordRepeat: string;
  email: string;
  profilePicture: string;
  dob: string;
};

const Register = () => {
  const { users, addNewUser, logInUser } = useContext(UsersContext) as UsersContextTypes;
  const [inputValues, setInputValues] = useState<FormValues>({
    username: "",
    password: "",
    passwordRepeat: "",
    email: "",
    profilePicture: "",
    dob: "",
  });
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    username: "",
    password: "",
    passwordRepeat: "",
    email: "",
    profilePicture: "",
    dob: "",
  });
  const [registerError, setRegisterError] = useState<string>("");
  const navigate = useNavigate();

  const registerErrorChecking = {
    username: (value: string) => {
      if (!value) return "Username is required";
      if (value.length < 5) return "Username must be longer than 5 characters";
      if (value.length >= 20) return "Username must be shorter than 20 characters";
      return "";
    },
    password: (value: string) => {
      if (!value) return "Password is required";
      if (value.length < 5) return "Password must be longer than 5 characters";
      if (value.length >= 20) return "Password must be shorter than 20 characters";
      return "";
    },
    passwordRepeat: (value: string, password: string) => {
      if (!value) return "Password confirmation is required";
      if (value !== password) return "Passwords do not match";
      return "";
    },
    email: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return "Email is required";
      if (!emailRegex.test(value)) return "Invalid email format";
      return "";
    },
    dob: (value: string) => {
      if (!value) return "Date of birth is required";
      return "";
    },
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };


  const blurHandle = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Use `name` as a key for the known fields
    if (name === "passwordRepeat") {
      setErrorMessages({
        ...errorMessages,
        passwordRepeat: registerErrorChecking.passwordRepeat(value, inputValues.password),
      });
    } else if (name === "username" || name === "password") {
      setErrorMessages({
        ...errorMessages,
        [name]: registerErrorChecking[name as "username" | "password"](value),
      });
    }
  };
   

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const usernameError = registerErrorChecking.username(inputValues.username);
    const passwordError = registerErrorChecking.password(inputValues.password);
    const passwordRepeatError = registerErrorChecking.passwordRepeat(
      inputValues.passwordRepeat,
      inputValues.password
    );
    const emailError = registerErrorChecking.email(inputValues.email);
    const dobError = registerErrorChecking.dob(inputValues.dob);

    if (usernameError || passwordError || passwordRepeatError || emailError || dobError) {
      setErrorMessages({
        username: usernameError,
        password: passwordError,
        passwordRepeat: passwordRepeatError,
        email: emailError,
        profilePicture: "",
        dob: dobError,
      });
      return;
    }

    // Check if user already exists by username or email
    if (users.find(user => user.username === inputValues.username)) {
      setRegisterError('User with this username already exists');
      return;
    } else if (users.find(user => user.email === inputValues.email)) {
      setRegisterError('User with this email already exists');
      return;
    }

    // Create new user object
    const { passwordRepeat, ...newUserData } = inputValues;


    const newUser = {
      ...newUserData,
      id: generateID(), // Add the unique ID
      passwordVisible: inputValues.password, // Temporarily store plain password
      password: bcrypt.hashSync(inputValues.password, 10), // Hashed password
      profilePicture: inputValues.profilePicture || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg', // Default profile picture
    };

    // Add the new user and log them in
    addNewUser(newUser);
    logInUser(newUser);
    navigate("/");
  };

  return (
    <FormContainer>
      <Heading text="Register" />
      {registerError && <p className="error">{registerError}</p>}
      <StyledForm onSubmit={formSubmit}>
        <InputField
          text="Username:"
          type="text"
          name="username"
          id="username"
          placeholderText="Enter your username..."
          value={inputValues.username}
          onChangeF={handleInputChange}
          onBlur={blurHandle}
        />
        {errorMessages.username && <ErrorMessage>{errorMessages.username}</ErrorMessage>}

        <InputField
          text="Password:"
          type="password"
          name="password"
          id="password"
          placeholderText="Enter your password..."
          value={inputValues.password}
          onChangeF={handleInputChange}
          onBlur={blurHandle}
        />
        {errorMessages.password && <ErrorMessage>{errorMessages.password}</ErrorMessage>}

        <InputField
          text="Repeat Password:"
          type="password"
          name="passwordRepeat"
          id="passwordRepeat"
          placeholderText="Repeat your password..."
          value={inputValues.passwordRepeat}
          onChangeF={handleInputChange}
          onBlur={blurHandle}
        />
        {errorMessages.passwordRepeat && <ErrorMessage>{errorMessages.passwordRepeat}</ErrorMessage>}

        <InputField
          text="Email:"
          type="email"
          name="email"
          id="email"
          placeholderText="Enter your email..."
          value={inputValues.email}
          onChangeF={handleInputChange}
          onBlur={blurHandle}
        />
        {errorMessages.email && <ErrorMessage >{errorMessages.email}</ErrorMessage>}

        <InputField
          text="Profile Picture URL:"
          type="text"
          name="profilePicture"
          id="profilePicture"
          placeholderText="Enter profile picture URL (optional)..."
          value={inputValues.profilePicture}
          onChangeF={handleInputChange}
        />

        <InputField
          text="Date of Birth:"
          type="date"
          name="dob"
          id="dob"
          placeholderText="Enter your date of birth..."
          value={inputValues.dob}
          onChangeF={handleInputChange}
          onBlur={blurHandle}
        />


        {errorMessages.dob && <ErrorMessage >{errorMessages.dob}</ErrorMessage>}

        <Input type="submit" value="Register" />
      </StyledForm>
      <p>
        Go <Link to="/login">Login</Link>
      </p>
    </FormContainer>
  );
};

export default Register;
