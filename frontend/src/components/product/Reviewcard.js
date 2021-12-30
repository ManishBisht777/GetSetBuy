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
      <i class="bx bxs-user-circle"></i>
      <p>{review.name} Ji ne Kaha</p>
      <Rating {...options} />
      <span className="reviewCardComment">
        <i class="bx bxs-quote-alt-left"></i> {review.comment}
        <i class="bx bxs-quote-alt-right"></i>
      </span>
    </div>
  );
};

export default Reviewcard;
