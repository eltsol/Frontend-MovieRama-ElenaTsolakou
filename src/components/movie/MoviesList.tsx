import React, { useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import MovieCard from "./MovieCard";
import MovieDetailsDialog from "./MovieDetailsDialog";

const useStyles = makeStyles({});

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
}

const MoviesList: React.FC<MoviesListProps> = ({ movies }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<null | MovieProps>(null);

  const showMovieDetails = (selectedMovie: MovieProps) => {
    setSelectedMovie(selectedMovie);
    setOpenDialog(!openDialog);
  };

  return (
    <>
      <Grid container spacing={3}>
        {movies &&
          movies.map((movie) => (
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
          ))}
      </Grid>
      <MovieDetailsDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedMovie={selectedMovie}
      />
    </>
  );
};

export default MoviesList;
