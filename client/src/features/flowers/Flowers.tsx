import { Grid, TextField } from "@mui/material"
import React from "react"
import { ArrangementFlower } from "../../types/Types"

interface FlowersProps {
  flowers: ArrangementFlower[]
}

const Flowers: React.FC<FlowersProps> = ({ flowers }) => {
  return (
    <>
      {flowers.map((f) => (
        <Grid item>
          <TextField size="small" key={f.id} value={f.name} label="Name"></TextField>
        </Grid>
      ))}
    </>
  )
}

export default Flowers
