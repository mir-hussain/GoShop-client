import React, { createContext, useEffect, useState } from "react";
//css
import "./Home.css";
//to handle cart
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/DatabaseManager";
//for spinner
import CircularProgress from "@material-ui/core/CircularProgress";
//component
import Product from "./Product/Product";

export const CheckoutContext = createContext();

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://goshop-server.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    fetch("https://goshop-server.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  const handleBuyNow = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className='cards-container'>
      {products.length === 0 && <CircularProgress style={{ color: "#c0da53" }} />}
      {products.map((product) => (
        <Product handleBuyNow={handleBuyNow} key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Home;
