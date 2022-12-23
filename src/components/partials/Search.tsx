import React, { useEffect, useState } from "react";
import { Close, SearchOutlined } from "@material-ui/icons";
import { Button, Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { MoviesState } from "../../App";
import { GenreList } from "../../utils/types";
import HeroSection from "../layout/HeroSection";
import { apiKey, baseUrl } from "../../utils/constants";
import { moviesPlayingNowAdapter, networkErrorThrower } from "../../utils";

//Assets
import hero from "../../assets/images/hero.jpg";

export interface SearchMovierProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<any>>;
  setSearchedMovies: React.Dispatch<React.SetStateAction<MoviesState | null>>;
  genresList: GenreList;
  currentPage: number | null;
  isUserAtBottom: boolean;
  totalPages: number | null;
}

const Search: React.FC<SearchMovierProps> = ({
  isLoading,
  setIsLoading,
  setError,
  setSearchedMovies,
  genresList,
  currentPage,
  isUserAtBottom,
  totalPages,
}) => {
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");

  //Search Movies by query
  const searchMoviesByQuery = async (value?: string) => {
    if (!value) {
      setSearchedMovies(null);
      return;
    }
    try {
      const response = await fetch(
        `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false}`
      );
      const data = await response.json();
      if (data && data.results) {
        const moviesPlayingNow = data.results.map((result: any) =>
          moviesPlayingNowAdapter(result, genresList)
        );
        setIsLoading(false);
        setSearchedMovies((prev) => ({
          page: data.page,
          totalPages: data.total_pages,
          movies: prev ? [...prev.movies, ...moviesPlayingNow] : moviesPlayingNow,
        }));
      } else {
        networkErrorThrower({
          status_message: data.status_message,
          status_code: data.status_code,
        });
      }
    } catch (error: any) {
      setError({ statusCode: error.stack, message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  //onChange handler for search textfield
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  //onClick handler for search button
  const onSearch = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      searchMoviesByQuery(value);
    } catch (error: any) {
      setIsLoading(false);
      setError(error);
    }
  };

  //Clear Search
  const onClearSearch = () => {
    setValue("");
    setSearchedMovies(null);
  };

  useEffect(() => {
    if (isUserAtBottom && totalPages) {
      if (currentPage !== totalPages) {
        setPage((prev) => prev + 1);
      }
    }
  }, [isUserAtBottom, totalPages, currentPage]);

  useEffect(() => {
    searchMoviesByQuery(value);
  }, [page]);

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
            onChange={onChangeSearch}
            placeholder="Search for a movie"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
              endAdornment: value && (
                <IconButton aria-label="Clear Search" onClick={onClearSearch}>
                  <Close />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs="auto">
          <Button type="submit" title="Search" disabled={!value || isLoading} onClick={onSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
    </HeroSection>
  );
};

export default Search;
