import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import MovieCard from "./MovieCard";
import MovieDetailsDialog from "./MovieDetailsDialog";
import Loader from "../partials/Loader";
export interface MovieProps {
  id: string;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genres: Array<string>;
  poster_path: string | null;
}

export interface MoviesListProps {
  movies: MovieProps[] | null;
  isLoading: boolean;
}

const MoviesList: React.FC<MoviesListProps> = ({ movies, isLoading }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<null | MovieProps>(null);

  const showMovieDetails = (selectedMovie: MovieProps) => {
    setSelectedMovie(selectedMovie);
    setOpenDialog(!openDialog);
  };

  return (
    <div>
      {movies && (
        <Grid container spacing={5}>
          {movies.map((movie) => {
            if (movie.poster_path === null) {
              return null;
            }
            return (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  genres={movie.genres}
                  overview={movie.overview}
                  poster_path={movie.poster_path}
                  vote_average={movie.vote_average}
                  release_date={movie.release_date}
                  showMovieDetails={showMovieDetails}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
      <MovieDetailsDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedMovie={selectedMovie}
      />
    </div>
  );
};

export default MoviesList;
