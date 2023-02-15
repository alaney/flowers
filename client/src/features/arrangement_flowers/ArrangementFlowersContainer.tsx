import { Grid } from "@mui/material";
import React from "react";
import { ArrangementFlower } from "../../types/Types";
import FlowerArrangementCategory from "./FlowerArrangementCategory";
import ArrangementFlowers from "./ArrangementFlowers";
interface ArrangementFlowersContainerProps {
  flowers: ArrangementFlower[];
}

const categories = ["base", "primary", "filler", "bits"];

const ArrangementFlowersContainer: React.FC<ArrangementFlowersContainerProps> = ({ flowers }) => {
  return (
    <Grid container rowSpacing={2}>
      {categories.map((c) => (
        <FlowerArrangementCategory name={c} key={c}>
          <ArrangementFlowers arrangementFlowers={flowers.filter((f) => f.category.toLowerCase() === c)} category={c} />
        </FlowerArrangementCategory>
      ))}
    </Grid>
  );
};

export default ArrangementFlowersContainer;
