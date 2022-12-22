import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CardActions,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import theme from "../../themes/theme";
import { Close, SearchOutlined } from "@material-ui/icons";
import { apiKey, baseUrl } from "../../utils/constants";
import { MoviesState } from "../../App";
import { moviesPlayingNowAdapter } from "../../utils";
import { GenreList } from "../../utils/types";
import HeroSection from "../layout/HeroSection";

//Assets
import hero from "../../assets/images/hero.jpg";

const useStyles = makeStyles({
  cardActions: {
    justifyContent: "flex-end",
    padding: theme.spacing(2, 0, 0, 0),
  },
});

export interface SearchMovierProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<any>>;
  setMoviesInfo: React.Dispatch<React.SetStateAction<MoviesState | null>>;
  genresList: GenreList;
  currentPage: number | null;
  setIsSearchByQuery: React.Dispatch<React.SetStateAction<boolean>>;
  isUserAtBottom: boolean;
  totalPages: number | null;
  isSearchByQuery: boolean;
}

const Search: React.FC<SearchMovierProps> = ({
  setIsLoading,
  setError,
  setMoviesInfo,
  genresList,
  currentPage,
  setIsSearchByQuery,
  isUserAtBottom,
  totalPages,
  isSearchByQuery,
}) => {
  const styles = useStyles();
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");

  //Clear Search
  const clearSearch = () => {
    setValue("");
  };

  //Search Movies by query
  const searchMoviesByQuery = async (value?: string) => {
    if (!value) {
      setIsSearchByQuery(false);
      return;
    }
    const response = await fetch(
      `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false}`
    );
    const data = await response.json();
    setIsLoading(false);
    const moviesPlayingNow = data.results.map((result: any) =>
      moviesPlayingNowAdapter(result, genresList)
    );
    setIsLoading(true);
    setMoviesInfo((prev) => ({
      page: data.page,
      totalPages: data.total_pages,
      movies: prev ? [...prev.movies, ...moviesPlayingNow] : moviesPlayingNow,
    }));
  };

  //Search onChange handler
  const searchMovies = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setIsSearchByQuery(true);
    setValue(e.target.value);
  };

  // //Search onClick handle
  // const callSearchFunction = (e) => {
  //   e.preventDefault();
  //   console.log(e);
  // };

  useEffect(() => {
    if (isUserAtBottom && totalPages) {
      if (currentPage !== totalPages) {
        setPage((prev) => prev + 1);
        try {
          searchMoviesByQuery(value);
        } catch (error) {
          setIsLoading(false);
          setError(error);
        }
      }
    }
  }, [isUserAtBottom, totalPages, currentPage]);

  useEffect(() => {
    if (isSearchByQuery && !isUserAtBottom) {
      try {
        searchMoviesByQuery(value);
      } catch (error: any) {
        setIsLoading(false);
        setError(error);
      }
    }
  }, [isSearchByQuery]);

  return (
    <HeroSection
      bgImage={hero}
      title="Welcome to MovieRama"
      subtitle="Millions of movies to discover. Explore Now">
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={value}
            variant="filled"
            id="search-movies"
            onChange={searchMovies}
            placeholder="Search for a movie"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
              endAdornment: value && (
                <IconButton aria-label="Clear Search" onClick={clearSearch}>
                  <Close />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs="auto">
          <Button type="submit" title="Search">
            Search
          </Button>
        </Grid>
      </Grid>
    </HeroSection>
  );
};

export default Search;
