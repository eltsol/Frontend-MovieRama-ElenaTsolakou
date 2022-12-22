import React from "react";
import { Box, CircularProgress, Fade } from "@material-ui/core";

export interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return (
    <Fade in={isLoading}>
      <Box display="flex" justifyContent="center">
        <CircularProgress variant="indeterminate" size={50} />
      </Box>
    </Fade>
  );
};

export default Loader;
