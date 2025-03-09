import { useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MarkerType,
  ReactFlowProvider,
} from "@xyflow/react";
import { nodeTypes } from "@/utils/mockdata";
import { colors } from "@/utils/mockStyles";

export default function GraphComponent({ dataNodes, dataEdges }) {
  const [loading, setLoading] = useState(true);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const newEdge = {
          ...params,
          animated: true,
          style: { stroke: colors.edgeColor, strokeWidth: 4 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: colors.edgeColor,
            width: 20,
            height: 20,
          },
          sourceHandle: params.sourceHandle || "bottom-source",
          targetHandle: params.targetHandle || "top-target",
        };

        return addEdge(newEdge, eds);
      });
    },
    [setEdges]
  );

  // Node dimensions by type - needed for spacing calculations
  const getNodeDimensions = (nodeType) => {
    switch (nodeType) {
      case "projectNode":
        return { width: 120, height: 120 };
      case "frontendParentNode":
      case "backendParentNode":
      case "machineParentNode":
        return { width: 160, height: 100 };
      case "frontendChildNode":
      case "backendChildNode":
      case "MachineChildNode":
        return { width: 120, height: 40 };
      default:
        return { width: 150, height: 40 };
    }
  };

  const getOrganizedLayout = (inputNodes, inputEdges) => {
    if (!inputNodes || inputNodes.length === 0) {
      return { nodes: [], edges: [] };
    }

    const nodes = [...inputNodes];
    const edges = [...inputEdges];

    const projectNode = nodes.find((node) => node.type === "projectNode");
    const frontendNode = nodes.find(
      (node) => node.type === "frontendParentNode"
    );
    const backendNode = nodes.find((node) => node.type === "backendParentNode");
    const mlNode = nodes.find((node) => node.type === "machineParentNode");

    if (!projectNode) return { nodes, edges };

    const centerX = 400;
    const centerY = 400;
    projectNode.position = { x: centerX, y: centerY };

    const distanceToParent = 220;

    if (frontendNode) {
      frontendNode.position = { x: centerX, y: centerY - distanceToParent };
    }

    if (backendNode) {
      backendNode.position = { x: centerX + distanceToParent, y: centerY };
    }

    if (mlNode) {
      mlNode.position = { x: centerX, y: centerY + distanceToParent };
    }

    if (frontendNode) {
      layoutFrontendChildNodes(nodes, edges, frontendNode);
    }

    if (backendNode) {
      layoutBackendChildNodes(nodes, edges, backendNode);
    }

    if (mlNode) {
      layoutMachineChildNodes(nodes, edges, mlNode);
    }

    return { nodes, edges };
  };

  const layoutFrontendChildNodes = (nodes, edges, parentNode) => {
    if (!parentNode) return;

    // Find all children of this parent
    const childEdges = edges.filter((edge) => edge.source === parentNode.id);
    const childIds = childEdges.map((edge) => edge.target);

    // Get all direct children
    const directChildNodes = nodes.filter((node) => childIds.includes(node.id));

    if (directChildNodes.length === 0) return;

    const parentX = parentNode.position.x;
    const parentY = parentNode.position.y;
    const parentDim = getNodeDimensions(parentNode.type);

    const totalChildCount = directChildNodes.length;
    const totalWidth = (totalChildCount - 1) * spacing;

    const startX = parentX - totalWidth / 2;
    const nodeDistance = 120;

    directChildNodes.forEach((node, index) => {
      const nodeIndex = nodes.findIndex((n) => n.id === node.id);
      nodes[nodeIndex].position = {
        x: startX + index * spacing,
        y: parentY - nodeDistance,
      };
    });
  };

  const layoutBackendChildNodes = (nodes, edges, parentNode) => {
    if (!parentNode) return;

    const childEdges = edges.filter((edge) => edge.source === parentNode.id);
    const childIds = childEdges.map((edge) => edge.target);

    const directChildNodes = nodes.filter((node) => childIds.includes(node.id));

    if (directChildNodes.length === 0) return;

    const parentX = parentNode.position.x;
    const parentY = parentNode.position.y;
    const parentDim = getNodeDimensions(parentNode.type);

    const spacing = 80; 
    const totalChildCount = directChildNodes.length;
    const totalHeight = (totalChildCount - 1) * spacing;

    const startY = parentY - totalHeight / 2;
    const nodeDistance = 120; 

    directChildNodes.forEach((node, index) => {
      const nodeIndex = nodes.findIndex((n) => n.id === node.id);
      nodes[nodeIndex].position = {
        x: parentX + nodeDistance,
        y: startY + index * spacing,
      };
    });
  };

  const layoutMachineChildNodes = (nodes, edges, parentNode) => {
    if (!parentNode) return;
    const childEdges = edges.filter((edge) => edge.source === parentNode.id);
    const childIds = childEdges.map((edge) => edge.target);

    const directChildNodes = nodes.filter((node) => childIds.includes(node.id));

    if (directChildNodes.length === 0) return;

    const parentX = parentNode.position.x;
    const parentY = parentNode.position.y;
    const parentDim = getNodeDimensions(parentNode.type);
    const spacing = 120;
    const totalChildCount = directChildNodes.length;
    const totalWidth = (totalChildCount - 1) * spacing;

    const startX = parentX - totalWidth / 2;
    const nodeDistance = 120;

    // Position nodes in a straight horizontal line below the parent
    directChildNodes.forEach((node, index) => {
      const nodeIndex = nodes.findIndex((n) => n.id === node.id);
      nodes[nodeIndex].position = {
        x: startX + index * spacing,
        y: parentY + nodeDistance,
      };
    });
  };

  // Load data effect
  useEffect(() => {
    if (
      dataNodes &&
      dataEdges &&
      Array.isArray(dataNodes) &&
      Array.isArray(dataEdges)
    ) {
      setLoading(true);
      console.log("NODES", dataNodes);
      console.log("EDGES", dataEdges);
      const nodesWithPositions = dataNodes.map((node) => ({
        ...node,
        position: node.position || { x: 0, y: 0 },
      }));

      setTimeout(() => {
        setNodes(nodesWithPositions);
        setEdges(dataEdges);
        setLoading(false);
      }, 300);
    }
  }, [dataNodes, dataEdges]);

  useEffect(() => {
    if (nodes.length > 0 && !loading) {
      const { nodes: layoutedNodes } = getOrganizedLayout(nodes, edges);
      setNodes(layoutedNodes);
    }
  }, [loading]);

  return (
    <ReactFlowProvider>
      <div className="w-full h-screen bg-slate-50 relative">
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
          connectionLineStyle={{ stroke: "#1E293B", strokeWidth: 3 }}
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
    </ReactFlowProvider>
  );
}
