import React from "react";
import "./cartItemCard.css";
import { Link } from "react-router-dom";
// const url = "https://i.ibb.co/DRST11n/1.webp"; 
const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove From Cart</p>
      </div>
    </div>
  );
};

export default CartItemCard;