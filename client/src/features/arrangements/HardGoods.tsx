import { Grid } from "@mui/material";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Arrangement } from "../../types/Types";
import { ArrangementUpdates } from "./ArrangementDetails";
import CardHolderInputs from "./CardHolderInputs";
import FoamInputs from "./FoamInputs";
import MiscellaneousHardGoods from "./MiscellaneousHardGoods";
import VesselInputs from "./VesselInputs";

interface HardGoodsProps {
  arrangement: Arrangement;
  control: Control<ArrangementUpdates, any>;
  errors: FieldErrors<ArrangementUpdates>;
}

const HardGoods: React.FC<HardGoodsProps> = ({ control, errors, arrangement }) => {
  return (
    <Grid container rowSpacing={2}>
      <VesselInputs control={control} errors={errors} />
      <FoamInputs control={control} errors={errors} />
      <CardHolderInputs key={control._formValues["cardHolder"]} control={control} />
      <MiscellaneousHardGoods miscellaneousHardGoods={arrangement.hardGoods} />
    </Grid>
  );
};

export default HardGoods;
