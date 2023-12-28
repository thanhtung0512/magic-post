// App.js
import React from "react";
// import MainLayout from "./pages/MainLayout";

import Header from "../src/Components";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import {Login, Register, StartedPage, MainLayout} from './pages'
import { Route, Routes } from "react-router-dom";
import MapWithMarkers from "./Components/MapWithMarkers";
import GrantTellerAccount from "./Components/RoleContent/PointLeaderTransaction/GrantTellerAccount";
import Profile from "./Components/Profile";
import AuthService from "./services/auth.service";
function App() {
  const isAuthenticated = AuthService.getCurrentUser() !== null;
  return (
    <ChakraProvider>
      <CSSReset />
      {/* <MapWithMarkers/> */}
      <Routes>
        {/* <Route path="/Register" element={<Login />} /> */}
        <Route path="/" element= {<StartedPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<MainLayout />} />
        {/* <Route
          path="/"
          element={isAuthenticated ? <MainLayout /> : <Login />}
        /> */}
        <Route path="/manage-points" element={<MainLayout />} />
        <Route path="/manage-account-managers" element={<MainLayout />} />
        <Route path="/view-statistics" element={<MainLayout />} />
        <Route path="/grant-teller-accounts" element={<MainLayout />} />
        <Route path="/transaction-point-statistics" element={<MainLayout />} />
        <Route path="/lookup-status" element={<MainLayout />} />

        <Route path="/record-goods" element={<MainLayout />} />
        <Route path="/create-delivery-orders" element={<MainLayout />} />
        <Route
          path="/confirmation-arriving-at-collection"
          element={<MainLayout />}
        />
        <Route path="/create-orders-recipient" element={<MainLayout />} />
        <Route
          path="/confirmation-delivered-recipient"
          element={<MainLayout />}
        />
        <Route path="/failed-delivery-handling" element={<MainLayout />} />
        <Route path="/statistics-transferred-rows" element={<MainLayout />} />

        <Route path="/manage-employee-accounts" element={<MainLayout />} />
        <Route path="/gathering-point-statistics" element={<MainLayout />} />

        <Route path="/profile" element={<MainLayout />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
