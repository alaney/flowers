import { Grid, Typography } from "@mui/material"
import React, { PropsWithChildren } from "react"

interface FlowerCategoryProps {
  name: string
}

const FlowerCategory: React.FC<PropsWithChildren<FlowerCategoryProps>> = ({ children, name }) => {
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

export default FlowerCategory
