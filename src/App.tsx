import React, { useEffect, useState } from "react";
import theme from "./themes/theme";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

//Components
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import SearchMovie from "./components/molecules/SearchMovie";
import Section from "./components/organisms/Section";

import MoviesList, { MovieProps } from "./components/organisms/MoviesList";
import { apiKey, baseUrl } from "./constants";
import { playingNowMoviesAdapter } from "./endpointDataAdapters";
import { GenreList } from "./types";

export interface MoviesState {
  page: number;
  movies: MovieProps[];
  totalPages: number;
}

function App() {
  const [moviesInfos, setMoviesInfos] = useState<null | MoviesState>(null);
  const [page, setPage] = useState(1);
  const [genresList, setGenresList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getGenreList = async () => {
    setIsLoading(true);
    const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`);
    const data = await response.json();
    setIsLoading(false);
    setGenresList(data.genres);
  };

  const getMoviesPLayingNow = async (genresList: GenreList) => {
    setIsLoading(true);
    const response = await fetch(
      `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`
    );
    const data = await response.json();
    setIsLoading(false);
    const transformedResultsData = data.results.map((result: any) =>
      playingNowMoviesAdapter(result, genresList)
    );
    setMoviesInfos({
      page: data.page,
      totalPages: data.total_pages,
      movies: moviesInfos
        ? [...moviesInfos.movies, ...transformedResultsData]
        : transformedResultsData,
    });
  };

  useEffect(() => {
    try {
      getGenreList();
    } catch (error: any) {
      setIsLoading(false);
      setError(error);
    }
  }, []);

  useEffect(() => {
    if (genresList) {
      try {
        getMoviesPLayingNow(genresList);
      } catch (error: any) {
        setIsLoading(false);
        setError(error);
      }
    }
  }, [genresList, page]);

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
              setMoviesInfos={setMoviesInfos}
              genresList={genresList}
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
