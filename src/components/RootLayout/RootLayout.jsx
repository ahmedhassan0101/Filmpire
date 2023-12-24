import React from "react";
import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
// import useStyles from "./styles";
import Navbar from "../Navbar/Navbar";
import { Content, Main, StyledToolbar } from "./styles";

const RootLayout = () => {
  return (
    <Main>
      <CssBaseline />
      <Navbar />
      <Content>
        <StyledToolbar />
        <Outlet />
      </Content>
      {/* <div ref={alanBtnContainer} /> */}
    </Main>
  );
};

export default RootLayout;
