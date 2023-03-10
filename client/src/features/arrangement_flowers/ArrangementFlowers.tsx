import { Autocomplete, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { ArrangementFlower } from "../../types/Types";
import AddIcon from "@mui/icons-material/AddCircleSharp";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import cloneDeep from "lodash.clonedeep";
import { Controller, ControllerRenderProps, useFieldArray, useFormContext } from "react-hook-form";
import { ArrangementUpdates } from "../arrangements/ArrangementDetails2";
import { decimalNumberRegex } from "../../app/utils";

interface FlowerOption {
  name: string;
  id: number;
  pricePerStem: number;
}
interface ArrangementFlowersProps {
  category: string;
}

const ArrangementFlowers: React.FC<ArrangementFlowersProps> = ({ category }) => {
  const allFlowers = useSelector((state: RootState) => state.flowers.value);

  const { control } = useFormContext<ArrangementUpdates>();
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

  const onFlowerNameUpdate = (
    af: ArrangementFlower,
    flowerOption: FlowerOption | null,
    field: ControllerRenderProps<ArrangementUpdates, any>
  ) => {
    if (flowerOption) {
      const oldAf = cloneDeep(af);
      const theFlower = allFlowers.find((a) => a.id === flowerOption.id);
      if (theFlower) {
        const newAf: ArrangementFlower = {
          ...oldAf,
          id: theFlower.id,
          name: theFlower.name,
          pricePerStem: theFlower.pricePerStem,
        };
        field.onChange(newAf);
      }
    }
  };

  const isFlowerOptionEqual = (option: FlowerOption, value: FlowerOption) => {
    return option.id === value.id;
  };

  return (
    <>
      {fields.map((af: any, index) => (
        <Grid key={af.id} container item spacing={2} alignItems="center">
          <Grid item md={6} sm={6} xs={6}>
            <Controller
              name={`flowers.${category}.${index}` as any}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  disablePortal
                  id={"flower-name-" + category + af.id}
                  getOptionLabel={(o) => o.name}
                  options={allFlowers.map((f) => ({ name: f.name, id: f.id, pricePerStem: f.pricePerStem }))}
                  renderInput={(params) => <TextField {...params} label="Name" size="small" />}
                  onChange={(e, v) => onFlowerNameUpdate(af, v, field)}
                  isOptionEqualToValue={isFlowerOptionEqual}
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
