import { Routes, Route } from "react-router";
import "reactflow/dist/style.css";
import LandingPage from "./pages/LandingPage";
import DemoPage from "./pages/DemoPage";
import MainPage from "./pages/MainPage";
import { SidebarProvider } from "./components/ui/sidebar.tsx";

function App() {
  return (
    <>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<MainPage />} />
          <Route path="/flux" element={<DemoPage />} />
        </Routes>
      </SidebarProvider>
    </>
  );
}

export default App;
