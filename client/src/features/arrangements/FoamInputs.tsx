import React from "react"
import { Grid, InputAdornment, TextField, Typography } from "@mui/material"

interface FoamInputsProps {
  count: number
}

const FoamInputs: React.FC<FoamInputsProps> = ({ count }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item md={2} sm={2} xs={2}>
        <Typography variant="button">foam</Typography>
      </Grid>

      <Grid item md={2} sm={2} xs={3}>
        <TextField
          size="small"
          label="Cost"
          disabled={true}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={"?"}
        ></TextField>
      </Grid>
      <Grid item md={2} sm={2} xs={3}>
        <TextField size="small" label="Quantity" type="number" value={count}></TextField>
      </Grid>
    </Grid>
  )
}

export default FoamInputs
