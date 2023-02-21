import { Grid } from "@mui/material";
import React from "react";
import { Arrangement } from "../../types/Types";
import CardHolderInputs from "./CardHolderInputs";
import FoamInputs from "./FoamInputs";
import VesselInputs from "./VesselInputs";

interface HardGoodsProps {
  arrangement: Arrangement;
}

const HardGoods: React.FC<HardGoodsProps> = ({ arrangement }) => {
  return (
    <Grid container rowSpacing={2}>
      <VesselInputs type={arrangement.vesselType} count={arrangement.vesselCount} cost={arrangement.vesselCost} />
      <FoamInputs count={arrangement.foamCount} />
      <CardHolderInputs cardHolder={arrangement.cardHolder} />
    </Grid>
  );
};

export default HardGoods;
