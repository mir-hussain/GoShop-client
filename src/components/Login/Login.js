import React, { useContext } from "react";
import "./Login.css";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import { initializeFirebase, handleGoogleSignIn } from "./Firebase";

initializeFirebase();

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (res, redirect) => {
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };
  return (
    <section className='login-section'>
      <div className='login-card'>
        <h1 className='login-tile'>Login</h1>
        <button className='primary-btn' onClick={googleSignIn}>
          Login With Google
        </button>
      </div>
    </section>
  );
};

export default Login;
