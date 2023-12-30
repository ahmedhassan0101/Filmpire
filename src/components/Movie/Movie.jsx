import { Box, Grid, Grow, Rating, Tooltip } from "@mui/material";
import React from "react";
import { Img, Links, Title } from "./styles";
import { useNavigate } from "react-router-dom";

const Movie = ({ idx, movie }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} p={"10px"}>
      <Grow in key={idx} timeout={(idx + 1) * 250}>
        <Links onClick={() => navigate(`/movie/${movie.id}`)}>
          <Box>
            <Img
              alt={movie.title}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "https://fillmurray.com/200/300"
              }
            />
          </Box>
          <Title variant="h5">{movie.title}</Title>
          <Tooltip
            disableTouchListener
            title={`${(movie.vote_average / 2).toFixed(1)} / 5`}
          >
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Links>
      </Grow>
    </Grid>
  );
};

export default Movie;
