import React, { useState, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import style from "./Register.module.css";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Link as ChakraLink,
  Spinner,
} from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">This is not a valid email.</div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
          setLoading(false);
          setSuccessful(true);
          setMessage(response.data.message);
          setTimeout(() => {
            navigate("/");
          }, 1000); // Redirect to login after 2 seconds
        },
        (error) => {
          setLoading(false);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    // <Flex direction="column" align="center" justify="center" height="100vh">
    //   {/* Logo */}
    //   <Text fontSize="3xl" fontWeight="bold" mb={4}>
    //     MagicPost
    //   </Text>
    //   <Box
    //     p={8}
    //     maxWidth="400px"
    //     borderWidth={1}
    //     borderRadius={8}
    //     boxShadow="lg"
    //   >
    //     <Heading mb={4}>Register</Heading>

    //     <Form onSubmit={handleRegister} ref={form}>
    //       {!successful && (
    //         <div>
    //           {" "}
    //           <FormControl mb={4}>
    //             <FormLabel>Username</FormLabel>
    //             <Input
    //               type="text"
    //               placeholder="Enter your username"
    //               name="username"
    //               value={username}
    //               onChange={onChangeUsername}
    //               validations={[required, vusername]}
    //             />
    //           </FormControl>
    //           <FormControl mb={4}>
    //             <FormLabel>Email address</FormLabel>
    //             <Input
    //               type="email"
    //               placeholder="Enter your email"
    //               name="email"
    //               value={email}
    //               onChange={onChangeEmail}
    //               validations={[required, validEmail]}
    //             />
    //           </FormControl>
    //           <FormControl mb={4}>
    //             <FormLabel>Password</FormLabel>
    //             <Input
    //               type="password"
    //               placeholder="Enter your password"
    //               name="password"
    //               value={password}
    //               onChange={onChangePassword}
    //               validations={[required, vpassword]}
    //             />
    //           </FormControl>
    //           <Button
    //             colorScheme="teal"
    //             type="submit"
    //             width="full"
    //             disabled={loading}
    //           >
    //             {loading ? (
    //               <>
    //                 Signing up... <Spinner size="sm" ml={2} />
    //               </>
    //             ) : (
    //               "Sign Up"
    //             )}
    //           </Button>
    //         </div>
    //       )}
    //       {message && (
    //         <div className="form-group">
    //           <div
    //             style={{ color: successful ? "teal" : "red" }}
    //             className="alert"
    //             role="alert"
    //           >
    //             {message}
    //           </div>
    //         </div>
    //       )}
    //       <CheckButton style={{ display: "none" }} ref={checkBtn} />
    //     </Form>

    //     <Box mt={4}>
    //       Already have an account?{" "}
    //       <ChakraLink color="teal" href="/">
    //         Login here.
    //       </ChakraLink>
    //     </Box>
    //   </Box>
    // </Flex>
    // <div className={style.container}>
    //   <div className={style.logo}>
    //     <img
    //       src="Screenshot_2023-11-15_143213-removebg-preview.png"
    //       width="200"
    //       height="200"
    //     ></img>
    //     <div className={style.CompanyName}>Magic Post</div>
    //   </div>
    //   <h2 className={style.title}>Đăng ký</h2>
    //   <form className={style.form} onSubmit={handleRegister} ref={form}>
    //     {!successful && (
    //       <div className={style.subform}>
    //         <div className={style.input}>
    //           <label for="username" class="form-label">
    //             Tên tài khoản
    //           </label>
    //           <input
    //             name="username"
    //             type="text"
    //             placeholder="Vui lòng nhập tên tài khoản"
    //             minlength="4"
    //             maxlength="24"
    //             title="Vui lòng nhập tài khoản"
    //           ></input>
    //         </div>

    //         <div className={style.input}>
    //           <label for="username" class="form-label">
    //             Email
    //           </label>
    //           <input
    //             name="username"
    //             type="text"
    //             placeholder="Vui lòng nhập Email"
    //             minlength="4"
    //             maxlength="24"
    //             title="Vui lòng nhập Email"
    //           ></input>
    //         </div>
    //         <div className={style.input}>
    //           <label for="username" class="form-label">
    //             Mật khẩu
    //           </label>
    //           <input
    //             name="username"
    //             type="text"
    //             placeholder="Vui lòng nhập mật khẩu"
    //             minlength="4"
    //             maxlength="24"
    //             title="Vui lòng nhập mật khẩu"
    //           ></input>
    //         </div>
    //         <div className={style.group}>
    //           <button disabled={loading} type="submit" ref={checkBtn}>
    //             {loading ? (
    //               <>
    //                 Signing up... <Spinner size="sm" ml={2} />
    //               </>
    //             ) : (
    //               "Sign Up"
    //             )}
    //           </button>
    //         </div>
    //         <div className={style.redirect}>
    //           <p>Bạn chưa có tài khoản ?</p>
    //           <Link to="/login">Đăng nhập</Link>
    //         </div>

    //       </div>
    //     )}
    //   </form>
    //   <div className={style.license}>
    //     Khi đăng ký, tôi đồng ý với các Điều khoản sử dụng và Chính sách bảo mật
    //     của MagicPost.
    //   </div>
    // </div>
    <Flex
      direction="column"
      align="center"
      justify="center"
      className={style.container}
    >
      {/* Logo */}
      <img
        src="/assests/images/Screenshot_2023-11-15_143213-removebg-preview.png"
        width="200"
        height="200"
      ></img>
      <Text
        fontSize="3xl"
        fontWeight="bold"
        mb={4}
        className={style.CompanyName}
      >
        MagicPost
      </Text>

      <Heading mb={4}>Register</Heading>

      <Form onSubmit={handleRegister} ref={form} className={style.form}>
        {!successful && (
          <div className={style.subform}>
            {" "}
            <FormControl mb={4} className={style.input}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required, vusername]}
              />
            </FormControl>
            <FormControl mb={4} className={style.input}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
            </FormControl>
            <FormControl mb={4} className={style.input}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />
            </FormControl>
            <Button
              colorScheme="teal"
              type="submit"
              width="full"
              disabled={loading}
            >
              {loading ? (
                <>
                  Signing up... <Spinner size="sm" ml={2} />
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        )}
        {message && (
          <div className="form-group">
            <div
              style={{ color: successful ? "teal" : "red" }}
              className="alert"
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>

      <Box mt={4}>
        Already have an account?{" "}
        <ChakraLink color="teal" href="/">
          Login here.
        </ChakraLink>
      </Box>
      <div className={style.license}>
        Khi đăng ký, tôi đồng ý với các Điều khoản sử dụng và Chính sách bảo mật
        của MagicPost.
      </div>
    </Flex>
  );
};

export default Register;
