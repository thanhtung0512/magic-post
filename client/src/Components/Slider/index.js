import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./Slider.module.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", marginLeft:'30px', background:'green', opacity:'1'}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{...style, display: "block", marginRight:'30px', color:'green', background:'green', opacity:'1' }}

      onClick={onClick}
    />
    
  );
}

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      // autoplay: true,
      // speed: 2000,
      // autoplaySpeed: 2000,
      // cssEase: "ease",
    };
    return (
      <div className={style.container}>
        <Slider {...settings}>
          <div className={style.blog}>
            <a className={style.title}>
              HÀNH TRÌNH TRAO YÊU THƯƠNG SỐ 57 - COD SÌNH QUỐC TIN - KHO SƠN NAM
              - TUYÊN QUANG
            </a>
            <p className={style.blogdate}>2023-12-06 18:09:39</p>
            <div className={style.blogscript}>
              GHTK CARE - HÀNH TRÌNH TRAO YÊU THƯƠNG SỐ 57 - COD SÌNH QUỐC TIN -
              KHO SƠN NAM - TUYÊN QUANG 💌 “Em xin cảm ơn tất cả
            </div>
          </div>
          <div className={style.blog}>
            <a className={style.title}>
              GHTK cùng Hội LHPN Việt Nam tổ chức chương trình tập huấn Phụ nữ
              khởi nghiệp.
            </a>
            <p className={style.blogdate}>2023-12-05 18:55:50</p>
            <div className={style.blogscript}>
              Ngày 1/12 và 5/12 vừa qua, GHTK cùng Hội LHPN Việt Nam đã đồng tổ
              chức 2 buổi tập huấn tại tỉnh Vĩnh Phúc và thành phố H
            </div>
          </div>
          <div className={style.blog}>
            <a className={style.title}>
              HÀNH TRÌNH TRAO YÊU THƯƠNG SỐ 62: TRAO YÊU THƯƠNG ĐẾN GIA ĐÌNH TÀI
              XẾ PHAN THANH CHUNG - KHO BÙ NHO - BÌNH PHƯỚC
            </a>
            <p className={style.blogdate}>2023-12-01 10:15:42</p>
            <div className={style.blogscript}>
              HÀNH TRÌNH TRAO YÊU THƯƠNG SỐ 62: TRAO YÊU THƯƠNG ĐẾN GIA ĐÌNH TÀI
              XẾ PHAN THANH CHUNG - KHO BÙ NHO - BÌNH PHƯỚC “
            </div>
          </div>
          <div className={style.blog}>
            <a className={style.title}>
              {" "}
              NGUYỄN CAO KIỀU VY - SALE B2C - VP. PICO | CHUYỆN VỀ CÔ GÁI CÓ SỞ
              THÍCH “MÓC LEN”
            </a>
            <p className={style.blogdate}>2023-11-30 16:35:08</p>
            <div className={style.blogscript}>
              Cuối tuần sau giờ làm, mình cùng các bạn trong team thường “tự mở”
              những buổi workshop móc len.
            </div>
          </div>
          <div className={style.blog}>
            <a className={style.title}>
              CÔ NÀNG TUY NHỎ NHẮN NHƯNG “CÂN TẤT” CA ĐÊM - TRẦN THỊ PHƯƠNG -
              GIÁM SÁT KHO VẬN - LV LONG XUYÊN (CẦN THƠ)
            </a>
            <p className={style.blogdate}>2023-11-28 17:30:09</p>
            <div className={style.blogscript}>
              Ca đêm là ca chủ chốt, là lúc các hoạt động xuất/nhập được đẩy
              mạnh hơn nên công việc có phần nặng hơn ca ngày. Ấy vậy,
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
