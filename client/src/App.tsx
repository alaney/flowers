import { Box, Tab, Tabs } from "@mui/material";
import { Link, matchPath, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import ArrangementsContainer from "./features/arrangements/ArrangementsContainer";
import FlowersContainer from "./features/flowers/FlowersContainer";

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    // console.log(pattern);
    const possibleMatch = matchPath(pattern, pathname);
    // console.log(possibleMatch);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function App() {
  const routeMatch = useRouteMatch(["/arrangements*", "/flowers"]);
  const currentTab = routeMatch?.pattern?.path;

  console.log("App");
  return (
    <div className="App">
      <nav style={{ width: "100%", height: "4rem" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={currentTab}>
            <Tab label="Flowers" value="/flowers" to="/flowers" component={Link} />
            <Tab label="Arrangements" value="/arrangements*" to="/arrangements" component={Link} />
          </Tabs>
        </Box>
      </nav>
      <Routes>
        <Route path="/arrangements/*" element={<ArrangementsContainer />}></Route>
        <Route path="/flowers" element={<FlowersContainer />}></Route>
      </Routes>
    </div>
  );
}

export default App;
