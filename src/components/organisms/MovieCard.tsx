import React, { useState } from "react";
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
import theme from "../../themes/theme";
import MovieDetailsDialog from "./MovieDetailsDialog";

const useStyles = makeStyles({
  card: {
    height: "100%",
  },
  cardMedia: {
    aspectRatio: 3 / 4,
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
  poster: string | null;
  title: string;
  yearOfRelease: string;
  genres: Array<string>;
  voteAverage: number;
  overview: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  poster,
  title,
  yearOfRelease,
  genres,
  voteAverage,
  overview,
}) => {
  const styles = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const showMovieDetails = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <>
      <Card className={styles.card} id={id}>
        <CardActionArea onClick={showMovieDetails}>
          {poster && <CardMedia className={styles.cardMedia} image={poster} title={title} />}
          <CardContent>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs="auto">
                <Grid container spacing={1}>
                  <Grid item xs="auto">
                    <Typography variant="h6" className={styles.title} title={title}>
                      {title}
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography variant="h6" color="textSecondary">
                      ({yearOfRelease})
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs="auto">
                <Box position="relative" display="inline-flex">
                  <CircularProgress
                    variant="determinate"
                    color="primary"
                    value={voteAverage * 10}
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
                      {voteAverage}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs="auto">
                {genres.map((genre, index) => (
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    className={styles.genres}
                    key={index}>
                    {genre}
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  {overview}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
      <MovieDetailsDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
};

export default MovieCard;
