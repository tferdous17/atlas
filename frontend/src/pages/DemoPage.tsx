import GraphComponent from "@/components/GraphComponent";
import "@xyflow/react/dist/style.css";
import { initialEdges, initialNodes } from "@/utils/mockdata";
import AppSidebar from "@/components/ui/app-sidebar";
const DemoPage = () => {
  return (
    <div className="h-screen w-screen">
      <AppSidebar />
      <GraphComponent dataNodes={initialNodes} dataEdges={initialEdges} />
    </div>
  );
};

export default DemoPage;
