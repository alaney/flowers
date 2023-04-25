import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { ArrangementSubtotals, formatDollar } from "../../app/utils";

interface SubtotalProps {
  subtotals: ArrangementSubtotals;
}

const Subtotal: React.FC<SubtotalProps> = ({ subtotals }) => {
  const { flowersSubtotal, hardGoodsSubtotal, laborSubtotal, taxSubtotal, taxTotal } = subtotals;
  return (
    <Grid container>
      <Grid container item alignItems="center">
        <Grid item xs={3}>
          <Typography variant="button">Flowers</Typography>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Typography style={{ textAlign: "right" }}>{`$ ${formatDollar(flowersSubtotal)}`}</Typography>
        </Grid>
      </Grid>
      <Grid container item alignItems="center">
        <Grid item xs={3}>
          <Typography variant="button">Hard Goods</Typography>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Typography style={{ textAlign: "right" }}> {`$ ${formatDollar(hardGoodsSubtotal)}`}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ textAlign: "right" }}>{`$ ${formatDollar(
            hardGoodsSubtotal + flowersSubtotal
          )}`}</Typography>
        </Grid>
      </Grid>
      <Grid container item alignItems="center">
        <Grid item xs={3}>
          <Typography variant="button">Labor</Typography>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Typography style={{ textAlign: "right" }}> {`$ ${formatDollar(laborSubtotal)}`}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ textAlign: "right" }}>{`$ ${formatDollar(
            hardGoodsSubtotal + flowersSubtotal + laborSubtotal
          )}`}</Typography>
        </Grid>
      </Grid>
      <Grid container item alignItems="center">
        <Grid item xs={3}>
          <Typography variant="button">Tax</Typography>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Typography style={{ textAlign: "right" }}> {`$ ${formatDollar(taxSubtotal)}`} </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ textAlign: "right" }}>{`$ ${formatDollar(taxTotal)}`}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Subtotal;
