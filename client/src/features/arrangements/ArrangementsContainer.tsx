import { Button, Divider, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import ArrangementDetails from "./ArrangementDetails2";
import ArrangementsList from "./ArrangementsList";
import { getArrangementsAsync } from "./arrangementsSlice";

interface ArrangementsContainerProps {}

const ArrangementsContainer: React.FC<ArrangementsContainerProps> = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const arrangements = useSelector((state: RootState) => state.arrangements.value);
  const status = useSelector((state: RootState) => state.arrangements.status);
  const dispatch = useAppDispatch();
  const [filteredArrangements, setFilteredArrangements] = useState(arrangements);

  useEffect(() => {
    dispatch(getArrangementsAsync());
    // return () => dispatch(resetArrangementDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredArrangements(arrangements);
  }, [arrangements]);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Failed!</div>;
  }

  return matches ? (
    <>
      <Grid container>
        <Grid item xs={6} sm={3}>
          <Link to="/arrangements/new" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Add Arrangement
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Divider style={{ margin: 16 }} />
      <Grid container spacing={2}>
        <Grid item md={3}>
          <Routes>
            <Route path={"/*"} element={<ArrangementsList arrangements={filteredArrangements} />} />
          </Routes>
        </Grid>
        <Grid item md={9}>
          <Routes>
            <Route path={"/"} element={<ArrangementDetails />} />
            <Route path=":id" element={<ArrangementDetails />} />
          </Routes>
        </Grid>
      </Grid>
    </>
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Grid container>
              <Grid item xs={6} sm={3}>
                <Link to="/arrangements/new" style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="primary">
                    Add Arrangement
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Divider style={{ margin: 16 }} />
            <ArrangementsList arrangements={filteredArrangements} />
          </>
        }
      />
      <Route path="/:id" element={<ArrangementDetails />} />
    </Routes>
  );
};

export default ArrangementsContainer;
