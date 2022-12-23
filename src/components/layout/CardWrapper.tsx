import React from "react";
import theme from "../../themes/theme";
import { Card, CardContent, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  cardDark: {
    height: "100%",
    backgroundColor: theme.palette.grey[800],
  },
  cardLight: {
    height: "100%",
    backgroundColor: theme.palette.grey[600],
  },
}));

export interface CardWrapperProps {
  children: any;
  bgColor?: "light" | "dark";
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children, bgColor = "dark" }) => {
  const styles = useStyles();

  return (
    <Card variant="elevation" className={bgColor === "dark" ? styles.cardDark : styles.cardLight}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
