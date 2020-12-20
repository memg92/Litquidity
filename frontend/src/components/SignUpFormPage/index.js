import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "../LoginFormPage/LoginForm.css";
import "../SignUpFormPage/SignUpFormPage.css";

const SignUpFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorsContainer = document.querySelector(".errors-container");

    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signUpUser(username, email, password)
      ).catch((res) => {
        if (res.data && res.data.errors) {
          if (errorsContainer && errorsContainer.firstChild) {
            errorsContainer.innerHTML = "";
          }
          setErrors(res.data.errors);
        }
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div className="signup-form-container">
      {errors && (
        <ul className="errors-container">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        ></input>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        ></input>
        <button type="submit">Sign Up!</button>
      </form>
    </div>
  );
};

export default SignUpFormPage;
