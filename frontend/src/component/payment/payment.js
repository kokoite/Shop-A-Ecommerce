import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from '../shipping/CheckoutSteps';
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { emptyCartAction } from "../../store/action/cartAction";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {clearError, createOrder}  from  '../../store/action/orderAction' 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Payment = () => {
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const { shippingAddress, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const {error} = useSelector((state) => state.createOrder);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  useEffect(()=>{
    if(error)
    {
        toast.error(error);
        dispatch(clearError());
    }
  },[error,dispatch])
  const shippingInfo = shippingAddress
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try{
        const config = {
            headers:{
                'content-type' : 'application/json',
            }
        }
        const {data} = await axios.post("/api/v1/process/payment",paymentData,config)
        const client_secret = data.client_secret;
        if(!stripe || !elements) return;
        const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
              card: elements.getElement(CardNumberElement),
              billing_details: {
                name: user.name,
                email: user.email,
                address: {
                  line1: shippingInfo.address,
                  city: shippingInfo.city,
                  state: shippingInfo.state,
                  postal_code: shippingInfo.pincode,
                  country: shippingInfo.country,
                },
              },
            },
          });
        if(result.error)
        {
            payBtn.current.disabled(false);
            toast.error(result.error.message)
        }
        else{
            if(result.paymentIntent.status === "succeeded")
            {
              order.paymentInfo ={
                id:result.paymentIntent.id,
                status:result.paymentIntent.status
              }
              dispatch(emptyCartAction()).then(() =>dispatch(createOrder(order)).then(()=>{
                navigate("/order/success");
              }))
              
            }
            else
            {
                toast.error("There is some issue while payment Please try after some time")
            }
        }    
    }
    catch(error)
    {
        payBtn.current.disabled = false;
        toast.error(error);
    }
  };
  return (
    <Fragment>
      
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(event) =>{submitHandler(event)}}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
    
  );
};

export default Payment;