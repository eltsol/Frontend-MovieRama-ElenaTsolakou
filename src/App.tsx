import React, { useEffect, useState } from "react";
import theme from "./themes/theme";
import { GenreList } from "./utils/types";
import { apiKey, baseUrl } from "./utils/constants";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

//Adapters
import { moviesPlayingNowAdapter } from "./utils";

//Custom hooks
import useInfiniteScroll from "./hooks/useInfiniteScroll";

//Components
import Loader from "./components/partials/Loader";
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import Section from "./components/layout/Section";
import Search from "./components/partials/Search";
import MoviesList, { MovieProps } from "./components/movie/MoviesList";

export interface MoviesState {
  page: number;
  movies: MovieProps[];
  totalPages: number;
}

function App() {
  const [moviesInfo, setMoviesInfo] = useState<MoviesState | null>(null);
  const [isSearchByQuery, setIsSearchByQuery] = useState(true);
  const [genresList, setGenresList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //Get genres of the movie
  const getGenreList = async () => {
    setIsLoading(true);
    const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`);
    const data = await response.json();
    setIsLoading(false);
    setGenresList(data.genres);
  };

  //Get movies that play now
  const getMoviesPLayingNow = async (genresList: GenreList) => {
    setIsLoading(true);
    const response = await fetch(
      `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=en-US&page=${
        moviesInfo ? moviesInfo.page : 1
      }`
    );
    const data = await response.json();
    setIsLoading(false);
    const moviesPlayingNow = data.results.map((result: any) =>
      moviesPlayingNowAdapter(result, genresList)
    );
    setMoviesInfo({
      page: data.page,
      totalPages: data.total_pages,
      movies: moviesInfo ? [...moviesInfo.movies, ...moviesPlayingNow] : moviesPlayingNow,
    });
  };

  useEffect(() => {
    try {
      getGenreList();
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (genresList && !moviesInfo) {
      try {
        getMoviesPLayingNow(genresList);
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    }
  }, [genresList]);

  const { isAtBottom } = useInfiniteScroll();

  useEffect(() => {
    if (genresList && moviesInfo && isSearchByQuery === false) {
      const shouldLoadMoreMovies = moviesInfo.page !== moviesInfo.totalPages;
      if (isAtBottom && shouldLoadMoreMovies) {
        getMoviesPLayingNow(genresList);
      }
    }
  }, [moviesInfo, isAtBottom, isSearchByQuery]);

  console.log(moviesInfo);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Section pb={8}>
          {genresList && (
            <Search
              setError={setError}
              genresList={genresList}
              setIsLoading={setIsLoading}
              isUserAtBottom={isAtBottom}
              setMoviesInfo={setMoviesInfo}
              isSearchByQuery={isSearchByQuery}
              setIsSearchByQuery={setIsSearchByQuery}
              currentPage={moviesInfo && moviesInfo.page}
              totalPages={moviesInfo && moviesInfo.totalPages}
            />
          )}
        </Section>
        {/* {!isLoading ? (
         
        ) : (
          <Loader isLoading={isLoading} setIsLoading={setIsLoading} />
        )} */}
        <Section title="Now Playing" maxWidth="lg" pb={10}>
          <MoviesList movies={moviesInfo ? moviesInfo.movies : moviesInfo} />
        </Section>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
