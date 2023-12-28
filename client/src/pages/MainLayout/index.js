import React, { useState } from "react";
import style from "./MainLayout.module.css";
import { Flex } from "@chakra-ui/react";
import AuthService from "../../services/auth.service";
import { Header, Content, Footer } from "../../Components";
import { useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();
  const currentUserr = AuthService.getCurrentUser();
  const [userName, setUserName] = useState(currentUserr.username); // Replace with your state logic
  const [role, setRole] = useState("companyLeader"); // Replace with your state logic
  const [currentUser, setCurrentUser] = useState(undefined);
  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked");
    AuthService.logout();
    setCurrentUser(undefined);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Header role={role} userName={userName} onLogout={handleLogout} />
      {/* <SideBarWithContent /> */}
      <div className={style.content}>
        <Content />
      </div>

      <div className={style.footer}>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
