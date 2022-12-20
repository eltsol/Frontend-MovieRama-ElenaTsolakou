import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  iframe: {
    aspectRatio: 16 / 9,
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
    <Grid container spacing={3} wrap="nowrap">
      {videos &&
        videos.map((video) => {
          if (video.type !== "Trailer") {
            return null;
          }
          return (
            <Grid item xs="auto" key={video.id}>
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
            </Grid>
          );
        })}
    </Grid>
  );
};

export default MovieTrailers;
