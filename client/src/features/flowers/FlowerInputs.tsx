import { Grid, TextField } from "@mui/material"
import React from "react"
import { Flower } from "../../types/Types"

interface FlowerInputsProps {
  flower: Flower
}

const FlowerInputs: React.FC<FlowerInputsProps> = ({ flower }) => {
  return (
    <Grid container item spacing={2}>
      <Grid item>
        <TextField size="small" value={flower.name}></TextField>
      </Grid>
      <Grid item>
        <TextField size="small" value={flower.pricePerBundle}></TextField>
      </Grid>
      <Grid item>
        <TextField size="small" value={flower.stemCount}></TextField>
      </Grid>
      <Grid item>
        <TextField size="small" value={flower.pricePerStem}></TextField>
      </Grid>
    </Grid>
  )
}

export default FlowerInputs
