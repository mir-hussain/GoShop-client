import React, { useContext } from "react";
//css
import "./Header.css";
//router
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import firebase from "firebase/app";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const queryName = query.get("name");
  let hide = { display: "block" };
  if (queryName === "admin-panel") {
    hide = { display: "none" };
  }

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    let currentUser = { ...loggedInUser };
    currentUser = {};
    setLoggedInUser(currentUser);
  };

  return (
    <header style={hide}>
      <nav>
        <ul>
          <li id='logo'>GoShop</li>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/orders'>Orders</Link>
          </li>
          <li>
            <Link to='/admin?name=admin-panel'>Admin</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/checkout'> Checkout </Link>
          </li>
          {loggedInUser.isSignedIn && (
            <li>
              <button id='logout-btn' onClick={signOut}>
                Log out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
