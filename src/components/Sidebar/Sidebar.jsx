import React from "react";
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  useTheme,
} from "@mui/material";
import { GenreImg, LinkContainer, StyledLink } from "./styles";
import { useGetGenresQuery } from "../../redux/TMDB";
import genreIcons from "../../assets/genres";
import { useDispatch } from "react-redux";
import { selectCategory } from "../../redux/categorySlice";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const DUMMY_CATEGORIES = ["Comdy", "Action", "Horror", "Animation"];

const redLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
const blueLogo =
  "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";

const Sidebar = ({ setMobileOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();

  const changeCategoryHandler = (term) => {
    dispatch(selectCategory(term));
  };
  return (
    <>
      <LinkContainer to="/">
        <img
          src={theme.palette.mode === "light" ? redLogo : blueLogo}
          alt="Filmpire Logo"
        />
      </LinkContainer>
      {/* //======================================// */}
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <StyledLink key={value}>
            <ListItemButton onClick={() => changeCategoryHandler(value)}>
              <ListItemIcon>
                <GenreImg src={genreIcons[label.toLowerCase()]} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </StyledLink>
        ))}
      </List>
      <Divider />
      {/* //======================================// */}
      <List>
        <ListSubheader>Genres</ListSubheader>

        {isFetching ? (
          <Box display={"flex"} justifyContent={"center"}>
            <CircularProgress size={"4rem"} />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <StyledLink key={id}>
              <ListItemButton onClick={() => changeCategoryHandler(id)}>
                <ListItemIcon>
                  <GenreImg src={genreIcons[name.toLowerCase()]} />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </StyledLink>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
