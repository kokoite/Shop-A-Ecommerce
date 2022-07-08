import {Fragment} from 'react'
import './ordersuccess.css'
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
const OrderSuccess = () =>{
    return <Fragment>
        <div className="orderSuccess">
                <CheckCircleIcon/>
                <Typography>Order Placed successfully</Typography>
                <Link to="/orders" >View Order</Link>
            </div>
    </Fragment>
}
export default OrderSuccess;