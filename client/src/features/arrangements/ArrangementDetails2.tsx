import { Button, Divider, Grid, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import { ArrangementSubtotals, calculateSubtotals, formatDollar } from "../../app/utils";
import { Arrangement, ArrangementFlower, HardGood } from "../../types/Types";
import ArrangementFlowersContainer from "../arrangement_flowers/ArrangementFlowersContainer";
import Subtotal from "../Subtotal/Subtotal";
import HardGoods from "./HardGoods";

interface ArrangementDetailsProps {}
export interface ArrangementUpdates {
  name: string;
  vesselType: string;
  vesselCount: number;
  vesselCost: number;
  foamCount: number;
  cardHolder: boolean;
  hardGoods: HardGood[];
  flowers: {
    base: Required<ArrangementFlower>[];
    primary: ArrangementFlower[];
    filler: ArrangementFlower[];
    bits: ArrangementFlower[];
  };
}

const initialArrangement: Arrangement = {
  id: -1,
  name: "",
  vesselType: "",
  vesselCount: 0,
  vesselCost: 0,
  foamCount: 0,
  cardHolder: false,
  venmo: false,
  paypal: false,
  done: false,
  json: "",
  flowers: [],
  hardGoods: [],
};

const ArrangementDetails: React.FC<ArrangementDetailsProps> = () => {
  const { id: paramId } = useParams();
  const theme = useTheme();
  const [arrangement, setArrangement] = useState(initialArrangement);
  const arrangements = useSelector((state: RootState) => state.arrangements.value);
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [subTotals, setSubTotals] = useState<ArrangementSubtotals>({
    flowersSubtotal: 0,
    hardGoodsSubtotal: 0,
    laborSubtotal: 0,
    taxSubtotal: 0,
    taxTotal: 0,
    venmoTotal: 0,
    venmoSubtotal: 0,
    paypalSubtotal: 0,
    paypalTotal: 0,
  });

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<ArrangementUpdates>({
    defaultValues: {
      name: arrangement.name,
      vesselType: arrangement.vesselType,
      foamCount: arrangement.foamCount,
      vesselCost: arrangement.vesselCost,
      cardHolder: arrangement.cardHolder,
      hardGoods: arrangement.hardGoods,
      flowers: {
        base: arrangement.flowers.filter((f) => f.category === "base"),
        primary: arrangement.flowers.filter((f) => f.category === "primary"),
        filler: arrangement.flowers.filter((f) => f.category === "filler"),
        bits: arrangement.flowers.filter((f) => f.category === "bits"),
      },
    },
  });

  const watchAllFields = watch();

  useEffect(() => {
    const subscription = watch((value) => {
      const hg = value.hardGoods as HardGood[];
      const combinedFlowers: ArrangementFlower[] = [
        ...(value.flowers?.base as any),
        ...(value.flowers?.primary as any),
        ...(value.flowers?.bits as any),
        ...(value.flowers?.filler as any),
      ];
      setSubTotals(
        calculateSubtotals({
          ...arrangement,
          flowers: combinedFlowers,
          hardGoods: hg,
          foamCount: Number(value.foamCount || 0),
          vesselCount: Number(value.vesselCount || 0),
          vesselCost: Number(value.vesselCost || 0),
          cardHolder: !!value.cardHolder,
        })
      );
    });
    return () => subscription.unsubscribe();
  }, [watchAllFields]);

  useEffect(() => {
    setSubTotals(calculateSubtotals(arrangement));
    reset({
      name: arrangement.name,
      vesselType: arrangement.vesselType,
      foamCount: arrangement.foamCount,
      vesselCount: arrangement.vesselCount,
      cardHolder: arrangement.cardHolder,
      hardGoods: arrangement.hardGoods,
      flowers: {
        base: arrangement.flowers.filter((f) => f.category === "base"),
        primary: arrangement.flowers.filter((f) => f.category === "primary"),
        filler: arrangement.flowers.filter((f) => f.category === "filler"),
        bits: arrangement.flowers.filter((f) => f.category === "bits"),
      },
    });
  }, [arrangement, reset]);

  useEffect(() => {
    const a = arrangements.find((a) => a.id === Number(paramId));
    if (a) {
      setArrangement(a);
    } else if (paramId === "new") {
      setArrangement({ ...initialArrangement });
    }
  }, [paramId, arrangements]);

  const onSave: SubmitHandler<ArrangementUpdates> = async (arrangementUpdates) => {
    console.log(arrangementUpdates);
  };

  if (arrangement.id === -1 && paramId !== "new") return null;

  return (
    <div style={{ marginBottom: 56 }}>
      <form onSubmit={handleSubmit(onSave)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              style={{ marginBottom: 16 }}
              variant="standard"
              error={!!errors.name}
              inputProps={{ style: { fontSize: 32 } }}
              {...field}
            />
          )}
        />
        <Typography variant="h6" component="h2">
          Hard Goods
        </Typography>
        <Divider />
        <div style={{ margin: "16px 0" }}>
          <HardGoods control={control} errors={errors} />
        </div>
        <Typography variant="h6" component="h2">
          Flowers
        </Typography>
        <Divider />
        <div style={{ margin: "16px 0" }}>
          <ArrangementFlowersContainer control={control} errors={errors} />
        </div>
        <Typography variant="h6" component="h2">
          Numberidoos
        </Typography>
        <Divider />
        <div style={{ margin: "16px 0" }}>
          <Subtotal subtotals={subTotals} />
        </div>
        <div
          className="noprint"
          style={{
            position: "fixed",
            bottom: 0,
            left: matches ? "unset" : 0,
            backgroundColor: "white",
            width: matches ? "-webkit-fill-available" : "100vw",
            paddingBottom: 8,
            zIndex: 1,
          }}
        >
          <Divider style={{ margin: " 0 0 8px" }} />
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Button style={{ marginLeft: 8 }} variant="contained" color="success" type="submit">
                Save
              </Button>
            </Grid>
            <Grid item xs={3}>
              <div>{`$ ${formatDollar(subTotals.taxTotal)}`}</div>
            </Grid>
            <Grid item xs={3}>
              <div>{`$ ${formatDollar(subTotals.venmoTotal)}`}</div>
            </Grid>
            <Grid item xs={3}>
              <div>{`$ ${formatDollar(subTotals.paypalTotal)}`}</div>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
};

export default ArrangementDetails;
