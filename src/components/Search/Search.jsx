import React, { useState } from "react";
import { Container, SearchBox } from "./styles";
import { InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { searchMovie } from "../../Redux/categorySlice";
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const searchTermHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const keyPresshandler = (e) => {
    if (e.key === "Enter") {
      dispatch(searchMovie(searchTerm));
    }
  };

  return (
    <Container>
      <SearchBox
        variant="standard"
        value={searchTerm}
        onChange={searchTermHandler}
        onKeyPress={keyPresshandler}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
};

export default Search;
