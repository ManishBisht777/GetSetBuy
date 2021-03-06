import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Imgslider() {
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
    <Carousel {...settings}>
      <Wrap>
        <img src="./slider-badging.jpg" alt="" />
      </Wrap>
      <Wrap>
        <img src="./slider-badag.jpg" alt="" />
      </Wrap>
      <Wrap>
        <img src="./slider-scale.jpg" alt="" />
      </Wrap>
      <Wrap>
        <img src="./slider-scales.jpg" alt="" />
      </Wrap>
    </Carousel>
  );
}

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

  @media (max-width: 900px) {
    .slick-prev,
    .slick-next {
      top: 70%;
      width: 10px;
      height: 10px;
      transform: translate(0, -70%);
    }
  }
`;
const Wrap = styled.div`
  cursor: pointer;
  img {
    border: 1px solid transparent;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 /69%) 0px 26px 30px -10px,
      rgb(0 0 0 /73%) 0px 16px 10px -10px;
    transition-duration: 300ms;
    &:hover {
      border: 1px solid rgb(116 116 116 / 80%);
    }
  }
`;

export default Imgslider;
