import { Grid } from "@mui/material";
import React from "react";
import FlowerArrangementCategory from "./FlowerArrangementCategory";
import ArrangementFlowers from "./ArrangementFlowers";
interface ArrangementFlowersContainerProps {}

const categories = ["base", "primary", "filler", "bits"];

const ArrangementFlowersContainer: React.FC<ArrangementFlowersContainerProps> = () => {
  return (
    <Grid container rowSpacing={2}>
      {categories.map((c) => (
        <FlowerArrangementCategory name={c} key={c}>
          <ArrangementFlowers category={c} />
        </FlowerArrangementCategory>
      ))}
    </Grid>
  );
};

export default ArrangementFlowersContainer;
