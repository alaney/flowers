import { Box, Container, Tab, Tabs } from "@mui/material";
import { useEffect } from "react";
import { Link, matchPath, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import ArrangementsContainer from "./features/arrangements/ArrangementsContainer";
import FlowersContainer from "./features/flowers/FlowersContainer";
import { getFlowersAsync } from "./features/flowers/flowersSlice";

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function App() {
  const routeMatch = useRouteMatch(["/arrangements/*", "/flowers"]);
  const currentTab = routeMatch?.pattern?.path;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFlowersAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <nav className="noprint" style={{ width: "100%", height: "4rem" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={currentTab} centered={true}>
            <Tab label="Flowers" value="/flowers" to="/flowers" component={Link} />
            <Tab label="Arrangements" value="/arrangements/*" to="/arrangements" component={Link} />
          </Tabs>
        </Box>
      </nav>
      <Container>
        <Routes>
          <Route index path="/arrangements/*" element={<ArrangementsContainer />}></Route>
          <Route path="/flowers" element={<FlowersContainer />}></Route>
          <Route path="*" element={<Navigate to="/arrangements" replace />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
