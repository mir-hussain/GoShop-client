import React from "react";
//css `
import "./Product.css";

const Product = (props) => {
  const { name, price, manufacturer, imageURL } = props.product;
  return (
    <div className='product-information-container'>
      <div className='product-image-container'>
        <img src={imageURL} alt='' />
      </div>
      <div className='product-info'>
        <h2>{name}</h2>
        <p>Seller: {manufacturer}</p>
        <div className='price-container'>
          <div className='price'>{price}</div>
          <div className='currency'>USD</div>
        </div>
      </div>
      <button onClick={() => props.handleBuyNow(props.product)} className='primary-btn'>
        Buy Now
      </button>
    </div>
  );
};

export default Product;
