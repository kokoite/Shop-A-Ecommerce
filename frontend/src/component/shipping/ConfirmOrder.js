import { Fragment } from "react";
import { Typography } from "@material-ui/core";
import "./confirmOrder.css";
import CheckoutSteps from "./CheckoutSteps";
import CartItem from "./ConfirmOrderCart";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const address = `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.pincode}, ${shippingAddress.country}`;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const proceedPayment = () =>{
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  }
  return (
    <Fragment>
      <CheckoutSteps activeStep={1} />
      <div className="confirmContainer">
        <div className="confirmBox">
          <div>
            <div className="confirmShipInfo">
              <Typography>Shipping Info</Typography>
              <div className="confirmShipInfoBox">
                <div>
                  <p>Name: </p>
                  <span>{user.name}</span>
                </div>
                <div>
                  <p>Phone: </p>
                  <span>{shippingAddress.phone}</span>
                </div>
                <div>
                  <p>Address: </p>
                  <span>{address}</span>
                </div>
              </div>
            </div>
            <div className="confirmOrderCartItems">
              <Typography>Your Cart Items: </Typography>
              <div>
                {cartItems.map((item, idx) => (
                  <CartItem product={item} key={idx} />
                ))}
              </div>
            </div>
          </div>
          <div className="confirmLine"></div>
          <div className="ordersummary">
            <Typography>Order Summary</Typography>
            <div className="confirmOrderSummary">
              <div>
                <p>Subtotal</p>
                <span>{`₹${subtotal}`}</span>
              </div>
              <div>
                <p>Shipping Charge</p>
                <span>{`₹${shippingCharges}`}</span>
              </div>
              <div>
                <p>GST</p>
                <span>{`₹${tax}`}</span>
              </div>
              <div>
                <p>TOTAL</p>
                <span>{`₹${totalPrice}`}</span>
              </div>
            </div>
            <button id = "ordersummary-btn" onClick={proceedPayment}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ConfirmOrder;
