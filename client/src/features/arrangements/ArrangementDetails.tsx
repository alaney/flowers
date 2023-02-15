import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import ArrangementFlowersContainer from "../arrangement_flowers/ArrangementFlowersContainer";
import { setArrangement } from "./arrangementDetailsSlice";
import HardGoods from "./HardGoods";

interface ArrangementDetailsProps {}

const ArrangementDetails: React.FC<ArrangementDetailsProps> = () => {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const arrangements = useSelector((state: RootState) => state.arrangements.value);
  const selectedArrangement = useSelector((state: RootState) => state.arrangementDetails.value);
  // const [arrangement, setArrangement] = useState<Arrangement | undefined>(undefined);

  useEffect(() => {
    const a = arrangements.find((a) => a.id === Number(id));
    if (a) {
      dispatch(setArrangement(a));
    }
  }, [id, arrangements, dispatch]);

  if (selectedArrangement.id === -1) return null;

  return (
    <>
      <Typography variant="h5" component="h1" marginBottom={2}>
        {selectedArrangement.name}
      </Typography>
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
    </>
  );
};

export default ArrangementDetails;
