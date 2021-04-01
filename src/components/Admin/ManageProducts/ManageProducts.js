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
    <div className='product-table-container'>
      <div className='product-table-header'>
        <h3>Product name</h3>
        <h3>Price</h3>
        <h3>Action</h3>
      </div>
      <div className='product-table-body'>
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
};

const Product = ({ product }) => {
  const { productName, price } = product;
  return (
    <div className='product-table-row'>
      <h4>{productName}</h4>
      <p>{price}</p>
      <button>Delete</button>
    </div>
  );
};

export default ManageProducts;
