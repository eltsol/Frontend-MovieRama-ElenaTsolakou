import React, { useRef } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import MovieCard from "./MovieCard";

const useStyles = makeStyles({});

export interface MovieProps {
  id: string;
  poster: string | null;
  title: string;
  yearOfRelease: string;
  genres: Array<string>;
  voteAverage: number;
  overview: string;
}

export interface MoviesListProps {
  movies: MovieProps[] | null;
}

const MoviesList: React.FC<MoviesListProps> = ({ movies }) => {
  return (
    <Grid container spacing={3}>
      {movies &&
        movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <MovieCard
              id={movie.id}
              poster={movie.poster}
              title={movie.title}
              yearOfRelease={movie.yearOfRelease}
              genres={movie.genres}
              voteAverage={movie.voteAverage}
              overview={movie.overview}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default MoviesList;
