import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuth: false,
  sessionId: "",
};
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      state.isAuth = true;
      state.sessionId = localStorage.getItem("session_id");
      localStorage.setItem("accountId", payload.id);
    },
  },
});

export default authSlice.reducer;

export const { setUser } = authSlice.actions;
