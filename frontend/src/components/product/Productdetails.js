import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearerror,
  getproductdetails,
  newreview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { addtocart } from "../../actions/cartaction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import Carousel from "react-material-ui-carousel";
import "./productdetail.css";
import { NEW_REVIEW_RESET } from "../../constants/ProductConstant";
import Reviewcard from "./Reviewcard";

const Productdetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productdetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newreview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerror());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearerror());
    }
    if (success) {
      alert.success("Review submitted");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getproductdetails(id));
  }, [dispatch, id, loading, error, alert, success, reviewError]);

  const [quantity, setquantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    console.log(id, rating, comment);
    console.log(myForm.get("productId"));
    dispatch(newreview(myForm));

    setOpen(false);
  };

  const decquantity = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setquantity(qty);
  };
  const incquantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setquantity(qty);
  };

  const addtocarthandler = () => {
    dispatch(addtocart(id, quantity));
    alert.success("item added to cart");
  };

  return (
    <div className="product-detail">
      <div className="product-detail-box">
        <div className="product-image-slider">
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>

        <div className="product-detail-info">
          <h3>{product.name}</h3>
          <div className="price-rating-review">
            <p>
              <span>₹ {product.price}</span>
              <span>Reviews {product.noofrewiew}</span>
            </p>
          </div>
          <Rating {...options} />
          <div className="inc-dec-quantity">
            <button onClick={decquantity}>
              <i className="bx bx-minus"></i>
            </button>
            <input type="number" readOnly value={quantity} />
            <button onClick={incquantity}>
              <i className="bx bx-plus"></i>
            </button>
          </div>
          <div className="product-desc">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          <div className="product-button">
            <button
              disabled={product.stock < 1 ? true : false}
              onClick={addtocarthandler}
            >
              <i className="bx bxs-cart"></i>
              addtocart
            </button>
            <button onClick={submitReviewToggle}>
              <i className="bx bxs-shopping-bags"></i>submit review
            </button>
          </div>
        </div>
      </div>
      <div className="review-box">
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating
              onChange={(e) => {
                setRating(e.target.value);
              }}
              value={rating}
              size="large"
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

        {product.reviews && product.reviews[0] ? (
          <div className="all-reviews">
            <h3>Kuch Customers ke Vichar</h3>
            <div className="allreviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <Reviewcard key={review._id} review={review} />
                ))}
            </div>
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </div>
    </div>
  );
};

export default Productdetails;
