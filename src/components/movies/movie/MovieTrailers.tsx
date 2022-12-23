import React from "react";
import theme from "../../../themes/theme";
import { makeStyles, Grid, Typography, Box, colors, alpha } from "@material-ui/core";

const useStyles = makeStyles({
  iframe: {
    border: "none",
    aspectRatio: 16 / 9,
  },
  boxInfo: {
    bottom: 0,
    width: "100%",
    position: "absolute",
    padding: theme.spacing(2),
    backgroundColor: alpha(colors.common.black, 0.9),
  },
});

export interface VideoProps {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface MovieTrailersProps {
  videos: Array<VideoProps> | null;
}

const MovieTrailers: React.FC<MovieTrailersProps> = ({ videos }) => {
  const styles = useStyles();
  return (
    <Grid container spacing={3}>
      {videos &&
        videos.map((video) => {
          if (video.type !== "Trailer") {
            return null;
          }
          return (
            <Grid item xs={6} key={video.id}>
              <Box position="relative">
                <iframe
                  width="100%"
                  height="100%"
                  allowFullScreen
                  className={styles.iframe}
                  title="YouTube video player"
                  src={
                    video.site === "YouTube"
                      ? `https://www.youtube.com/embed/${video.key}`
                      : `https://vimeo.com/${video.key}`
                  }
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
                <Box className={styles.boxInfo} key={video.id}>
                  <Typography variant="body1">{video.name}</Typography>
                </Box>
              </Box>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default MovieTrailers;
