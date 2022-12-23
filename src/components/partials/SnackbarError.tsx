import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

export interface SnackbarErrorProps {
  error: { status_message: string; status_code: number };
  setError: (error: null | { statusCode: number; message: string }) => void;
}

const SnackbarError: React.FC<SnackbarErrorProps> = ({ error, setError }) => {
  //Close handler for snackbar
  const onCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Snackbar open={!!error} onClose={onCloseSnackbar}>
      <Alert variant="filled" onClose={onCloseSnackbar} severity="error">
        {error.status_message}
        {error.status_code}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarError;
