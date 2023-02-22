import { Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField/TextField";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import ArrangementFlowersContainer from "../arrangement_flowers/ArrangementFlowersContainer";
import { initialState, setArrangement, updateArrangementAsync } from "./arrangementDetailsSlice";
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

  useEffect(() => {
    const a = arrangements.find((a) => a.id === Number(id));
    if (a) {
      dispatch(setArrangement(a));
    } else if (id === "new") {
      dispatch(setArrangement({ ...initialState.value }));
    }
  }, [id, arrangements, dispatch]);

  const onSave = async () => {
    await dispatch(updateArrangementAsync(selectedArrangement));
    await dispatch(getArrangementsAsync());
  };

  if (selectedArrangement.id === -1 && id !== "new") return null;

  return (
    <>
      <TextField
        style={{ marginBottom: 16 }}
        variant="standard"
        value={selectedArrangement.name}
        inputProps={{ style: { fontSize: 32 } }}
      ></TextField>
      <Typography variant="h6" component="h2">
        Hard Goods
      </Typography>
      <Divider />
      <div style={{ margin: "16px 0" }}>
        <HardGoods arrangement={selectedArrangement} />
      </div>
      <Typography variant="h6" component="h2">
        Flowers
      </Typography>
      <Divider />
      <div style={{ margin: "16px 0" }}>
        <ArrangementFlowersContainer flowers={selectedArrangement.flowers} />
      </div>
      <div
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
        <Button style={{ marginLeft: 8 }} variant="contained" onClick={onSave} color="success">
          Save
        </Button>
      </div>
    </>
  );
};

export default ArrangementDetails;
