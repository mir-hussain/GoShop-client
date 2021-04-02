import React, { useContext } from "react";
import { UserContext } from "../../App";
//css
import "./Header.css";
//react-router-dom
import { Link, useLocation } from "react-router-dom";
//firebase to handle logout
import firebase from "firebase/app";

const Header = () => {
  const [user, setUser] = useContext(UserContext);
  console.log(user);

  //to select the query in url to render accordingly

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
    let currentUser = { ...user };
    currentUser = {};
    setUser(currentUser);
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
            <Link to='/admin/manage-products?name=admin-panel'>Admin</Link>
          </li>

          {user.email && (
            <li>
              <Link to='/checkout'> Checkout </Link>
            </li>
          )}
          {user.email ? (
            <li>
              <button id='logout-btn' onClick={signOut}>
                Log out
              </button>
            </li>
          ) : (
            <li>
              <Link to='/login'>Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
