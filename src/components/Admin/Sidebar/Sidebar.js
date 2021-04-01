import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  let { url } = useRouteMatch();
  return (
    <aside className='sidebar'>
      <ul>
        <li id='logo'>GoShop</li>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to={`${url}/manage-products?name=admin-panel`}>Manage Products</Link>
        </li>
        <li>
          <Link to={`${url}/add-product?name=admin-panel`}>Add product</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
