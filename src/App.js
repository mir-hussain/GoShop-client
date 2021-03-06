//components
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Admin from "./components/Admin/Admin";
import Orders from "./components/Orders/Orders";
import Checkout from "./components/Home/Checkout/Checkout";
import Shipment from "./components/Home/Shipment/Shipment";

//css
import "./App.css";

//react router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { createContext, useState } from "react";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    email: "",
  });
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <PrivateRoute path='/admin'>
            <Admin />
          </PrivateRoute>
          <PrivateRoute path='/orders'>
            <Orders />
          </PrivateRoute>
          <PrivateRoute path='/checkout'>
            <Checkout />
          </PrivateRoute>
          <PrivateRoute path='/shipment'>
            <Shipment />
          </PrivateRoute>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
