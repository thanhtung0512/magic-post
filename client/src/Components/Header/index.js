// HeaderBar.js
import React from "react";
import {
  Flex,
  Input,
  Button,
  Text,
  ChakraProvider,
  CSSReset,
  extendTheme,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import style from "./Header.module.css";
import SearchBar from "../SearchBar";
import AuthService from "../../services/auth.service";
const theme = extendTheme({
  colors: {
    brand: {
      500: "#01904a", // Blue color
    },
  },
});

const Header = ({ role, userName, onLogout }) => {
  return (
    <Flex
      as="header"
      // align="center"
      // justify="space-between"
      p={4}
      // height="80px"
      // bg="white"
      // borderBottom="3px solid teal" // Blue color
      rounded="md"
      boxShadow="md" // Add box shadow for a subtle lift
      className={style.container}
    >
      <Link
        to="/dashboard"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className={style.company}>
          <img
            src="assests/images/Screenshot_2023-11-15_143213-removebg-preview.png"
            width="80px"
            height="80px"
          />
          <span>Magic Post</span>
        </div>
      </Link>
      <Flex className={style.SearchBar}>
        <SearchBar />
      </Flex>
      <Flex className={style.userSet}>
        <Text mx={2} fontWeight="bold" color="teal" className={style.userName}>
          {userName}
        </Text>
        <Button
          onClick={onLogout}
          rounded="full"
          bg="teal"
          color="white"
          _hover={{ bg: "#01904a" }}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
