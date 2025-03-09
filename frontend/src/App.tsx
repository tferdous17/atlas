import { Routes, Route } from "react-router";
import "reactflow/dist/style.css";
import LandingPage from "./pages/LandingPage";
import GraphPage from "./pages/GraphPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<MainPage />} />
        <Route path="/graph" element={<GraphPage />} />
      </Routes>
    </>
  );
}

export default App;
