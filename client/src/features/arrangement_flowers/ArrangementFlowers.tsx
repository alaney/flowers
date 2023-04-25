import { Autocomplete, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/AddCircleSharp";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { ArrangementUpdates } from "../arrangements/ArrangementDetails2";
import { decimalNumberRegex, formatDollar } from "../../app/utils";

interface ArrangementFlowersProps {
  category: string;
}

const ArrangementFlowers: React.FC<ArrangementFlowersProps> = ({ category }) => {
  const allFlowers = useSelector((state: RootState) => state.flowers.value);

  const { control, setValue } = useFormContext<ArrangementUpdates>();
  const { fields, append } = useFieldArray({
    control,
    name: ("flowers." + category) as any,
  });

  const addFlower = () => {
    append({
      id: (fields.length + 1) * -1,
      name: "",
      count: 1,
      pricePerStem: 0,
      category,
    });
  };

  const onFlowerNameUpdate = (index: number, flowerOption: string | null) => {
    if (flowerOption) {
      const theFlower = allFlowers.find((a) => a.name === flowerOption);
      if (theFlower) {
        setValue(`flowers.${category}.${index}.name` as any, flowerOption);
        setValue(`flowers.${category}.${index}.id` as any, theFlower.id);
        setValue(`flowers.${category}.${index}.pricePerStem` as any, theFlower.pricePerStem);
      }
    }
  };

  return (
    <>
      {fields.map((af: any, index) => (
        <Grid key={af.id} container item spacing={2} alignItems="center">
          <Grid item md={6} sm={6} xs={6}>
            <Controller
              name={`flowers.${category}.${index}.name` as any}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  disablePortal
                  id={"flower-name-" + category + af.id}
                  options={allFlowers.map((f) => f.name)}
                  renderInput={(params) => <TextField {...params} label="Name" size="small" />}
                  onChange={(_e, v) => onFlowerNameUpdate(index, v)}
                />
              )}
            />
          </Grid>
          <Grid item md={3} sm={3} xs={3}>
            <Controller
              name={`flowers.${category}.${index}.count` as any}
              rules={{ required: false, pattern: decimalNumberRegex }}
              control={control}
              render={({ field }) => <TextField {...field} size="small" label="Quantity" />}
            />
          </Grid>
          <Grid item md={3} sm={3} xs={3}>
            <Controller
              rules={{ required: false, pattern: decimalNumberRegex }}
              name={`flowers.${category}.${index}.priceOverride` as any}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  label="Cost Override"
                  placeholder={formatDollar(af.pricePerStem)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item>
        <IconButton onClick={addFlower}>
          <AddIcon />
        </IconButton>
      </Grid>
    </>
  );
};

export default ArrangementFlowers;
