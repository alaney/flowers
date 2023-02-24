import { Grid } from "@mui/material";
import React from "react";
import FlowerArrangementCategory from "./FlowerArrangementCategory";
import ArrangementFlowers from "./ArrangementFlowers";
import { Control, FieldErrors } from "react-hook-form";
import { ArrangementUpdates } from "../arrangements/ArrangementDetails2";
interface ArrangementFlowersContainerProps {
  control: Control<ArrangementUpdates, any>;
  errors: FieldErrors<ArrangementUpdates>;
}

const categories = ["base", "primary", "filler", "bits"];

const ArrangementFlowersContainer: React.FC<ArrangementFlowersContainerProps> = ({ control, errors }) => {
  return (
    <Grid container rowSpacing={2}>
      {categories.map((c) => (
        <FlowerArrangementCategory name={c} key={c}>
          <ArrangementFlowers control={control} errors={errors} category={c} />
        </FlowerArrangementCategory>
      ))}
    </Grid>
  );
};

export default ArrangementFlowersContainer;
