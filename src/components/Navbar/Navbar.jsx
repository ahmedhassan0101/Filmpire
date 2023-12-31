import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DrawerPaper, IconBtn, LinkBtn, StyledToolbar } from "./styles";
import {
  AccountCircle,
  Brightness4,
  Brightness7,
  Menu,
} from "@mui/icons-material";
import { Sidebar, Search } from "..";
import { createSessionId, fetchToken, moviesApi } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/authSlice";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isAuth = user.isAuth;
  const dispatch = useDispatch();
  const mobileOpenHandler = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const token = localStorage.getItem("request_token");
  const sessionIdLS = localStorage.getItem("session_id");
  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdLS) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdLS}`
          );
          dispatch(setUser(userData));
          // console.log(`1 ${JSON.stringify(user)}`);
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
          // console.log(`2 ${JSON.stringify(user)}`);
        }
      }
    };
    logInUser();
  }, [token]);
  return (
    <>
      <AppBar>
        <StyledToolbar>
          {isMobile && (
            <IconBtn edge="start" onClick={() => mobileOpenHandler()}>
              <Menu />
            </IconBtn>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuth ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <LinkBtn
                color="inherit"
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={
                    "https://cdn.vectorstock.com/i/1000x1000/99/94/default-avatar-placeholder-profile-icon-male-vector-23889994.webp"
                  }
                />
              </LinkBtn>
            )}
          </div>
          {isMobile && <Search />}
        </StyledToolbar>
      </AppBar>
      <div>
        {isMobile ? (
          <DrawerPaper
            variant="temporary"
            anchor="right"
            open={mobileOpen}
            onClose={() => mobileOpenHandler()}
            ModalProps={{ keepMounted: true }}
          >
            <Sidebar setMobileOpe={setMobileOpen} />
          </DrawerPaper>
        ) : (
          <DrawerPaper variant="permanent" open>
            <Sidebar setMobileOpe={setMobileOpen} />
          </DrawerPaper>
        )}
      </div>
    </>
  );
};

export default Navbar;
