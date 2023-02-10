import { Grid } from "@mui/material"
import React from "react"
import { Flower } from "../../types/Arrangement"
import FlowerCategory from "./FlowerCategory"
import Flowers from "./Flowers"

interface FlowersContainerProps {
  flowers: Flower[]
}

const categories = ["base", "primary", "filler", "bits"]

const FlowersContainer: React.FC<FlowersContainerProps> = ({ flowers }) => {
  return (
    <Grid container rowSpacing={2}>
      {categories.map((c) => (
        <FlowerCategory name={c}>
          <Flowers flowers={flowers.filter((f) => f.category.toLowerCase() === c)} />
        </FlowerCategory>
      ))}
    </Grid>
  )
}

export default FlowersContainer
