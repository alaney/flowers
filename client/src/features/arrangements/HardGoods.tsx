import { Grid } from "@mui/material";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Arrangement } from "../../types/Types";
import CardHolderInputs from "./CardHolderInputs";
import FoamInputs from "./FoamInputs";
import VesselInputs from "./VesselInputs";

interface HardGoodsProps {
  arrangement: Arrangement;
  control: Control<
    {
      name: string;
      vesselType: string;
    },
    any
  >;
  errors: FieldErrors<{
    name: string;
    vesselType: string;
  }>;
}

const HardGoods: React.FC<HardGoodsProps> = ({ arrangement, control, errors }) => {
  return (
    <Grid container rowSpacing={2}>
      <VesselInputs
        control={control}
        errors={errors}
        type={arrangement.vesselType}
        count={arrangement.vesselCount}
        cost={arrangement.vesselCost}
      />
      <FoamInputs count={arrangement.foamCount} />
      <CardHolderInputs cardHolder={arrangement.cardHolder} />
    </Grid>
  );
};

export default HardGoods;
