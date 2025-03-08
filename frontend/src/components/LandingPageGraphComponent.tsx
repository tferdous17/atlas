import React, { useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  Node,
  Edge,
  MarkerType,
  NodeTypes
} from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";

const RoadmapNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-3 h-3 rounded-full bg-blue-500 mb-2"></div>
      <div className="px-8 py-4 rounded-xl bg-white shadow-md text-gray-800 font-medium border-t-4 border-blue-500 text-center">
        {data.label}
      </div>
    </div>
  );
};

// Special node for the starting point
const StartNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-5 h-5 rounded-full bg-blue-600 mb-2 ring-4 ring-blue-200"></div>
      <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg text-white font-bold text-center">
        {data.label}
      </div>
    </div>
  );
};


function LandingPageGraphComponent() {
  // Define node types
  const nodeTypes: NodeTypes = useMemo(() => ({ 
    roadmap: RoadmapNode,
    start: StartNode
  }), []);
  
  const initialNodes: Node[] = [
    // Starting point
    { 
      id: "1", 
      type: "start",
      data: { 
        label: "Project Idea" 
      }, 
      position: { x: 20, y: 100 },
    },
    
    // First level branches
    { id: "2",  type: "roadmap",  data: { label: "Frontend" }, position: { x: 250, y: 20 } },
    { id: "3", type: "roadmap", data: { label: "Backend" }, position: { x: 250, y: 180 } },
    
    // Second level for Frontend branch
    { id: "4", type: "roadmap", data: { label: "React" }, position: { x: 450, y: -50 } },
    { id: "5", type: "roadmap", data: { label: "Tailwind" }, position: { x: 450, y: 40 } },
    
    // Second level for Backend branch
    { id: "6", type: "roadmap", data: { label: "Node.js" }, position: { x: 450, y: 150 } },
    { id: "7", type: "roadmap", data: { label: "Database" }, position: { x: 450, y: 250 } },
    
    // Third level - further steps
    { id: "8", type: "roadmap", data: { label: "Testing" }, position: { x: 650, y: 40 } },
    { id: "9", type: "roadmap", data: { label: "Deployment" }, position: { x: 650, y: 160 } },
    
    // Final destination
    { 
      id: "10", 
      type: "start", 
      data: { label: "Launch" }, 
      position: { x: 850, y: 100 }
    },
  ];

  const initialEdges: Edge[] = [
    { 
      id: "e1-2", 
      source: "1", 
      target: "2", 
      animated: true, 
     
    },
    { 
      id: "e1-3", 
      source: "1", 
      target: "3", 
      animated: true, 
      
    },
    
    { 
      id: "e2-4", 
      source: "2", 
      target: "4", 
      animated: true,
      
    },
    { 
      id: "e2-5", 
      source: "2", 
      target: "5", 
      animated: true,
     
    },
    
    { 
      id: "e3-6", 
      source: "3", 
      target: "6", 
      animated: true,
    
    },
    { 
      id: "e3-7", 
      source: "3", 
      target: "7", 
      animated: true,
    
    },
    
    { 
      id: "e4-8", 
      source: "4", 
      target: "8", 
      animated: true,
    
    },
    { 
      id: "e5-8", 
      source: "5", 
      target: "8", 
      animated: true,
  
    },
    { 
      id: "e6-9", 
      source: "6", 
      target: "9", 
      animated: true,
  
    },
    { 
      id: "e7-9", 
      source: "7", 
      target: "9", 
      animated: true,
    
    },
    
    // Final connections
    { 
      id: "e8-10", 
      source: "8", 
      target: "10", 
      animated: true,
     
    },
    { 
      id: "e9-10", 
      source: "9", 
      target: "10", 
      animated: true,
    
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-96 max-w-4xl mx-auto"
    >
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        minZoom={0.5}
        maxZoom={2}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background 
          color="#e5e7eb" 
          gap={16} 
          size={1} 
        />
        <Controls 
          position="bottom-right"
          style={{
            display: 'flex',
            flexDirection: 'row',
            background: 'transparent',
            border: 'none',
          
          }}
        />

      </ReactFlow>
    </motion.div>
  );
}

export default LandingPageGraphComponent;