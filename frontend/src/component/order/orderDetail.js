/* for every order model we have to make active step in it will help in changing the steps state*/
import { Typography } from "@material-ui/core";
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { orderDetailAction } from "../../store/action/orderAction";
import OrderStatus from "./orderStatus";
import "./orderdetail.css";
import Loader from "../loader/loader";
import CartItem from '../shipping/ConfirmOrderCart'
import { toast } from "react-toastify";
const OrderDetail = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const { loading, error, order} = useSelector((state) => state.orderDetail);
  const address = order
    ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`
    : "";
  useEffect(() => {
    if (error) {
      toast.error(error);
      return;
    }
    
    dispatch(orderDetailAction(id));
  }, [dispatch, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <OrderStatus activeStep={0} />
          <div className="orderDetailContainer">
            <div className="orderDetailBox">
              <div>
                <div className="orderDetailShipInfo">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailShipInfoBox">
                    <div>
                      <p>Name: </p>
                      <span>{order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone: </p>
                      <span>{order.shippingInfo.phone}</span>
                    </div>
                    <div>
                      <p>Address: </p>
                      <span>{address}</span>
                    </div>
                  </div>
                </div>
                <div className="orderDetailCartItems">
                  <Typography>Order Items: </Typography>
                  <div>
                    {order.orderItems.map((item, idx) => (
                      <CartItem product={item} key={idx} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="orderDetailLine"></div>
              <div className="ordersummary">
                <Typography>Order Summary</Typography>
                <div className="orderDetailSummary">
                  <div>
                    <p>Subtotal</p>
                    <span>{`₹${order.itemsPrice}`}</span>
                  </div>
                  <div>
                    <p>Shipping Charge</p>
                    <span>{`₹${order.shippingPrice}`}</span>
                  </div>
                  <div>
                    <p>GST</p>
                    <span>{`₹${order.taxPrice}`}</span>
                  </div>
                  <div>
                    <p>TOTAL</p>
                    <span>{`₹${order.totalPrice}`}</span>
                  </div>
                </div>
                <button >Amount Paid  &nbsp;₹{order.totalPrice}</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default OrderDetail;
