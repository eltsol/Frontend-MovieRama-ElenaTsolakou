import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import { apiKey, baseUrl } from "../../constants";
import MovieReviews from "./MovieReviews";
import theme from "../../themes/theme";
import MovieSimilars from "./MovieSimilars";
import { MovieProps } from "./MoviesList";
import MovieTrailers from "./MovieTrailers";

const useStyles = makeStyles(() => ({
  tabContent: {
    padding: theme.spacing(4, 0),
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface MovieDetailsDialogProps {
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  selectedMovie: null | MovieProps;
}

const MovieDetailsDialog: React.FC<MovieDetailsDialogProps> = ({
  openDialog = false,
  setOpenDialog,
  selectedMovie,
}) => {
  const styles = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [videos, setVideos] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [similars, setSimilars] = useState(null);

  //Get movie videos
  const getMovieVideos = async (id: string) => {
    const response = await fetch(`${baseUrl}/movie/${id}/videos?api_key=${apiKey}&language=en-US`);
    const responseJson = await response.json();
    setVideos(responseJson.results);
  };

  //Get movie reviews
  const getMovieReviews = async (id: string) => {
    const response = await fetch(`${baseUrl}/movie/${id}/reviews?api_key=${apiKey}&language=en-US`);
    const responseJson = await response.json();
    setReviews(responseJson.results.slice(0, 2));
  };

  //Get similar movies
  const getMovieSimilars = async (id: string) => {
    const response = await fetch(`${baseUrl}/movie/${id}/similar?api_key=${apiKey}&language=en-US`);
    const responseJson = await response.json();
    setSimilars(responseJson.results);
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

  //Tab content for each tab
  const tabContent = [
    <MovieTrailers videos={videos} />,
    <MovieReviews reviews={reviews} />,
    <MovieSimilars similars={similars} />,
  ];

  //Tab change handler
  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  //Dialog close handler
  const handleClose = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <Dialog
      maxWidth="md"
      open={openDialog}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle id="alert-dialog-slide-title">{"Movie Title"}</DialogTitle>
      <DialogContent>
        <Tabs
          value={tabValue}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
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
