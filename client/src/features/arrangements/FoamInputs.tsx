import React from "react";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { decimalNumberRegex } from "../../app/utils";

interface FoamInputsProps {}

const FoamInputs: React.FC<FoamInputsProps> = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid item container spacing={2} alignItems="center">
      <Grid item md={2} sm={2} xs={3}>
        <Typography variant="button">foam</Typography>
      </Grid>
      <Grid item md={2} sm={2} xs={3}></Grid>
      <Grid item md={2} sm={2} xs={3}>
        <TextField
          size="small"
          label="Cost"
          disabled={true}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={"1.00"}
        ></TextField>
      </Grid>
      <Grid item md={2} sm={2} xs={3}>
        <Controller
          name="foamCount"
          control={control}
          rules={{ required: false, pattern: decimalNumberRegex }}
          render={({ field }) => (
            <TextField {...field} size="small" label="Quantity" error={!!errors.foamCount}></TextField>
          )}
        />
      </Grid>
    </Grid>
  );
};

export default FoamInputs;
