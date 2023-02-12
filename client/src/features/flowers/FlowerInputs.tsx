import { Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Flower } from "../../types/Types";
import SaveIcon from "@mui/icons-material/Done";
import UndoIcon from "@mui/icons-material/Undo";
import { useAppDispatch } from "../../app/hooks";
import { updateFlowerAsync } from "./flowersSlice";
import cloneDeep from "lodash.clonedeep";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface FlowerInputsProps {
  flower: Flower;
}

interface FlowerInput {
  name: string;
  price: string;
  count: number;
}

const FlowerInputs: React.FC<FlowerInputsProps> = ({ flower }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<FlowerInput>({
    defaultValues: {
      name: flower.name,
      price: flower.pricePerBundle.toString(),
      count: flower.stemCount,
    },
  });
  const [status, setStatus] = useState("idle");
  const [hasUpdates, setHasUpdates] = useState(false);
  const dispatch = useAppDispatch();

  const onSave: SubmitHandler<FlowerInput> = async (flowerUpdate) => {
    setStatus("loading");
    const p = await dispatch(
      updateFlowerAsync({
        ...cloneDeep(flower),
        name: flowerUpdate.name,
        pricePerBundle: Number(flowerUpdate.price),
        stemCount: flowerUpdate.count,
      })
    );
    if (p.meta.requestStatus === "rejected") {
      setStatus("failed");
    } else {
      setHasUpdates(false);
      setStatus("idle");
    }
  };

  const onUndo = () => {
    setHasUpdates(false);
    setStatus("idle");
  };

  return (
    <Grid item container sm={12} md={12}>
      <form onSubmit={handleSubmit(onSave)} style={{ width: "100%" }}>
        <Grid item container spacing={2} alignItems="center" sm={12} md={12}>
          <Grid item sm={2} md={2}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  size="small"
                  error={!!errors.name}
                  helperText={errors.name && "Must provide a value"}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item sm={2} md={2}>
            <Controller
              name="price"
              control={control}
              rules={{ required: true, pattern: /^\d+(\.\d+)?$/ }}
              render={({ field }) => (
                <TextField
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  size="small"
                  error={!!errors.name}
                  helperText={errors.name && "Must provide a value"}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item sm={2} md={2}>
            <Controller
              name="count"
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <TextField
                  size="small"
                  error={!!errors.name}
                  helperText={errors.name && "Must provide a value"}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item sm={2} md={2}>
            <Typography>{`$ ${flower.pricePerStem}`}</Typography>
          </Grid>
          {status === "failed" && (
            <Grid item sm={1} md={1}>
              <Typography>Failed!</Typography>
            </Grid>
          )}
          {status === "loading" && (
            <Grid item sm={1} md={1}>
              <Typography>Saving...</Typography>
            </Grid>
          )}
          {isDirty && (
            <Grid item sm={1} md={1}>
              <IconButton type="submit">
                <SaveIcon color="success" />
              </IconButton>
              <IconButton onClick={onUndo}>
                <UndoIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </form>
    </Grid>
  );
};

export default FlowerInputs;
