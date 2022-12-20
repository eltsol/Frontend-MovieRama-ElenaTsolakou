import React, { useEffect, useState } from "react";
import theme from "./themes/theme";
import { GenreList } from "./types";
import { apiKey, baseUrl } from "./constants";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

//Adapters
import { playingNowMoviesAdapter } from "./endpointDataAdapters";

//Components
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import Section from "./components/layout/Section";
import SearchMovie from "./components/movie/SearchMovie";
import MoviesList, { MovieProps } from "./components/movie/MoviesList";
import { useHasScrolledToBottom } from "./hooks";

export interface MoviesState {
  page: number;
  movies: MovieProps[];
  totalPages: number;
}

function App() {
  const [moviesInfos, setMoviesInfos] = useState<null | MoviesState>(null);
  const [isSearchByQuery, setIsSearchByQuery] = useState(false);
  const [genresList, setGenresList] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [, setError] = useState(null);

  //Get genre list
  const getGenreList = async () => {
    const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`);
    const responseJson = await response.json();
    setGenresList(responseJson.genres);
  };

  //Get movies that play now
  const getMoviesPLayingNow = async (genresList: GenreList) => {
    const response = await fetch(
      `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=en-US&page=${
        moviesInfos ? moviesInfos.page : 1
      }`
    );
    const responseJson = await response.json();
    const transformedResultsData = responseJson.results.map((result: any) =>
      playingNowMoviesAdapter(result, genresList)
    );
    setMoviesInfos({
      page: responseJson.page,
      totalPages: responseJson.total_pages,
      movies: moviesInfos
        ? [...moviesInfos.movies, ...transformedResultsData]
        : transformedResultsData,
    });
  };

  useEffect(() => {
    try {
      getGenreList();
    } catch (error: any) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    if (genresList && !moviesInfos) {
      try {
        getMoviesPLayingNow(genresList);
      } catch (error: any) {
        setError(error);
      }
    }
  }, [genresList]);

  const { isAtBottom } = useHasScrolledToBottom();

  useEffect(() => {
    if (genresList && moviesInfos && isSearchByQuery === false) {
      const shouldLoadMoreMovies = moviesInfos.page !== moviesInfos.totalPages;
      if (isAtBottom && shouldLoadMoreMovies) {
        getMoviesPLayingNow(genresList);
      }
    }
  }, [moviesInfos, isAtBottom, isSearchByQuery]);

  console.log(moviesInfos);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Section title="Search Movies" maxWidth="lg" paddingY={8}>
          {genresList && (
            <SearchMovie
              setIsLoading={setIsLoading}
              setError={setError}
              setIsSearchByQuery={setIsSearchByQuery}
              setMoviesInfos={setMoviesInfos}
              isUserAtBottom={isAtBottom}
              genresList={genresList}
              isSearchByQuery={isSearchByQuery}
              currentPage={moviesInfos && moviesInfos.page}
              totalPages={moviesInfos && moviesInfos.totalPages}
            />
          )}
        </Section>
        <Section title="Now Playing Movies" maxWidth="lg">
          <MoviesList movies={moviesInfos ? moviesInfos.movies : moviesInfos} />
        </Section>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
