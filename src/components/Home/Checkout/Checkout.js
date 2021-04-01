import React, { useEffect, useState } from "react";
import { getDatabaseCart, removeFromDatabaseCart } from "../../../utilities/DatabaseManager";
import { useHistory } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  console.log(cart.length);
  const history = useHistory();

  const handlePlaceOrder = () => {
    history.push("/shipment");
  };

  const handleRemoveProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    //cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch("http://localhost:5000/productsByKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  return (
    <div>
      {cart.length === 0 ? (
        <h1 className='checkout-error'>Your cart is empty.</h1>
      ) : (
        <div>
          <div className='table-header'>
            <p>Product name</p>
            <p>price</p>
            <p>Action</p>
          </div>
          <div>
            {cart.map((product) => (
              <CheckoutItems key={product.key} product={product} handleRemoveProduct={handleRemoveProduct} />
            ))}
          </div>
          <button className='secondary-btn checkout-btn' onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

const CheckoutItems = (props) => {
  const { key, name, price } = props.product;
  return (
    <div className='table-body'>
      <p>{name}</p>
      <p>{price}</p>
      <button className='delete-btn' onClick={() => props.handleRemoveProduct(key)}>
        Remove Product
      </button>
    </div>
  );
};

export default Checkout;
