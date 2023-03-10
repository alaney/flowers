import { Grid, IconButton, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { Flower } from "../../types/Types";
import SaveIcon from "@mui/icons-material/Done";
import UndoIcon from "@mui/icons-material/Undo";
import { useAppDispatch } from "../../app/hooks";
import { createFlowerAsync, updateFlowerAsync } from "./flowersSlice";
import cloneDeep from "lodash.clonedeep";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { decimalNumberRegex, formatDollar } from "../../app/utils";

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
    reset,
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FlowerInput>({
    defaultValues: {
      name: flower.name,
      price: formatDollar(flower.pricePerBundle),
      count: flower.stemCount,
    },
  });
  const [status, setStatus] = useState("idle");
  const [editing, setEditing] = useState(flower.id < 0);
  const dispatch = useAppDispatch();

  const onSave: SubmitHandler<FlowerInput> = async (flowerUpdate) => {
    setStatus("loading");
    if (flower.id < 0) {
      const p = await dispatch(
        createFlowerAsync({
          ...cloneDeep(flower),
          name: flowerUpdate.name,
          pricePerBundle: Number(flowerUpdate.price),
          stemCount: Number(flowerUpdate.count),
        })
      );
      if (p.meta.requestStatus === "rejected") {
        setStatus("failed");
      } else {
        reset(flowerUpdate);
        setEditing(false);
      }
    } else {
      const p = await dispatch(
        updateFlowerAsync({
          ...cloneDeep(flower),
          name: flowerUpdate.name,
          pricePerBundle: Number(flowerUpdate.price),
          stemCount: Number(flowerUpdate.count),
        })
      );
      if (p.meta.requestStatus === "rejected") {
        setStatus("failed");
      } else {
        reset(flowerUpdate);
        setEditing(false);
      }
    }
  };

  return (
    <Grid
      item
      container
      sm={12}
      onClick={() => setEditing(true)}
      style={{ cursor: editing ? "default" : "pointer", minHeight: 56 }}
    >
      <form onSubmit={handleSubmit(onSave)} style={{ width: "100%" }}>
        <Grid item container spacing={1} alignItems="center" sm={12}>
          <Grid item sm={3} xs={3}>
            {editing ? (
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextField size="small" error={!!errors.name} {...field} />}
              />
            ) : (
              <Tooltip title={flower.name} enterDelay={1000} enterNextDelay={1000} id={flower.id + "tooltip"}>
                <Typography style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                  {flower.name}
                </Typography>
              </Tooltip>
            )}
          </Grid>
          <Grid item md={2} sm={3} xs={3}>
            {editing ? (
              <Controller
                name="price"
                control={control}
                rules={{ required: true, pattern: decimalNumberRegex }}
                render={({ field }) => (
                  <TextField
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    inputProps={{
                      style: { textAlign: "end" },
                    }}
                    size="small"
                    error={!!errors.price}
                    {...field}
                  />
                )}
              />
            ) : (
              <Typography style={{ textAlign: "right" }}>{`$ ${formatDollar(flower.pricePerBundle)}`}</Typography>
            )}
          </Grid>
          <Grid item md={1} sm={3} xs={3}>
            {editing ? (
              <Controller
                name="count"
                control={control}
                rules={{ required: true, pattern: /^[0-9]*$/ }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors.count}
                    inputProps={{
                      style: { textAlign: "end" },
                    }}
                  />
                )}
              />
            ) : (
              <Typography style={{ textAlign: "right" }}>{flower.stemCount}</Typography>
            )}
          </Grid>
          <Grid item md={2} sm={3} xs={3}>
            <Typography style={{ textAlign: "right" }}>{`$ ${formatDollar(flower.pricePerStem)}`}</Typography>
          </Grid>
          {status === "failed" && (
            <Grid item sm={2} md={1}>
              <Typography>Failed!</Typography>
            </Grid>
          )}
          {isSubmitting && (
            <Grid item sm={2} md={1}>
              <Typography>Saving...</Typography>
            </Grid>
          )}
          {isDirty && !isSubmitting && (
            <Grid item sm={2} md={2}>
              <IconButton type="submit">
                <SaveIcon color="success" />
              </IconButton>
              <IconButton onClick={() => reset()}>
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
