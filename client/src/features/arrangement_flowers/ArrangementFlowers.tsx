import { Grid, TextField } from "@mui/material"
import React from "react"
import { ArrangementFlower } from "../../types/Types"

interface ArrangementFlowersProps {
  flowers: ArrangementFlower[]
}

const ArrangementFlowers: React.FC<ArrangementFlowersProps> = ({ flowers }) => {
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

export default ArrangementFlowers
