import { Button, Checkbox, Divider, Grid, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ArrangementSubtotals, calculateSubtotals, formatDollar } from "../../app/utils";
import { Arrangement, ArrangementFlower, HardGood } from "../../types/Types";
import ArrangementFlowersContainer from "../arrangement_flowers/ArrangementFlowersContainer";
import Subtotal from "../Subtotal/Subtotal";
import { patchArrangement, postArrangement } from "./arrangementDetailsApi";
import { getArrangementsAsync } from "./arrangementsSlice";
import HardGoods from "./HardGoods";

interface ArrangementDetailsProps {}
export interface ArrangementUpdates {
  name: string;
  done: boolean;
  vesselType: string;
  vesselCount: number;
  vesselCost: number;
  foamCount: number;
  cardHolder: boolean;
  hardGoods: HardGood[];
  flowers: {
    base: ArrangementFlower[];
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
      vesselCount: arrangement.vesselCount,
      foamCount: arrangement.foamCount,
      vesselCost: arrangement.vesselCost,
      cardHolder: arrangement.cardHolder,
      hardGoods: arrangement.hardGoods,
      done: arrangement.done,
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
      done: arrangement.done,
      vesselType: arrangement.vesselType,
      foamCount: arrangement.foamCount,
      vesselCost: arrangement.vesselCost,
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
    const mapper = (b: ArrangementFlower) => ({
      id: b.id,
      name: b.name,
      count: Number(b.count),
      pricePerStem: Number(b.pricePerStem),
      category: b.category,
      priceOverride: b.priceOverride,
    });
    const base = arrangementUpdates.flowers?.base.map<ArrangementFlower>(mapper);
    const primary = arrangementUpdates.flowers?.primary.map<ArrangementFlower>(mapper);
    const bits = arrangementUpdates.flowers?.bits.map<ArrangementFlower>(mapper);
    const filler = arrangementUpdates.flowers?.filler.map<ArrangementFlower>(mapper);

    const combinedFlowers: ArrangementFlower[] = [...base, ...primary, ...filler, ...bits];
    const hgs = arrangementUpdates.hardGoods.map<HardGood>((h) => ({
      id: h.id,
      price: Number(h.price),
      name: h.name,
    }));
    if (arrangement.id === -1 || paramId === "new") {
      try {
        const newArr = await postArrangement({
          ...arrangement,
          ...arrangementUpdates,
          flowers: combinedFlowers,
          hardGoods: hgs,
          foamCount: Number(arrangementUpdates.foamCount),
          vesselCount: Number(arrangementUpdates.vesselCount),
          vesselCost: Number(arrangementUpdates.vesselCost),
          cardHolder: arrangementUpdates.cardHolder,
        });
        const id = newArr.id;
        navigate("/arrangements/" + id, { replace: true });
        await dispatch(getArrangementsAsync());
      } catch {
        alert("error");
      }
    } else {
      try {
        await patchArrangement({
          ...arrangement,
          ...arrangementUpdates,
          flowers: combinedFlowers,
          hardGoods: arrangementUpdates.hardGoods,
          foamCount: Number(arrangementUpdates.foamCount),
          vesselCount: Number(arrangementUpdates.vesselCount),
          vesselCost: Number(arrangementUpdates.vesselCost),
          cardHolder: arrangementUpdates.cardHolder,
        });
        await dispatch(getArrangementsAsync());
      } catch {
        alert("error");
      }
    }
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
              autoFocus
              placeholder="Arrangement Name"
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
            {/* <Grid item xs={3}>
              <Controller
                name="done"
                control={control}
                render={({ field: props }) => {
                  return (
                    <Checkbox {...props} checked={props.value} onChange={(e) => props.onChange(e.target.checked)} />
                  );
                }}
              />
            </Grid> */}
            <Grid item xs={2}>
              <div>{`$ ${formatDollar(subTotals.taxTotal)}`}</div>
            </Grid>
            <Grid item xs={2}>
              <div>{`$ ${formatDollar(subTotals.venmoTotal)}`}</div>
            </Grid>
            <Grid item xs={2}>
              <div>{`$ ${formatDollar(subTotals.paypalTotal)}`}</div>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
};

export default ArrangementDetails;
