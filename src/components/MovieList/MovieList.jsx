import React from "react";
import Movie from "../Movie/Movie";
import { MoviesContainer } from "./styles";

const MovieList = ({ movies }) => {
  return (
    <>
      <MoviesContainer container>
        {movies.results.map((movie, idx) => (
          <Movie key={idx} movie={movie} idx={idx} />
        ))}
      </MoviesContainer>
    </>
  );
};

export default MovieList;
