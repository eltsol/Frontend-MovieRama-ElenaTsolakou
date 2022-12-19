import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Slide,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";

const useStyles = makeStyles(() => ({}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface MovieDetailsDialogProps {
  openDialog: boolean;
  setOpenDialog: () => {};
}

const MovieDetailsDialog: React.FC<MovieDetailsDialogProps> = ({
  openDialog = false,
  setOpenDialog,
}) => {
  const styles = useStyles();
  const [open, setOpen] = useState(openDialog);

  const handleClose = () => {
    setOpen(false);
    setOpenDialog(false);
  };
  return (
    <Dialog
      keepMounted
      open={openDialog}
      onClose={handleClose}
      maxWidth="md"
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle id="alert-dialog-slide-title">Movie Title</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailsDialog;
