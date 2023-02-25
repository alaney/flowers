import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { ArrangementUpdates } from "./ArrangementDetails2";

interface VesselInputsProps {
  control: Control<ArrangementUpdates, any>;
  errors: FieldErrors<ArrangementUpdates>;
}

const VesselInputs: React.FC<VesselInputsProps> = ({ control, errors }) => {
  return (
    <Grid item container spacing={2} alignItems="center">
      <Grid item md={2} sm={2} xs={3}>
        <Typography variant="button">vessel</Typography>
      </Grid>
      <Grid item md={2} sm={2} xs={3}>
        <Controller
          name="vesselType"
          control={control}
          render={({ field }) => <TextField {...field} size="small" label="Type" />}
        />
      </Grid>
      <Grid item md={2} sm={2} xs={3}>
        <Controller
          name="vesselCost"
          control={control}
          rules={{ required: false, pattern: /^\d+(\.\d+)?$/ }}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              label="Cost"
              error={!!errors.vesselCost}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          )}
        />
      </Grid>
      <Grid item md={2} sm={2} xs={3}>
        <Controller
          name="vesselCount"
          control={control}
          rules={{ required: false, pattern: /^[0-9]*$/ }}
          render={({ field }) => <TextField {...field} size="small" label="Quantity" error={!!errors.vesselCount} />}
        />
      </Grid>
    </Grid>
  );
};

export default VesselInputs;
