import ReactFlow, { Background, Controls } from "reactflow";
import { motion } from "framer-motion";
function LandingPageGraphComponent() {
  const initialNodes = [
    { id: "1", data: { label: "Project Idea" }, position: { x: 250, y: 5 } },
    { id: "2", data: { label: "Frontend" }, position: { x: 100, y: 150 } },
    { id: "3", data: { label: "Backend" }, position: { x: 400, y: 150 } },
    { id: "4", data: { label: "React" }, position: { x: 50, y: 250 } },
    { id: "5", data: { label: "Node.js" }, position: { x: 350, y: 250 } },
    { id: "6", data: { label: "Database" }, position: { x: 500, y: 250 } },
  ];

  const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "1", target: "3" },
    { id: "e2-4", source: "2", target: "4" },
    { id: "e3-5", source: "3", target: "5" },
    { id: "e3-6", source: "3", target: "6" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="w-96 h-60 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300"
    >
      <ReactFlow nodes={initialNodes} edges={initialEdges}>
        <Background />
        <Controls />
      </ReactFlow>
    </motion.div>
  );
}
export default LandingPageGraphComponent;