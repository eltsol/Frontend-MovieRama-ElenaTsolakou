import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Close, Search } from "@material-ui/icons";
import CardWrapper from "../organisms/CardWrapper";
import { apiKey, baseUrl } from "../../constants";
import { MoviesState } from "../../App";
import { playingNowMoviesAdapter } from "../../endpointDataAdapters";
import { GenreList } from "../../types";

export interface SearchMovierProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<any>>;
  setMoviesInfos: React.Dispatch<React.SetStateAction<MoviesState | null>>;
  genresList: GenreList;
}

const SearchMovie: React.FC<SearchMovierProps> = ({
  setIsLoading,
  setError,
  setMoviesInfos,
  genresList,
}) => {
  const [value, setValue] = useState("");

  const searchMoviesByQuery = async (value?: string) => {
    if (!value) {
      return;
    }
    const response = await fetch(
      `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${value}&page=1&include_adult=false}`
    );
    const data = await response.json();
    setIsLoading(false);
    const transformedResultsData = data.results.map((result: any) =>
      playingNowMoviesAdapter(result, genresList)
    );
    setMoviesInfos({
      page: data.page,
      totalPages: data.total_pages,
      movies: transformedResultsData,
    });
  };

  const searchMovies = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setValue(e.target.value);
    try {
      searchMoviesByQuery(e.target.value);
    } catch (error: any) {
      setIsLoading(false);
      setError(error);
    }
  };

  return (
    <CardWrapper>
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
    </CardWrapper>
  );
};

export default SearchMovie;
