import { Grid, Typography } from "@mui/material"
import React, { PropsWithChildren } from "react"

interface FlowerArrangementCategoryProps {
  name: string
}

const FlowerArrangementCategory: React.FC<PropsWithChildren<FlowerArrangementCategoryProps>> = ({ children, name }) => {
  return (
    <Grid container item>
      <Grid item md={2} sm={2} xs={2}>
        <Typography variant="button">{name}</Typography>
      </Grid>
      <Grid container item md={2} sm={2} xs={2} rowSpacing={2}>
        {children}
      </Grid>
    </Grid>
  )
}

export default FlowerArrangementCategory
