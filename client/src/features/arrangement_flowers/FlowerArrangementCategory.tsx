import { Grid, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

interface FlowerArrangementCategoryProps {
  name: string;
}

const FlowerArrangementCategory: React.FC<PropsWithChildren<FlowerArrangementCategoryProps>> = ({ children, name }) => {
  return (
    <>
      <Grid container item>
        <Typography marginTop={1} marginBottom={1} variant="button">
          {name}
        </Typography>
        <Grid container item rowSpacing={2}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default FlowerArrangementCategory;
