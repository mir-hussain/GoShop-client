import React, { useContext, useState } from "react";
import "./Login.css";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import { initializeFirebase, handleGoogleSignIn } from "./Firebase";

initializeFirebase();

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  console.log(loggedInUser);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (res, redirect) => {
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  // const handleGoogleSignIn = () => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       /** @type {firebase.auth.OAuthCredential} */
  //       handleResponse(loggedInUser, true);
  //       const currentUser = { ...loggedInUser };
  //       currentUser.name = loggedInUser.displayName;
  //       currentUser.loggedIn = true;
  //       setLoggedInUser(currentUser);
  //     })
  //     .catch((error) => {
  //       const errorMessage = error.message;
  //       console.log("Error", errorMessage);
  //     });
  // };
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
