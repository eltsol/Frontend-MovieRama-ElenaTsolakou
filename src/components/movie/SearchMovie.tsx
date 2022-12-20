import React, { useEffect, useState } from "react";
import { IconButton, InputAdornment, TextField, Typography } from "@material-ui/core";
import { Close, Search } from "@material-ui/icons";
import CardWrapper from "../layout/CardWrapper";
import { apiKey, baseUrl } from "../../constants";
import { MoviesState } from "../../App";
import { playingNowMoviesAdapter } from "../../endpointDataAdapters";
import { GenreList } from "../../types";

export interface SearchMovierProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<any>>;
  setMoviesInfos: React.Dispatch<React.SetStateAction<MoviesState | null>>;
  genresList: GenreList;
  currentPage: number | null;
  setIsSearchByQuery: React.Dispatch<React.SetStateAction<boolean>>;
  isUserAtBottom: boolean;
  totalPages: number | null;
  isSearchByQuery: boolean;
}

const SearchMovie: React.FC<SearchMovierProps> = ({
  setIsLoading,
  setError,
  setMoviesInfos,
  genresList,
  currentPage,
  setIsSearchByQuery,
  isUserAtBottom,
  totalPages,
  isSearchByQuery,
}) => {
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");

  const searchMoviesByQuery = async (value?: string) => {
    if (!value) {
      setIsSearchByQuery(false);
      return;
    }
    const response = await fetch(
      `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${value}&page=${page}&include_adult=true}`
    );
    const data = await response.json();
    setIsLoading(false);
    const transformedResultsData = data.results.map((result: any) =>
      playingNowMoviesAdapter(result, genresList)
    );
    setMoviesInfos((prev) => ({
      page: data.page,
      totalPages: data.total_pages,
      movies: prev ? [...prev.movies, ...transformedResultsData] : transformedResultsData,
    }));
  };

  const searchMovies = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setIsSearchByQuery(true);
    setValue(e.target.value);
  };

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
    <TextField
      fullWidth
      value={value}
      variant="filled"
      id="search-movies"
      placeholder="Search for a movie"
      onChange={searchMovies}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: value && (
          <IconButton aria-label="toggle password visibility" onClick={() => setValue("")}>
            <Close />
          </IconButton>
        ),
      }}
    />
  );
};

export default SearchMovie;
