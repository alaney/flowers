import { Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import { ArrangementFlower } from "../../types/Types";
import AddIcon from "@mui/icons-material/AddCircleSharp";
import { useAppDispatch } from "../../app/hooks";
import { addNewFlower } from "../arrangements/arrangementDetailsSlice";

interface ArrangementFlowersProps {
  flowers: ArrangementFlower[];
}

const ArrangementFlowers: React.FC<ArrangementFlowersProps> = ({ flowers }) => {
  const dispatch = useAppDispatch();
  const addFlower = () => {
    dispatch(addNewFlower("base"));
  };

  return (
    <>
      {flowers.map((f) => (
        <Grid key={f.id} container item md={12} sm={12} xs={12} spacing={2}>
          <Grid item>
            <TextField size="small" value={f.name} label="Name"></TextField>
          </Grid>
          <Grid item>
            <TextField size="small" value={f.count} type="number" label="Quantity"></TextField>
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
