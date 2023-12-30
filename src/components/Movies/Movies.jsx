import React, { useState } from "react";
import MovieList from "../MovieList/MovieList";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../Redux/TMDB";

const Movies = () => {
  const [page, setPage] = useState(1);
  const categoryName = useSelector(
    (state) => state.currentCategory.categoryName
  );
  const searchQuery = useSelector((state) => state.currentCategory.searchQuery);
  const { data, error, isFetching } = useGetMoviesQuery({
    categoryName,
    page,
    searchQuery,
  });

  if (isFetching) {
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <CircularProgress size={"4rem"} />
      </Box>
    );
  }
  if (!data?.results?.length) {
    <Box display={"flex"} justifyContent={"center"} mt="20px">
      <Typography variant="h4">
        No Movies that match that name.
        <br />
        Please search for something else
      </Typography>
    </Box>;
  }
  if (error) return "An error has occured.";
  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
