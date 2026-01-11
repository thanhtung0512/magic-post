import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./AutoSlide.module.css";

export default class AutoPlay extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "ease",
    };
    return (
      <div className={style.container}>
        <Slider {...settings}>
          <div className={style.customer}>
            <img src="https://giaohangtietkiem.vn/wp-content/uploads/2018/05/haravan-02.png" />
          </div>
          <div>
            <img src="https://giaohangtietkiem.vn/wp-content/uploads/2023/07/routine.png" />
          </div>
          <div>
            <img src="https://giaohangtietkiem.vn/wp-content/uploads/2023/07/tiktok.png" />
          </div>
          <div>
            <img src="https://giaohangtietkiem.vn/wp-content/uploads/2023/07/boo.png" />
          </div>
          <div>
            <img src="https://giaohangtietkiem.vn/wp-content/uploads/2018/05/vascara-02.png" />
          </div>
          <div>
            <img src="https://giaohangtietkiem.vn/wp-content/uploads/2023/07/pnj.png" />
          </div>
          <div>
            <img src="https://giaohangtietkiem.vn/wp-content/uploads/2018/05/sapo-02.png" />
          </div>
        </Slider>
      </div>
    );
  }
}
