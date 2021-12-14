import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearerror, getproductdetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { addtocart } from "../../actions/cartaction";

const Productdetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productdetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerror);
    }
    dispatch(getproductdetails(id));
  }, [dispatch, id, loading, error, alert]);

  const [quantity, setquantity] = useState(1);
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

      <button onClick={addtocarthandler}> addtocart</button>
      <div>
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
