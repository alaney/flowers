import Container from "@mui/material/Container"
import "./App.css"
import Arrangements from "./features/arrangements/Arrangements"

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Arrangements />
      </Container>
    </div>
  )
}

export default App
