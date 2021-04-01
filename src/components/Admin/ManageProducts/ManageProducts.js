import React, { useEffect, useState } from "react";
import "./ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className='product-list'>
      <div className='table-header'>
        <p>Product name</p>
        <p>price</p>
        <p>Action</p>
      </div>
      <div className='product-table-body'>
        {products.map((product) => (
          <Product key={product.key} product={product} />
        ))}
      </div>
    </div>
  );
};

const Product = ({ product }) => {
  const { name, price } = product;
  return (
    <div className='table-body'>
      <p>{name}</p>
      <p>{price} $ </p>
      <button className='delete-btn'>Delete</button>
    </div>
  );
};

export default ManageProducts;
