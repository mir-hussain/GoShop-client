import React from "react";
//css
import "./Admin.css";
//react-router-dom
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Home from "../Home/Home";
//components
import Sidebar from "./Sidebar/Sidebar";
import ManageProducts from "./ManageProducts/ManageProducts";
import AddProduct from "./AddProduct/AddProduct";

const Admin = () => {
  let { path } = useRouteMatch();
  return (
    <div className='admin-panel'>
      <Sidebar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path={`${path}/manage-products`}>
          <ManageProducts />
        </Route>
        <Route path={`${path}/add-product`}>
          <AddProduct />
        </Route>
      </Switch>
    </div>
  );
};

export default Admin;
