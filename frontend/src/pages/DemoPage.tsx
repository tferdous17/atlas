import GraphComponent from "@/components/GraphComponent";
import "@xyflow/react/dist/style.css";
import { initialEdges, initialNodes } from "@/utils/mockdata";
const DemoPage = () => {
  return (
    <div className="h-screen w-screen">
      <GraphComponent dataNodes={initialNodes} dataEdges={initialEdges} />
    </div>
  );
};

export default DemoPage;
