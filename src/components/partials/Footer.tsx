import React from "react";
import theme from "../../themes/theme";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  footer: {
    width: "100%",
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: theme.spacing(6),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Footer = () => {
  const styles = useStyles();

  return (
    <footer className={styles.footer}>
      <Typography variant="body2">© Copyright 2022 - Elena Tsolakou</Typography>
    </footer>
  );
};

export default Footer;
