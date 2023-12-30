import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categoryName: "",
  searchQuery: "",
  page: 1,
};
export const categorySlice = createSlice({
  name: "curentCategory",
  initialState,
  reducers: {
    selectCategory: (state, { payload }) => {
      state.categoryName = payload;
      console.log(payload);
    },
    searchMovie: (state, { payload }) => {
      state.searchQuery = payload;
    },
  },
});
export default categorySlice.reducer;
export const { selectCategory, searchMovie } = categorySlice.actions;
