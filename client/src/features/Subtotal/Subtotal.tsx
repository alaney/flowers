import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { calculateSubtotals, formatDollar } from "../../app/utils";
import { Arrangement } from "../../types/Types";

interface SubtotalProps {
  arrangement: Arrangement;
}

const Subtotal: React.FC<SubtotalProps> = ({ arrangement }) => {
  const {
    flowersSubtotal,
    hardGoodsSubtotal,
    laborSubtotal,
    taxSubtotal,
    venmoSubtotal,
    paypalSubtotal,
    taxTotal,
    venmoTotal,
    paypalTotal,
  } = calculateSubtotals(arrangement);
  return (
    <Grid container>
      <Grid container item>
        <Grid item xs={3}>
          <Typography variant="button">Flowers</Typography>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Typography>{`$ ${formatDollar(flowersSubtotal)}`}</Typography>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={4}>
          <Typography variant="button">Hard Goods</Typography>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={3}>
          {`$ ${formatDollar(hardGoodsSubtotal)}`}
        </Grid>
        <Grid item xs={3}>
          <Typography>{`$ ${formatDollar(hardGoodsSubtotal + flowersSubtotal)}`}</Typography>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={3}>
          <Typography variant="button">Labor</Typography>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          {`$ ${formatDollar(laborSubtotal)}`}
        </Grid>
        <Grid item xs={3}>
          <Typography>{`$ ${formatDollar(hardGoodsSubtotal + flowersSubtotal + laborSubtotal)}`}</Typography>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={3}>
          <Typography variant="button">Tax</Typography>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          {`$ ${formatDollar(taxSubtotal)}`}
        </Grid>
        <Grid item xs={3}>
          <Typography>{`$ ${formatDollar(taxTotal)}`}</Typography>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={3}>
          <Typography variant="button">Venmo</Typography>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          {`$ ${formatDollar(venmoSubtotal)}`}
        </Grid>
        <Grid item xs={3}>
          <Typography>{`$ ${formatDollar(venmoTotal)}`}</Typography>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={3}>
          <Typography variant="button">PayPal</Typography>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          {`$ ${formatDollar(paypalSubtotal)}`}
        </Grid>
        <Grid item xs={3}>
          <Typography>{`$ ${formatDollar(paypalTotal)}`}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Subtotal;
