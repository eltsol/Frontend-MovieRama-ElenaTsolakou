import React from "react";
import { Box, Typography } from "@material-ui/core";

export interface ErrorMessageProps {
  title: string;
  subtitle: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, subtitle }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" pt={8}>
      <Typography variant="h4" color="primary">
        {title}
      </Typography>
      <Typography variant="body2" color="textPrimary">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
