import { Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import React from "react";
import { HardGood } from "../../types/Types";
import AddIcon from "@mui/icons-material/AddCircleSharp";
import TextField from "@mui/material/TextField";
import { addNewHardGood } from "./arrangementDetailsSlice";
import { useAppDispatch } from "../../app/hooks";

interface MiscellaneousHardGoodsProps {
  miscellaneousHardGoods: HardGood[];
}

const MiscellaneousHardGoods: React.FC<MiscellaneousHardGoodsProps> = ({ miscellaneousHardGoods }) => {
  const dispatch = useAppDispatch();
  const addHardGood = () => {
    dispatch(addNewHardGood());
  };

  return (
    <Grid item container spacing={2} alignItems="flex-start">
      <Grid item xs={3} sm={2}>
        <Typography variant="button">Misc</Typography>
      </Grid>
      <Grid container item xs={9} rowSpacing={2}>
        {miscellaneousHardGoods.map((hg) => (
          <Grid key={hg.id} container item spacing={2} alignItems="center">
            <Grid item sm={5} xs={8}>
              <TextField fullWidth label="Name" size="small" />
            </Grid>
            <Grid item sm={3} xs={4}>
              <TextField
                size="small"
                label="Cost"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
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
