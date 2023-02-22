import { Grid, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

interface FlowerArrangementCategoryProps {
  name: string;
}

const FlowerArrangementCategory: React.FC<PropsWithChildren<FlowerArrangementCategoryProps>> = ({ children, name }) => {
  return (
    <>
      <Typography variant="button">{name}</Typography>
      <Grid container item>
        <Grid container item rowSpacing={2}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default FlowerArrangementCategory;
