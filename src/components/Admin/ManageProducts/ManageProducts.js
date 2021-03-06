import React, { useEffect, useState } from "react";

//css
import "./ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  //to delete a selected product

  const deleteProduct = (id) => {
    fetch("https://goshop-server.herokuapp.com/deleteProduct/" + id, {
      method: "DELETE",
    }).then((res) => console.log(res));
  };

  //to load data from database

  useEffect(() => {
    fetch("https://goshop-server.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  });

  return (
    <div className='product-list'>
      <div className='table-header'>
        <p>Product name</p>
        <p>price</p>
        <p>Action</p>
      </div>
      <div className='product-table-body'>
        {products.map((product) => (
          <Product deleteProduct={deleteProduct} key={product.key} product={product} />
        ))}
      </div>
    </div>
  );
};

//Product information (row)

const Product = (props) => {
  const { name, price, _id } = props.product;
  return (
    <div className='table-body'>
      <p>{name}</p>
      <p>{price} $ </p>
      <button className='delete-btn' onClick={() => props.deleteProduct(_id)}>
        Delete
      </button>
    </div>
  );
};

export default ManageProducts;
