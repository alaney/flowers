import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface VesselInputsProps {
  type: string;
  count: number;
  cost: number;
  control: Control<
    {
      name: string;
      vesselType: string;
    },
    any
  >;
  errors: FieldErrors<{
    name: string;
    vesselType: string;
  }>;
}

const VesselInputs: React.FC<VesselInputsProps> = ({ type, count, cost, control, errors }) => {
  return (
    <Grid item container spacing={2} alignItems="center">
      <Grid item md={2} sm={2} xs={3}>
        <Typography variant="button">vessel</Typography>
      </Grid>
      <Grid item md={2} sm={2} xs={3}>
        <Controller
          name="vesselType"
          control={control}
          render={({ field }) => <TextField error={!!errors.vesselType} size="small" label="Type" {...field} />}
        />
      </Grid>
      <Grid item md={2} sm={2} xs={3}>
        <TextField
          size="small"
          label="Cost"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={cost}
        ></TextField>
      </Grid>
      <Grid item md={2} sm={2} xs={3}>
        <TextField size="small" label="Quantity" type="number" value={count}></TextField>
      </Grid>
    </Grid>
  );
};

export default VesselInputs;
