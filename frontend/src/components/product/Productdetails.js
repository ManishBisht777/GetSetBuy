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
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
  };

  return (
    <div className="product-detail">
      <div className="product-detail-box">
        <div className="product-image-slider">
          <Carousel {...settings}>
            {product.images &&
              product.images.map((item, i) => (
                <Wrap>
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                </Wrap>
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
            {product.reviews &&
              product.reviews.map((review) => (
                <Reviewcard key={review._id} review={review} />
              ))}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </div>
    </div>
  );
};
const Carousel = styled(Slider)`
  margin-top: 20px;
  padding-top: 60px;
  margin-bottom: 20px;
  .slick-list {
    overflow: visible;
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button::before {
    color: white;
  }

  button {
    z-index: 1;
  }

  .slick-prev {
    left: 3% !important;
    z-index: 1;
  }
  .slick-next {
    right: 3% !important;
    z-index: 1;
  }
`;
const Wrap = styled.div`
  cursor: pointer;
  img {
    border: 4px solid transparent;
    width: 300px;
    height: 300px;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 /69%) 0px 26px 30px -10px,
      rgb(0 0 0 /73%) 0px 16px 10px -10px;
    transition-duration: 300ms;
    &:hover {
      border: 4px solid rgba(249, 249, 249, 0.8);
    }
  }
`;

export default Productdetails;
