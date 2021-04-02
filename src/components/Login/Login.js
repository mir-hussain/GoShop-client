import React, { useContext } from "react";
import "./Login.css";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
// import { initializeFirebase, handleGoogleSignIn } from "./Firebase";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

// initializeFirebase();
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [user, setUser] = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  // const handleResponse = (res, redirect) => {
  //   setLoggedInUser(res);
  //   if (redirect) {
  //     history.replace(from);
  //   }
  // };

  const googleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        const currentUser = { ...user };
        currentUser.name = user.displayName;
        currentUser.loggedIn = true;
        currentUser.email = user.email;
        setUser(currentUser);
        history.replace(from);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
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
