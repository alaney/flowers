import { Route, Routes } from "react-router-dom"
import "./App.css"
import ArrangementsContainer from "./features/arrangements/ArrangementsContainer"
import FlowersContainer from "./features/flowers/FlowersContainer"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/arrangements/*" element={<ArrangementsContainer />}></Route>
        <Route path="/flowers" element={<FlowersContainer />}></Route>
      </Routes>
    </div>
  )
}

export default App
