import { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MarkerType
} from "@xyflow/react";
import { TooltipNode } from "@/components/tooltip-node";
import { initialNodes, initialEdges, colors } from "@/utils/mockdata";

const nodeTypes = {
  tooltipNode: TooltipNode,
};

export default function GraphComponent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({
      ...params,
      style: { stroke: colors.edgeColor, strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: colors.edgeColor,
      },
    }, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-screen bg-slate-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        elementsSelectable={true}
        selectNodesOnDrag={false}
        zoomOnScroll={true}
        panOnScroll={false}
        connectionLineStyle={{ stroke: '#000', strokeWidth: 2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="#CBD5E1"
          gap={20}
          size={1}
          style={{ backgroundColor: colors.background }}
        />
        <Controls
          position="bottom-right"
          style={{
            marginRight: 10,
            marginBottom: 10,
          }}
        />
      </ReactFlow>
    </div>
  );
}