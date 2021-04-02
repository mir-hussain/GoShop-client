import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../../App";
import { getDatabaseCart, processOrder } from "../../../utilities/DatabaseManager";

const Shipment = (data) => {
  const { register, handleSubmit, errors } = useForm();
  const [user, setUser] = useContext(UserContext);
  console.log(user);
  const onSubmit = () => {
    const savedCart = getDatabaseCart();
    const orderDetails = { ...user, products: savedCart, shipment: data, orderTime: new Date() };

    fetch("https://goshop-server.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          alert("your order placed successfully");
        }
      });
  };
  return (
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
      <input name='name' defaultValue={user.name} ref={register({ required: true })} placeholder='Your Name' />
      {errors.name && <span className='error'>Name is required</span>}

      <input name='email' defaultValue={user.email} ref={register({ required: true })} placeholder='Your Email' />
      {errors.email && <span className='error'>Email is required</span>}

      <input name='address' ref={register({ required: true })} placeholder='Your Address' />
      {errors.address && <span className='error'>Address is required</span>}

      <input name='phone' ref={register({ required: true })} placeholder='Your Phone Number' />
      {errors.phone && <span className='error'>Phone Number is required</span>}

      <input type='submit' />
    </form>
  );
};

export default Shipment;
