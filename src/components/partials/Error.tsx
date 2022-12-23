import React from "react";
import { Box, Typography } from "@material-ui/core";

export interface ErrorProps {
  title: string;
  subtitle: string;
}

const Error: React.FC<ErrorProps> = ({ title, subtitle }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" pt={8}>
      <Typography variant="h4" color="primary">
        {title}
      </Typography>
      <Typography variant="h6" color="textPrimary">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Error;
