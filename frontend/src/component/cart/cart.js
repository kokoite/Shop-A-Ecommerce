import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import CartItemCard from "./cartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addToCartAction, removeCartAction } from "../../store/action/cartAction";
import EmptyCart from "./emptyCart";
import { toast } from "react-toastify";
export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const deleteCartItems = (id) => {
    dispatch(removeCartAction(id));
  };
  const getTotalPrice = () => {
    let total = 0;
    cartItems.map((item) => (total += item.price * item.quantity));
    return total;
  };
  const decreaseCount = (quantity, id) => {
    if (quantity === 0) {
      toast.success("Quantity cannot be decreased beyond 0");
      return;
    } else {
      dispatch(addToCartAction(quantity - 1, id));
    }
  };
  const increaseCount = (quantity, id, stock) => {
    if (quantity === stock) {
      toast.success("Maximum limit reached");
    } else {
      dispatch(addToCartAction(quantity + 1, id));
    }
  };
  useEffect(() => {}, [dispatch]);
  const checkOutHandler = () => {
    navigate("/shipping");
  };
  const total = getTotalPrice();
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <Fragment>
          <div className="cartContainer">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            <div className="cartItemLine">
              {cartItems.map((item, idx) => (
                <div className="cartItems" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="itemQuantity">
                    <button
                      onClick={() => decreaseCount(item.quantity, item.product)}
                    >
                      -
                    </button>
                    <span > {item.quantity}</span>
                    <button
                      onClick={() =>
                        increaseCount(item.quantity, item.product, item.stock)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="itemSubTotal">
                    <span>{`₹${item.price * item.quantity}`}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="itemTotal">
              <div>
                <h2>Total Price </h2>
                <p>{`₹${total}`}</p>
                <button onClick={checkOutHandler}>Checkout</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
