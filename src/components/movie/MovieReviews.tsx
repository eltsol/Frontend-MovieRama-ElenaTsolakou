import React from "react";
import theme from "../../themes/theme";
import CardWrapper from "../layout/CardWrapper";
import { posterBasePath } from "../../utils/constants";
import { makeStyles, Grid, Typography, Avatar, Box } from "@material-ui/core";

const useStyles = makeStyles({
  ratingContainer: {
    padding: theme.spacing(1, 2),
    color: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.main}`,
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

  return (
    <>
      {reviews &&
        reviews.map((review) => (
          <Grid container spacing={4} key={review.id}>
            <Grid item xs={12}>
              <CardWrapper bgColor="light" key={review.id}>
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
                        {review.author_details.rating && (
                          <Box className={styles.ratingContainer}>
                            <Typography variant="caption">
                              {review.author_details.rating}
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">{review.content}</Typography>
                  </Grid>
                </Grid>
              </CardWrapper>
            </Grid>
          </Grid>
        ))}
    </>
  );
};

export default MovieReviews;
