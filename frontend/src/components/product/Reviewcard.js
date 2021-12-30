import { Rating } from "@material-ui/lab";
import React from "react";
import "./reviewcard.css";

const Reviewcard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <i className="bx bxs-user-circle"></i>
      <p>{review.name} Ji ne Kaha</p>
      <Rating {...options} />
      <span className="reviewCardComment">
        <i className="bx bxs-quote-alt-left"></i> {review.comment}
        <i className="bx bxs-quote-alt-right"></i>
      </span>
    </div>
  );
};

export default Reviewcard;
