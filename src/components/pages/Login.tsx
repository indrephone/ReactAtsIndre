import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import bcrypt from 'bcryptjs';

import UsersContext, { UsersContextTypes } from "../../contexts/UsersContext";
import Heading from "../UI/atoms/Heading";
import InputField from "../UI/molecules/InputField";
import Input from "../UI/atoms/Input";

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
    <section>
      <Heading text="Login" size={1} />
      <form onSubmit={handleFormSubmit}>
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

        <Input type="submit" value="Login" name="login" id="login" />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      <p>
        Go <Link to="/register">Register</Link>
      </p>
    </section>
  );
};

export default Login;
