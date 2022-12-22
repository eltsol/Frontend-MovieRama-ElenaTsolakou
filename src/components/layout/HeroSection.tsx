import React from "react";
import theme from "../../themes/theme";
import { alpha, Box, Container, makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  paper: {
    minHeight: 400,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    "&:before": {
      content: "''",
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: alpha(theme.palette.common.black, 0.5),
    },
  },
  box: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
  },
}));

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  bgImage?: string;
  children: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, bgImage, children }) => {
  const styles = useStyles();

  return (
    <Paper
      square
      elevation={0}
      className={styles.paper}
      style={{ backgroundImage: `url(${bgImage})` }}>
      <Container maxWidth="md">
        <Box className={styles.box}>
          <Typography color="textPrimary" variant="h3" align="center">
            {title}
          </Typography>
          {subtitle && (
            <Typography color="primary" variant="h6" gutterBottom align="center">
              {subtitle}
            </Typography>
          )}
          <Box pt={3} width="100%">
            {children}
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default HeroSection;
