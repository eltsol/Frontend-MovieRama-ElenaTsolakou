import React from "react";
import theme from "../../themes/theme";
import { Card, CardContent, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  card: {},
}));

export interface CardWrapperProps {
  children: JSX.Element;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {
  const styles = useStyles();

  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
