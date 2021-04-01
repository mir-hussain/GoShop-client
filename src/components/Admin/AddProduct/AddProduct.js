import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();
  const [imageURL, setImageURL] = useState(null);

  const onSubmit = (data) => {
    const productData = {
      name: data.name,
      key: data.key,
      imageURL: imageURL,
      price: data.price,
      manufacturer: data.manufacturer,
    };
    axios
      .post("http://localhost:5000/addProduct", productData)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    const imageData = new FormData();
    imageData.set("key", "b321aa392073ad18bf89a195efb05d27");
    imageData.append("image", image);
    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        const imageLink = response.data.data.display_url;
        setImageURL(imageLink);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className='add-product-section'>
      <form className='add-product-form' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='form-header'>Add Product here: </h1>
        <div className='product-input-field'>
          <label htmlFor='name'>Add product name</label>
          <input id='name' name='name' placeholder='Enter Product name' ref={register({ required: true })} />
        </div>
        <div className='product-input-field'>
          <label htmlFor='key'>Add product key</label>
          <input id='key' name='key' placeholder='Enter Product name' ref={register({ required: true })} />
        </div>
        <div className='product-input-field'>
          <label htmlFor='manufacturer'>Add manufacturer name</label>
          <input id='manufacturer' name='manufacturer' placeholder='Enter Manufacturer' ref={register({ required: true })} />
        </div>
        <div className='product-input-field'>
          <label htmlFor='price'>Add price</label>
          <input id='price' name='price' placeholder='Enter Price' ref={register({ required: true })} />
        </div>
        <div className='product-input-field'>
          <label htmlFor='image'>Add product image</label>
          <input id='image' name='image' type='file' onChange={handleImageUpload} />
        </div>
        {imageURL === null ? <input type='submit' value='Save' disabled /> : <input type='submit' value='Save' />}
      </form>
    </div>
  );
};

export default AddProduct;
