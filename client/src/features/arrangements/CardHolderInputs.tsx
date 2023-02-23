import React from "react";
import { Checkbox, Grid, InputAdornment, Switch, TextField, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { ArrangementUpdates } from "./ArrangementDetails";

interface CardHolderInputsProps {
  control: Control<ArrangementUpdates, any>;
}

const CardHolderInputs: React.FC<CardHolderInputsProps> = ({ control }) => {
  return (
    <Grid item container spacing={2} alignItems="center">
      <Grid item md={2} sm={2} xs={3}>
        <Typography variant="button">card holder</Typography>
      </Grid>
      <Grid item md={2} sm={2} xs={3}>
        <Controller
          name="cardHolder"
          control={control}
          render={({ field: props }) => {
            return <Checkbox {...props} checked={props.value} onChange={(e) => props.onChange(e.target.checked)} />;
          }}
        />
      </Grid>
      <Grid item md={2} sm={2} xs={3}>
        <TextField
          size="small"
          label="Cost"
          disabled={true}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={"0.30"}
        ></TextField>
      </Grid>
    </Grid>
  );
};

export default CardHolderInputs;
