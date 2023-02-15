import { Autocomplete, Grid, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import { ArrangementFlower } from "../../types/Types";
import AddIcon from "@mui/icons-material/AddCircleSharp";
import { useAppDispatch } from "../../app/hooks";
import { addNewFlower, updateFlower } from "../arrangements/arrangementDetailsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import cloneDeep from "lodash.clonedeep";

interface FlowerOption {
  label: string;
  id: number;
  pricePerStem: number;
}
interface ArrangementFlowersProps {
  arrangementFlowers: ArrangementFlower[];
  category: string;
}

const ArrangementFlowers: React.FC<ArrangementFlowersProps> = ({ arrangementFlowers, category }) => {
  const dispatch = useAppDispatch();
  const allFlowers = useSelector((state: RootState) => state.flowers.value);
  const addFlower = () => {
    dispatch(addNewFlower(category));
  };

  const onFlowerNameUpdate = (af: ArrangementFlower, flowerOption: FlowerOption | null) => {
    const oldAf = cloneDeep(af);
    if (flowerOption) {
      const newAf: ArrangementFlower = {
        ...oldAf,
        id: flowerOption.id,
        name: flowerOption.label,
        pricePerStem: flowerOption.pricePerStem,
      };
      dispatch(updateFlower({ old: oldAf, new: newAf }));
    }
  };

  const onCountUpdated = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, af: ArrangementFlower) => {
    const val = Number(event.target.value);
    const oldAf = cloneDeep(af);
    const newAf: ArrangementFlower = {
      ...oldAf,
      count: val,
    };
    dispatch(updateFlower({ old: oldAf, new: newAf }));
  };

  const isFlowerOptionEqual = (option: FlowerOption, value: FlowerOption) => {
    return option.id === value.id;
  };

  return (
    <>
      {arrangementFlowers.map((af) => (
        <Grid key={af.id} container item md={12} sm={12} xs={12} spacing={2} alignItems="center">
          <Grid item md={4} sm={4} xs={4}>
            <Autocomplete
              disablePortal
              id={"flower-name-" + af.id}
              value={{ label: af.name, id: af.id, pricePerStem: af.pricePerStem }}
              options={allFlowers.map((f) => ({ label: f.name, id: f.id, pricePerStem: f.pricePerStem }))}
              onChange={(_e, v) => onFlowerNameUpdate(af, v)}
              renderInput={(params) => <TextField {...params} label="Name" size="small" />}
              isOptionEqualToValue={isFlowerOptionEqual}
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={(e) => onCountUpdated(e, af)}
              size="small"
              value={af.count}
              type="number"
              label="Quantity"
              inputProps={{ min: "0" }}
            ></TextField>
          </Grid>
          <Grid item>
            <Typography>{`$ ${Math.round(af.pricePerStem * af.count * 100) / 100}`}</Typography>
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
