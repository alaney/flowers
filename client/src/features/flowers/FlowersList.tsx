import { Grid } from "@mui/material";
import React from "react";
import { Flower } from "../../types/Types";
import FlowerInputs from "./FlowerInputs";

interface FlowersListProps {
  flowers: Flower[];
}

const FlowersList: React.FC<FlowersListProps> = ({ flowers }) => {
  return (
    <Grid container rowSpacing={2}>
      {flowers.map((f) => (
        <FlowerInputs key={f.id} flower={f} />
      ))}
    </Grid>
  );
};

export default FlowersList;
