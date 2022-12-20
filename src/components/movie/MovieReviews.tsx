import React from "react";
import theme from "../../themes/theme";
import CardWrapper from "../layout/CardWrapper";
import { posterBasePath } from "../../constants";
import { makeStyles, Grid, Typography, Avatar, Box, Card } from "@material-ui/core";
import { ContactsOutlined } from "@material-ui/icons";

const useStyles = makeStyles({
  ratingContainer: {
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
  },
});

export interface ReviewProps {
  id: string;
  content: string;
  created_at: string;
  author_details: { username: string; avatar_path: string; rating: string };
}

export interface MovieReviewsProps {
  reviews: Array<ReviewProps> | null;
}

const MovieReviews: React.FC<MovieReviewsProps> = ({ reviews }) => {
  const styles = useStyles();

  // if (!reviews) {
  //   return null;
  // }

  // console.log(reviews.map(review) => console.log(review));

  return (
    <>
      {reviews &&
        reviews.map((review) => (
          <CardWrapper key={review.id}>
            <Grid container spacing={2} alignItems="center" key={review.id}>
              <Grid item xs="auto">
                <Avatar src={`${posterBasePath}${review.author_details.avatar_path}`} />
              </Grid>
              <Grid item xs="auto">
                <Grid container direction="column">
                  <Grid item xs="auto">
                    <Typography variant="body1">{review.author_details.username}</Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography variant="caption">{review.created_at}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid container justifyContent="flex-end">
                  <Grid item xs="auto">
                    <Box className={styles.ratingContainer}>
                      <Typography variant="caption">{review.author_details.rating}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">{review.content}</Typography>
              </Grid>
            </Grid>
          </CardWrapper>
        ))}
    </>
  );
};

export default MovieReviews;
