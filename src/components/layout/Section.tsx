import React, { PropsWithChildren } from "react";
import { Container, ContainerProps, Box, Typography } from "@material-ui/core";

export interface SectionProps {
  title?: string;
  paddingY?: number;
  maxWidth: ContainerProps["maxWidth"];
}

const Section: React.FC<PropsWithChildren<SectionProps>> = ({
  title,
  paddingY,
  maxWidth = "sm",
  children,
}) => {
  return (
    <section>
      <Box py={paddingY}>
        <Container maxWidth={maxWidth}>
          {title && (
            <Box pb={2}>
              <Typography variant="h4" color="primary">
                {title}
              </Typography>
            </Box>
          )}
          <Box>{children}</Box>
        </Container>
      </Box>
    </section>
  );
};

export default Section;
