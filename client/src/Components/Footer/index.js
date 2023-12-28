import style from "./Footer.module.css";
import { FaFacebookF } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.contentLeft}>
          <div className={style.company}>
            <img
              src="/assests/images/Screenshot_2023-11-15_143213-removebg-preview.png"
              width="40px"
              height="40px"
            />
            <span>Magic Post</span>
          </div>
          <div className={style.bold}>CÔNG TY CỔ PHẦN GIAO HÀNG MAGIC POST</div>
          <div>
            <div className={style.ul1}>
              <p>Về chúng tôi</p>
              <p>Tuyển dụng</p>
              <p>Dịch vụ</p>
            </div>
            <div className={style.ul1}>
              <p>Quy định chung</p>
              <p>Chính sách bảo mật</p>
            </div>
          </div>
          <div className={style.Icons}>
          <FaFacebookF />
          <HiUserGroup />
          <FaGithub />
          <FaInstagram />
          <IoIosMail />

          </div>
        </div>
        <div className={style.contentRight}>
          <span className={style.bold}>
            CÔNG TY CỔ PHẦN GIAO HÀNG MAGIC POST
          </span>
          <div>
            <span>
              Giấy CNĐKKD: 0106181807 - Ngày cấp 21/05/2013, đăng ký thay đổi
              lần 09 ngày 04/06/2020.
            </span>
            <span>
              Cơ quan cấp: Phòng Đăng ký kinh doanh - Sở kế hoạch và đầu tư TP
              Hà Nội
            </span>
          </div>

          <div>
            <span>
              Giấy phép bưu chính số 346/GP-BTTTT do Bộ TT&TT cấp này 23/08/2019
            </span>
            <span>
              Văn bản xác nhận thông báo hoạt động bưu chính số 2784/XN-BTTTT do
              Bộ TT&TT cấp ngày 19/08/2019
            </span>
            <span>
              Văn bản xác nhận thông báo hoạt động bưu chính của 62 chi nhánh
              trên toàn quốc
            </span>
          </div>
          <div>
            <a className={style.location} href="https://maps.app.goo.gl/YdCFgqYGTQN4RpANA" >
              Địa chỉ trụ sở chính: Tòa E3, số 144 Xuân Thủy, phường Dịch Vọng Hậu, quận Cầu Giấy, thành phố Hà Nội, Việt Nam
            </a>
            <span>Hotline: 024 3754 8864</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
