import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../store/action/productAction";
import Product from "../product/prodCard";
import Loader from "../loader/loader";
import "./products.css";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";
export const Products = () => {
  const dispatch = useDispatch();
  const categories = [
    "Laptop",
    "Mobile Phones",
    "Watches",
    "Footwear",
    "Grocery",
    "Furniture",
    "Clothing",
    "Reset"
  ];
  const {
    products,
    productCount,
    error,
    loading,
    resultPerPage,
    filterResult,
  } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const setCurrentPageNo = (page) => {
    setCurrentPage(page);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const { keyword } = useParams();
  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    if(category === "Reset")
    {
      setCategory("");
    }
    dispatch(getProduct(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, currentPage, price, error, category, rating]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
        <h2 className="prodHeading">Products</h2>
        
        <div className="productContainer">
          <div className="prods">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
          <div className="filterbox">
            <Typography className="head">Price </Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              min={0}
              max={250000}
              color="secondary"
            />
            <Typography className="catHead">Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="categoryField"
                  key={category}
                  onClick={() => {
                    setCategory(category);
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings above</Typography>
              <Slider
                value={rating}
                onChange={(old, newRating) => setRating(newRating)}
                valueLabelDisplay="auto"
                aria-labelledby="continuos-slider"
                min={0}
                max={5}
                color="secondary"
              />
            </fieldset>
          </div>
          {filterResult > resultPerPage ? (
            <div className="pagination">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          ) : (
            <div className="lastPage"></div>
          )}
        </div>
        </Fragment>
      )}
    </Fragment>
  );
};
