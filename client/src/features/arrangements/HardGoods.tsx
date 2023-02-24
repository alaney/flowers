import { Grid } from "@mui/material";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { ArrangementUpdates } from "./ArrangementDetails2";
import CardHolderInputs from "./CardHolderInputs";
import FoamInputs from "./FoamInputs";
import MiscellaneousHardGoods from "./MiscellaneousHardGoods";
import VesselInputs from "./VesselInputs";

interface HardGoodsProps {
  control: Control<ArrangementUpdates, any>;
  errors: FieldErrors<ArrangementUpdates>;
}

const HardGoods: React.FC<HardGoodsProps> = ({ control, errors }) => {
  return (
    <Grid container rowSpacing={2}>
      <VesselInputs control={control} errors={errors} />
      <FoamInputs control={control} errors={errors} />
      <CardHolderInputs control={control} />
      <MiscellaneousHardGoods control={control} errors={errors} />
    </Grid>
  );
};

export default HardGoods;
