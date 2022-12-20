import React from "react";
import { Card, CardContent, makeStyles } from "@material-ui/core";
import theme from "../../themes/theme";

const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: theme.palette.grey[700],
  },
}));

export interface CardWrapperProps {
  children: any;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {
  const styles = useStyles();

  return (
    <Card variant="elevation" className={styles.card}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
