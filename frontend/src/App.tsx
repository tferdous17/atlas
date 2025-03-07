import "@xyflow/react/dist/style.css";
import FlowChart from "./components/FlowChart";

export default function App() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="border cyan w-1/5 h-1/5 bg-cyan-200  items-center flex justify-center">
        Hello World
      </div>
      <FlowChart />
    </div>
  );
}
