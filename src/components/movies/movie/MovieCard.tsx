import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import theme from "../../../themes/theme";
import { MovieProps } from "../MoviesList";

const useStyles = makeStyles({
  card: {
    height: "100%",
    position: "relative",
    backgroundColor: theme.palette.grey[900],
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
      transform: "scale3d(1.05, 1.05, 1)",
    },
  },
  cardActionArea: {
    height: "100%",
  },
  cardMedia: {
    aspectRatio: 2 / 3,
  },
  cardContent: {
    height: "100%",
  },
  title: {
    maxWidth: 230,
    display: "block",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  cardActions: {
    display: "flex",
    justifyContent: "end",
    padding: theme.spacing(2),
  },
  genres: {
    "&:after": {
      content: "'•'",
      padding: theme.spacing(0, 0.5),
    },
    "&:last-child": {
      "&:after": {
        content: "none",
      },
    },
  },
});

export interface MovieCardProps {
  id: string;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genres: Array<string>;
  poster_path: string | null;
  showMovieDetails: (selectedMovie: MovieProps) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  overview,
  vote_average,
  release_date,
  genres,
  poster_path,
  showMovieDetails,
}) => {
  const styles = useStyles();

  const showMovieDetailsHandler = () => {
    showMovieDetails({
      id,
      title,
      genres,
      overview,
      poster_path,
      release_date,
      vote_average,
    });
  };

  return (
    <Card className={styles.card} raised>
      <CardActionArea className={styles.cardActionArea} onClick={showMovieDetailsHandler}>
        <CardMedia
          title={title}
          loading="lazy"
          component="img"
          className={styles.cardMedia}
          image={poster_path ? poster_path : undefined}
        />
        <CardContent className={styles.cardContent}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs="auto">
              <Grid container spacing={1}>
                <Grid item xs="auto">
                  <Typography variant="body1" className={styles.title} title={title}>
                    {title}
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  <Typography variant="body1" color="textPrimary">
                    ({String(new Date(release_date).getFullYear())})
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs="auto">
              <Box position="relative" display="inline-flex">
                <CircularProgress
                  variant="determinate"
                  color="primary"
                  value={vote_average * 10}
                  title={`Average vote of the ${title} is ${vote_average}`}
                />
                <Box
                  top={0}
                  left={0}
                  bottom={0}
                  right={0}
                  position="absolute"
                  display="flex"
                  alignItems="center"
                  justifyContent="center">
                  <Typography variant="caption" component="div" color="textPrimary">
                    {vote_average.toFixed(1)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {genres &&
              genres.map((genre, index) => (
                <Grid item xs="auto" key={index}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    className={styles.genres}
                    key={index}>
                    {genre}
                  </Typography>
                </Grid>
              ))}
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                {overview}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
