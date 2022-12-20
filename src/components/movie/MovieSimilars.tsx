import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { MovieProps } from "./MoviesList";
import { posterBasePath } from "../../constants";
import MovieCard, { MovieCardProps } from "./MovieCard";

export interface MovieSimilarsProps {
  similars: Array<MovieCardProps> | null;
}

const MovieSimilars: React.FC<MovieSimilarsProps> = ({ similars }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [, setSelectedMovie] = useState<null | MovieProps>(null);

  const showMovieDetails = (selectedMovie: MovieProps) => {
    setSelectedMovie(selectedMovie);
    setOpenDialog(!openDialog);
  };

  if (!similars) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      {similars &&
        similars.map((similar) => (
          <Grid item xs={12} sm={6} key={similar.id}>
            <MovieCard
              id={similar.id}
              title={similar.title}
              genres={similar.genres}
              overview={similar.overview}
              showMovieDetails={showMovieDetails}
              vote_average={similar.vote_average}
              release_date={similar.release_date}
              poster_path={`${posterBasePath}${similar.poster_path}`}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default MovieSimilars;
