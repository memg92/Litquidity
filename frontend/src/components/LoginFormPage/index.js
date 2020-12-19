import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors([]);

    return dispatch(sessionActions.loginUser(email, password)).catch((res) => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });
  };

  const logInDemo = (e) => {
    e.preventDefault();
    const emailField = document.querySelector(".email-field");
    const passwordField = document.querySelector(".password-field");
    const form = document.querySelector(".login-form");
    emailField.value = "demo@user.io";
    passwordField.value = "password";

    dispatch(
      sessionActions.loginUser(emailField.value, passwordField.value)
    ).catch((res) => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });

    return history.push("/");
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="email-field"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="password-field"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="submit-button" type="submit">
          Submit
        </button>
        <button onClick={logInDemo} type="button">
          Log In as Demo User!
        </button>
      </form>
    </div>
  );
};

export default LoginFormPage;
