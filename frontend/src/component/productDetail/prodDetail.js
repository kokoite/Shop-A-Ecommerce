import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./prodDetail.css";
import { useSelector, useDispatch } from "react-redux";
import { productDetail, clearError } from "../../store/action/prodDetailAction";
import { clearError as clearReviewError } from "../../store/action/reviewAction";
import Carousel from "react-material-ui-carousel";
import ReviewCard from "../review/reviewCard";
import Loader from "../loader/loader";
import { toast } from "react-toastify";
import { addToCartAction } from "../../store/action/cartAction";
import {createReview} from '../../store/action/reviewAction'
import {CREATE_REVIEW_RESET} from '../../constant/constant'
import { Rating } from "@material-ui/lab";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@material-ui/core";
const url = "https://i.ibb.co/DRST11n/1.webp";

export const ProductDetail = () => {
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const navigate = useNavigate();
  
  const incrementCount = () => {
    if (count >= product.stock) {
      toast.success(`Maximum limit reached ${count}`);
      return;
    }
    setCount((prev) => prev + 1);
  };
  const decrementCount = () => {
    if (count === 1) {
      toast.warn(`Minimum limit is ${0}`);
      return;
    }
    setCount((prev) => prev - 1);
  };
  const addToCartHandler = () => {
    if(count > product.stock)
    {
      toast.error("Product Not available anymore");
      return;
    }
    toast.success("Items added successfully");
    dispatch(addToCartAction(count, product._id));
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(createReview(myForm));
    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if(reviewError)
    {
        toast.error(reviewError);
        dispatch(clearReviewError());
    }
    if(success)
    {
        toast.success("Review Added successfully")
        navigate(`/product/${id}`)
        dispatch({type:CREATE_REVIEW_RESET})
    }
    dispatch(productDetail(id));
    window.scrollTo(0, 0);
  }, [dispatch, error, id,reviewError,success,navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="productDetail">
            <div>
              <Carousel className="prod">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url || url}
                      alt={url}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>

              <div className="detailBlock-2">
              <Rating
                
                value={product.rating}
                size="medium"
                name='rating'
                defaultValue={product.rating}
                readOnly = {true}
              />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailBlock-3">
                <h1>{`₹${product.price}`}</h1>

                <div className="detailBlock-3-1">
                  <div className="detailBlock-3-1-1">
                    <button onClick={decrementCount}>-</button>
                    <input
                      readOnly
                      value={count}
                      type="number"
                      placeholder="Enter the value"
                    />
                    <button onClick={incrementCount}>+</button>
                  </div>
                  <button id="addTocart" onClick={addToCartHandler}>Add to Cart</button>
                </div>
                <p>
                  Status :
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? " Few pieces left" : " Available"}
                  </b>
                </p>
              </div>
              <div className="detailBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewHeading">Reviews</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
                name='unique-rating'
                defaultValue={rating}
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.numOfReviews > 0 ? (
            <div className="review">
              {product.reviews.map((review, idx) => (
                <ReviewCard key={idx} review={review} />
              ))}
            </div>
          ) : (
            <p className="noreviews">No reviews yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
