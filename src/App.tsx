import React, { useEffect, useMemo, useState } from "react";
import theme from "./themes/theme";
import { GenreList } from "./utils/types";

import { apiKey, baseUrl } from "./utils/constants";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

//Adapters
import { moviesPlayingNowAdapter, networkErrorThrower } from "./utils";

//Custom hooks
import useInfiniteScroll from "./hooks/useInfiniteScroll";

//Components
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import Section from "./components/layout/Section";
import Search from "./components/partials/Search";
import MoviesList, { MovieProps } from "./components/movie/MoviesList";
import Loader from "./components/partials/Loader";
import Error from "./components/partials/Error";
import SnackbarError from "./components/partials/SnackbarError";

export interface MoviesState {
  page: number;
  movies: MovieProps[];
  totalPages: number;
}

function App() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [moviesPlayingNow, setMoviesPlayingNow] = useState<MoviesState | null>(null);
  const [seardchedMovies, setSearchedMovies] = useState<MoviesState | null>(null);
  const [error, setError] = useState<null | { statusCode: number; message: string }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [genresList, setGenresList] = useState(null);

  //Get genres of the movie
  const getGenreList = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`);
      const data = await response.json();
      if (data && data.genres) {
        setGenresList(data.genres);
      } else {
        networkErrorThrower({
          status_message: data.status_message,
          status_code: data.status_code,
        });
      }
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  //Get movies that playing now
  const getMoviesPLayingNow = async (genresList: GenreList) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${baseUrl}/movie/now_playing?api_key=sdfv${apiKey}&language=en-US&page=${page}`
      );
      const data = await response.json();
      if (data && data.results) {
        const moviesPlayingNow = data.results.map((result: any) =>
          moviesPlayingNowAdapter(result, genresList)
        );
        setMoviesPlayingNow((prev) => ({
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
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGenreList();
  }, []);

  useEffect(() => {
    if (genresList && !moviesPlayingNow) {
      getMoviesPLayingNow(genresList);
    }
  }, [genresList]);

  const { isAtBottom } = useInfiniteScroll();

  useEffect(() => {
    if (genresList && moviesPlayingNow && !seardchedMovies) {
      const shouldLoadMoreMovies = moviesPlayingNow.page !== moviesPlayingNow.totalPages;
      if (isAtBottom && shouldLoadMoreMovies) {
        setPage((prev) => prev + 1);
      }
    }
  }, [moviesPlayingNow, isAtBottom]);

  useEffect(() => {
    if (genresList && isAtBottom && page !== 1 && !seardchedMovies) {
      getMoviesPLayingNow(genresList);
    }
  }, [page]);

  const moviesToRender = useMemo(() => {
    if (seardchedMovies) {
      setCategory("searchedMovies");
      return seardchedMovies.movies;
    }
    if (moviesPlayingNow) {
      setCategory("playingNowMovies");
      return moviesPlayingNow.movies;
    }
    return null;
  }, [seardchedMovies, moviesPlayingNow]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Section pb={8}>
          {genresList && (
            <Search
              isLoading={isLoading}
              setError={setError}
              genresList={genresList}
              setIsLoading={setIsLoading}
              isUserAtBottom={isAtBottom}
              setSearchedMovies={setSearchedMovies}
              currentPage={seardchedMovies && seardchedMovies.page}
              totalPages={seardchedMovies && seardchedMovies.totalPages}
            />
          )}
        </Section>
        <Section
          title={category === "playingNowMovies" ? "Now Playing" : "Search Results"}
          maxWidth="lg"
          pb={10}>
          {moviesToRender && moviesToRender.length > 0 && !error ? (
            <MoviesList movies={moviesToRender} isLoading={isLoading} />
          ) : (
            <Error
              title="No results found."
              subtitle="Please try searching by actor, genre or character."
            />
          )}
        </Section>
        {isLoading && <Loader isLoading={isLoading} />}
        {error && (
          <SnackbarError
            error={{
              status_message: error.message,
              status_code: error.statusCode,
            }}
            setError={setError}
          />
        )}
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
