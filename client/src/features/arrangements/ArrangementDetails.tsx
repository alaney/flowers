import { Typography, Button, useMediaQuery, useTheme, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField/TextField";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { calculateSubtotals, formatDollar } from "../../app/utils";
import ArrangementFlowersContainer from "../arrangement_flowers/ArrangementFlowersContainer";
import Subtotal from "../Subtotal/Subtotal";
import {
  createArrangementAsync,
  initialState,
  setArrangement,
  updateArrangementAsync,
} from "./arrangementDetailsSlice";
import { getArrangementsAsync } from "./arrangementsSlice";
import HardGoods from "./HardGoods";

interface ArrangementDetailsProps {}

const ArrangementDetails: React.FC<ArrangementDetailsProps> = () => {
  let { id } = useParams();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const arrangements = useSelector((state: RootState) => state.arrangements.value);
  const selectedArrangement = useSelector((state: RootState) => state.arrangementDetails.value);
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [subTotals, setSubTotals] = useState({
    taxTotal: 0,
    venmoTotal: 0,
    paypalTotal: 0,
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<{ name: string; vesselType: string }>({
    defaultValues: {
      name: selectedArrangement.name,
      vesselType: selectedArrangement.vesselType,
    },
  });

  useEffect(() => {
    const a = arrangements.find((a) => a.id === Number(id));
    if (a) {
      dispatch(setArrangement(a));
    } else if (id === "new") {
      dispatch(setArrangement({ ...initialState.value }));
    }
  }, [id, arrangements, dispatch]);

  useEffect(() => {
    setSubTotals(calculateSubtotals(selectedArrangement));
    reset({ name: selectedArrangement.name, vesselType: selectedArrangement.vesselType });
  }, [selectedArrangement, reset]);

  const onSave: SubmitHandler<{ name: string; vesselType: string }> = async (arrangementUpdates) => {
    if (selectedArrangement.id === -1 || id === "new") {
      await dispatch(
        createArrangementAsync({
          ...selectedArrangement,
          name: arrangementUpdates.name,
          vesselType: arrangementUpdates.vesselType,
        })
      );
    } else {
      await dispatch(
        updateArrangementAsync({
          ...selectedArrangement,
          name: arrangementUpdates.name,
          vesselType: arrangementUpdates.vesselType,
        })
      );
    }
    await dispatch(getArrangementsAsync());
  };

  if (selectedArrangement.id === -1 && id !== "new") return null;

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
          <HardGoods arrangement={selectedArrangement} control={control} errors={errors} />
        </div>
        <Typography variant="h6" component="h2">
          Flowers
        </Typography>
        <Divider />
        <div style={{ margin: "16px 0" }}>
          <ArrangementFlowersContainer flowers={selectedArrangement.flowers} />
        </div>

        <Typography variant="h6" component="h2">
          Numberidoos
        </Typography>
        <Divider />
        <div style={{ margin: "16px 0" }}>
          <Subtotal arrangement={selectedArrangement} />
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
