import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  Tabs,
  Tab,
  Box,
  IconButton,
  Typography,
} from "@material-ui/core";
import theme from "../../themes/theme";
import { apiKey, baseUrl } from "../../utils/constants";
import { Close } from "@material-ui/icons";
import { MovieProps } from "./MoviesList";
import MovieTrailers from "./MovieTrailers";
import MovieReviews from "./MovieReviews";
import MovieSimilars from "./MovieSimilars";
import Transition from "../partials/Transition";

const useStyles = makeStyles(() => ({
  tabContent: {
    padding: theme.spacing(4, 0),
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export interface MovieDetailsDialogProps {
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  selectedMovie: MovieProps | null;
}

const MovieDetailsDialog: React.FC<MovieDetailsDialogProps> = ({
  openDialog,
  setOpenDialog,
  selectedMovie,
}) => {
  const styles = useStyles();
  const [videos, setVideos] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [similars, setSimilars] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  //Tab change handler
  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  //Dialog close handler
  const handleClose = () => {
    setOpenDialog(!openDialog);
  };

  //Get movie videos
  const getMovieVideos = async (id: string) => {
    const response = await fetch(`${baseUrl}/movie/${id}/videos?api_key=${apiKey}&language=en-US`);
    const data = await response.json();
    setVideos(data.results);
  };

  //Get movie reviews up to 2
  const getMovieReviews = async (id: string) => {
    const response = await fetch(`${baseUrl}/movie/${id}/reviews?api_key=${apiKey}&language=en-US`);
    const data = await response.json();
    setReviews(data.results.slice(0, 2));
  };

  //Get similar movies
  const getMovieSimilars = async (id: string) => {
    const response = await fetch(`${baseUrl}/movie/${id}/similar?api_key=${apiKey}&language=en-US`);
    const data = await response.json();
    setSimilars(data.results);
  };

  useEffect(() => {
    if (selectedMovie && tabValue === 0) {
      getMovieVideos(selectedMovie.id);
    }
    if (selectedMovie && tabValue === 1) {
      getMovieReviews(selectedMovie.id);
    }
    if (selectedMovie && tabValue === 2) {
      getMovieSimilars(selectedMovie.id);
    }
  }, [selectedMovie, tabValue]);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={openDialog}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle id="alert-dialog-slide-title" disableTypography className={styles.dialogTitle}>
        {selectedMovie && <Typography variant="h6">{selectedMovie.title}</Typography>}
        <IconButton aria-label="close" onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Tabs
          value={tabValue}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          onChange={handleChange}>
          <Tab label="Trailers" />
          <Tab label="Reviews" />
          <Tab label="Similar" />
        </Tabs>
        <Box className={styles.tabContent}>
          {tabValue === 0 && <MovieTrailers videos={videos} />}
          {tabValue === 1 && <MovieReviews reviews={reviews} />}
          {tabValue === 2 && <MovieSimilars similars={similars} />}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailsDialog;
