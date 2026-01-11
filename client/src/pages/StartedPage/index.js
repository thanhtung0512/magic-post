import styled from "@emotion/styled";
import stlye from "./StartedPage.module.css";
import { Header, Footer,SimpleSlider, AutoSlide } from "../../Components";
import { Link } from "react-router-dom";
import Login from "../Login";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const StartedPage = () => {

  return (
    <div className={stlye.container}>
      <div className={stlye.header}>
        <div className={stlye.company}>
          <img
            src="assests/images/Screenshot_2023-11-15_143213-removebg-preview.png"
            width="80px"
            height="80px"
          />
          <span>Magic Post</span>
        </div>
        <div className={stlye.func}>Home</div>
        <div className={stlye.login}>
          <Link to="/login">Login</Link>
        </div>
        <div className={stlye.func}>
          <Link to="/register">Register</Link>
        </div>
        <div></div>
      </div>
      <div className={stlye.contentStart}>
        <div className={stlye.content1}>
          <img
            width="485px"
            height="629px"
            src="	https://giaohangtietkiem.vn/wp-content/plugins/ghtk-post-offices/assets/img/list-post-offices.jpg"
          />
          <div className={stlye.title1}>
            <div className={stlye.num}>1000++</div>
            <div className={stlye.rig}>
              <p>Điểm giao hàng...</p>
              <p>...trên toàn quốc!!!</p>
            </div>
          </div>
        </div>
        <div className={stlye.content2}>
          <div className={stlye.title}> Phương thức hoạt động</div>
          <div className={stlye.method}>
            <div className={stlye.methodContent}>
              <div className={stlye.methodfunc}>
                <img
                  height="88px"
                  width="88ppx"
                  src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/bkg-active-1.png"
                />
                <strong className={stlye.methodTitle}>
                  Tiếp nhận đơn hàng
                </strong>
                <div className={stlye.methodscript}>
                  Shop đăng nhập và đăng đơn hàng cho trung tâm điều vận
                  MagicPost qua hệ thống quản lý riêng.
                </div>
              </div>
              <div className={stlye.methodfunc}>
                <img
                  height="88px"
                  width="88ppx"
                  src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/bkg-active-2.png"
                />
                <strong className={stlye.methodTitle}>Lấy hàng</strong>
                <div className={stlye.methodscript}>
                  Nhân viên MagicPost qua địa chỉ shop để lấy hàng tận nơi
                </div>
              </div>
              <div className={stlye.methodfunc}>
                <img
                  height="88px"
                  width="88ppx"
                  src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/bkg-active-3.png"
                />
                <strong className={stlye.methodTitle}>Giao hàng</strong>
                <div className={stlye.methodscript}>
                  MagicPost giao hàng cho khách hàng và thu hộ tiền trực tiếp
                  (Cash on Delivery)
                </div>
              </div>
              <div className={stlye.methodfunc}>
                <img
                  height="88px"
                  width="88ppx"
                  src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/bkg-active-4.png"
                />
                <strong className={stlye.methodTitle}>Đối soát</strong>
                <div className={stlye.methodscript}>
                  Magic đối soát trả tiền cho shop (3 lần/tuần) qua tài khoản
                  ngân hàng. Đồng thời gửi biên bản đối soát định kì vào email.
                </div>
              </div>
              <div className={stlye.methodfunc}>
                <img
                  height="88px"
                  width="88ppx"
                  src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/bkg-active-5.png"
                />
                <strong className={stlye.methodTitle}>Kết thúc</strong>
                <div className={stlye.methodscript}>Giao dịch hoàn tất</div>
              </div>
            </div>
          </div>
        </div>
        <div className={stlye.content3}>
          <div className={stlye.title}>Khách hàng thân thiện</div>
          <div className={stlye.customerWrap}>
            <AutoSlide/>
          </div>
        </div>
        <div className={stlye.content4}>
          <div className={stlye.title}>BLOG</div>
          <div className={stlye.blogWrap}>
            <SimpleSlider/>
          </div>
        </div>
      </div>
    
      <div className={stlye.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default StartedPage;
