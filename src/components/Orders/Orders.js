import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      products: {},
    },
  ]);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
    fetch("https://goshop-server.herokuapp.com/orders?email=" + loggedInUser.email)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [loggedInUser.email]);

  useEffect(() => {
    const products = orders.map((order) => order.products);
    const product = products.map((pd) => Object.keys(pd));
    const productKeys = [].concat.apply([], product);

    fetch("https://goshop-server.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setPreviousOrders(data));
  }, [orders]);

  return (
    <div>
      <div className='table-header'>
        <p>Product name</p>
        <p>price</p>
        <p>Manufacturer</p>
      </div>

      {previousOrders.map((orders) => (
        <OrdersHistory key={orders.key} orders={orders} />
      ))}
    </div>
  );
};

const OrdersHistory = (props) => {
  const { name, price, manufacturer } = props.orders;
  return (
    <div className='table-body'>
      <p>{name}</p>
      <p>{price} $ </p>
      <p>{manufacturer}</p>
    </div>
  );
};

export default Orders;
