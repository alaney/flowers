import { Grid, InputAdornment, TextField, Typography } from "@mui/material"
import React from "react"

interface VesselInputsProps {
  type: string
  count: number
  cost: number
}

const VesselInputs: React.FC<VesselInputsProps> = ({ type, count, cost }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item md={3}>
        <Typography variant="button">vessel</Typography>
      </Grid>
      <Grid item md={3}>
        <TextField size="small" label="Type" value={type}></TextField>
      </Grid>
      <Grid item md={3}>
        <TextField
          size="small"
          label="Cost"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={cost}
        ></TextField>
      </Grid>
      <Grid item md={3}>
        <TextField size="small" label="Quantity" type="number" value={count}></TextField>
      </Grid>
    </Grid>
  )
}

export default VesselInputs
