import styled from "@emotion/styled";
import stlye from "./StartedPage.module.css";
import { Header, Footer } from "../../Components";
import { Link } from "react-router-dom";
import Login from "../Login";

const StartedPage = () => {
  return (
    <div className={stlye.container}>
      <div className={stlye.header}>
        <div className={stlye.company}>
          <img
            src="assests/images/Screenshot_2023-11-15_143213-removebg-preview.png"
            width="80px"
            height='80px'
          />
          <span>Magic Post</span>
        </div>
        <div className={stlye.func}>
            Trang chu
        </div>
        <div className={stlye.func}>
            Tra cuu
        </div>
        <div className={stlye.login}>
            <Link to='/login' >Đăng Nhập</Link> 
        </div>
        <div>
            
        </div>
      </div>
      <div className={stlye.contentfake}></div>
      <div className={stlye.footer}>
        <Footer/>
      </div>
    </div>
  );
};

export default StartedPage;
