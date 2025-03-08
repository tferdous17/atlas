import { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MarkerType,
} from "@xyflow/react";
import { initialEdges, initialNodes, nodeTypes} from "@/utils/mockData";
import { colors } from "@/utils/mockStyles";

export default function GraphComponent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: colors.edgeColor, strokeWidth: 4 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: colors.edgeColor,
              width: 20,
              height: 20,
            },
          },
          eds
        )
      ),
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
        connectionLineStyle={{ stroke: "#1E293B", strokeWidth: 3 }} // Darker stroke color
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="#1E1E1E"
          gap={20}
          size={1.5}
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
