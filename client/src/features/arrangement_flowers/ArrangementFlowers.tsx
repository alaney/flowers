import { Grid, TextField } from "@mui/material";
import React from "react";
import { ArrangementFlower } from "../../types/Types";

interface ArrangementFlowersProps {
  flowers: ArrangementFlower[];
}

const ArrangementFlowers: React.FC<ArrangementFlowersProps> = ({ flowers }) => {
  return (
    <>
      {flowers.map((f) => (
        <Grid key={f.id} container item md={12} sm={12} xs={12} spacing={2}>
          <Grid item>
            <TextField size="small" value={f.name} label="Name"></TextField>
          </Grid>
          <Grid item>
            <TextField size="small" value={f.count} type="number" label="Quantity"></TextField>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default ArrangementFlowers;
