import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { formatDollar } from "../../app/utils";
import { Arrangement } from "../../types/Types";

interface SubtotalProps {
  arrangement: Arrangement;
}

const Subtotal: React.FC<SubtotalProps> = ({ arrangement }) => {
  const flowers = arrangement.flowers;
  const flowersTotal = flowers.reduce<number>((a, f) => {
    const price = f.pricePerStem * f.count;
    a += price;
    return a;
  }, 0);

  return (
    <Grid container>
      <Grid container item>
        <Grid item xs={3}>
          <Typography variant="button">Flowers</Typography>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Typography>{`$ ${formatDollar(flowersTotal)}`}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Subtotal;
