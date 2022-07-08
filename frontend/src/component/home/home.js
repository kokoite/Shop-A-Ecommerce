import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./home.css";
import Product from "../product/prodCard";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loader/loader";
import { clearError, getProduct } from "../../store/action/productAction";
import { toast} from "react-toastify";
const Home = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);
  useEffect(() => {
    if(error)
    {
        return toast.error(`${error}`);
    }
    dispatch(clearError());
    dispatch(getProduct());
  }, [dispatch, error]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {/* <MetaData title = "Home page"/> */}

          <div className="banner">
            <h1>Welcome to Ecommerce</h1>
            <p>Find amazing product below</p>
            <a href="#container">
              <button>Scroll {CgMouse}</button>
            </a>
          </div>
          <h2 className="homeheading">Featured Product</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <Product key={product._id} product={product} />)}
          </div>
          
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;
