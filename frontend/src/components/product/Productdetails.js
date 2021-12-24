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
import { NEW_REVIEW_RESET } from "../../constants/ProductConstant";

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
    <div>
      <div>
        {product.images &&
          product.images.map((item, i) => {
            return <img key={i} src={item.url} alt="1" />;
          })}
      </div>
      <button onClick={decquantity}> -</button>
      <input type="number" readOnly value={quantity} />
      <button onClick={incquantity}>+</button>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <p>{product.noofrewiew} review</p>
      <Rating {...options} />

      <button
        disabled={product.stock < 1 ? true : false}
        onClick={addtocarthandler}
      >
        addtocart
      </button>
      <button onClick={submitReviewToggle}>submit review</button>
      <div>
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
          <div className="reviews">
            {product.reviews &&
              product.reviews.map((review) => (
                <p key={review._id}>{review.comment}</p>
              ))}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </div>
    </div>
  );
};

export default Productdetails;
