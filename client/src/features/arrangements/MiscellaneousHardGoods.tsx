import { Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/AddCircleSharp";
import TextField from "@mui/material/TextField";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

interface MiscellaneousHardGoodsProps {}

const MiscellaneousHardGoods: React.FC<MiscellaneousHardGoodsProps> = () => {
  const { control } = useFormContext();

  const { fields, append } = useFieldArray({
    control,
    name: "hardGoods",
  });

  const addHardGood = () => {
    append({
      id: (fields.length + 1) * -1,
      name: "",
      price: 0,
    });
  };

  return (
    <Grid item container spacing={2} alignItems="flex-start">
      <Grid item xs={3} sm={2}>
        <Typography variant="button">Misc</Typography>
      </Grid>
      <Grid container item xs={9} rowSpacing={2}>
        {fields.map((hg, index) => (
          <Grid key={hg.id} container item spacing={2} alignItems="center">
            <Grid item sm={5} xs={8}>
              <Controller
                render={({ field }) => <TextField {...field} fullWidth label="Name" size="small" />}
                name={`hardGoods.${index}.name`}
                control={control}
              />
            </Grid>
            <Grid item sm={3} xs={4}>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    label="Cost"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                )}
                name={`hardGoods.${index}.price`}
                control={control}
              />
            </Grid>
          </Grid>
        ))}
        <Grid item>
          <IconButton onClick={addHardGood}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MiscellaneousHardGoods;
