import React, { useEffect, useState } from "react";
import { getDatabaseCart, removeFromDatabaseCart } from "../../../utilities/DatabaseManager";
import { useHistory } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  console.log(cart);
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
      <div>
        {cart.map((product) => (
          <CheckoutItems key={product.key} product={product} handleRemoveProduct={handleRemoveProduct} />
        ))}
      </div>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

const CheckoutItems = (props) => {
  const { key, name, price, manufacturer } = props.product;
  return (
    <div>
      <h1>{name}</h1>
      <p>{price}</p>
      <p>{manufacturer}</p>
      <button onClick={() => props.handleRemoveProduct(key)}>Remove Product</button>
    </div>
  );
};

export default Checkout;
