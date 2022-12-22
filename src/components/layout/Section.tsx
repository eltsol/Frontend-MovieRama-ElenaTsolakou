import React, { PropsWithChildren } from "react";
import { Container, ContainerProps, Box, Typography } from "@material-ui/core";
import { SpacingOptions } from "@material-ui/core/styles/createSpacing";

export interface SectionProps {
  title?: string;
  pt?: number;
  pb?: number;
  maxWidth?: ContainerProps["maxWidth"];
}

const Section: React.FC<PropsWithChildren<SectionProps>> = ({
  title,
  pt,
  pb,
  maxWidth = false,
  children,
}) => {
  return (
    <Box pt={pt} pb={pb}>
      <Container maxWidth={maxWidth} disableGutters={maxWidth ? false : true}>
        {title && (
          <Box pb={3}>
            <Typography variant="h4" color="primary">
              {title}
            </Typography>
          </Box>
        )}
        {children}
      </Container>
    </Box>
  );
};

export default Section;
