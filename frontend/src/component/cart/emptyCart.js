import { Fragment } from "react"
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import './emptyCart.css'
const emptyCart = ()=>{
    return(
        <Fragment>
            <div className="emptyCart">
                <RemoveShoppingCartIcon/>
                <Typography>No more Products in Cart</Typography>
                <Link to="/products" >Get More Products</Link>
            </div>
        </Fragment>
    )
}
export default emptyCart;