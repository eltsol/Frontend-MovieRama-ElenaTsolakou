import React from "react";
import { Theaters } from "@material-ui/icons";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="MovieRama Logo">
          <Theaters />
        </IconButton>
        <Typography variant="h6">MovieRama</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
