import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Theaters } from "@material-ui/icons";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <Theaters />
        </IconButton>
        <Typography variant="h6">MovieRama</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
