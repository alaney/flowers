import { Grid } from "@mui/material"
import React from "react"
import { Arrangement } from "../../types/Arrangement"
import CardHolderInputs from "./CardHolderInputs"
import FoamInputs from "./FoamInputs"
import VesselInputs from "./VesselInputs"

interface HardGoodsProps {
  arrangement: Arrangement
}

const HardGoods: React.FC<HardGoodsProps> = ({ arrangement }) => {
  return (
    <Grid container rowSpacing={2} marginTop="8px">
      <Grid item sm={12} md={12}>
        <VesselInputs type={arrangement.vesselType} count={arrangement.vesselCount} cost={arrangement.vesselCost} />
      </Grid>
      <Grid item sm={12} md={12}>
        <FoamInputs count={arrangement.foamCount} />
      </Grid>
      <Grid item sm={12} md={12}>
        <CardHolderInputs cardHolder={arrangement.cardHolder} />
      </Grid>
    </Grid>
  )
}

export default HardGoods
