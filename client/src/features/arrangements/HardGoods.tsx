import { Grid } from "@mui/material";
import React from "react";
import CardHolderInputs from "./CardHolderInputs";
import FoamInputs from "./FoamInputs";
import MiscellaneousHardGoods from "./MiscellaneousHardGoods";
import VesselInputs from "./VesselInputs";

interface HardGoodsProps {}

const HardGoods: React.FC<HardGoodsProps> = () => {
  return (
    <Grid container rowSpacing={2}>
      <VesselInputs />
      <FoamInputs />
      <CardHolderInputs />
      <MiscellaneousHardGoods />
    </Grid>
  );
};

export default HardGoods;
