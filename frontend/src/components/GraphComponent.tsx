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
        // Make sure params includes sourceHandle and targetHandle
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
          // Explicitly set these if they're not present in params
          sourceHandle: params.sourceHandle || 'bottom-source',
          targetHandle: params.targetHandle || 'top-target',
        };
        
        return addEdge(newEdge, eds);
      });
    },
    [setEdges]
  );

  // Node dimensions by type
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

  // Random value within range
  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  // Calculate distance between two points
  const distance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  // Check if a position is valid (not too close to parent or other nodes)
  const isValidPosition = (
    x: any, y: any, parentX: any, parentY: any, existingPositions: any[], minDistanceFromParent: number, minDistanceBetweenNodes: number
  ) => {
    // Check distance from parent
    if (distance(x, y, parentX, parentY) < minDistanceFromParent) {
      return false;
    }

    // Check distance from other nodes
    for (const pos of existingPositions) {
      if (distance(x, y, pos.x, pos.y) < minDistanceBetweenNodes) {
        return false;
      }
    }

    return true;
  };

  // Custom layout function with randomness and boundaries
  const getCustomLayout = (inputNodes: string | any[], inputEdges: { id: string; source: string; target: string; style: { stroke: string; strokeWidth: number; }; markerEnd: { type: MarkerType; color: string; width: number; height: number; }; zIndex: number; }[]) => {
    if (!inputNodes || inputNodes.length === 0) {
      return { nodes: [], edges: [] };
    }
    
    const nodes = [...inputNodes];
    const edges = [...inputEdges];

    // Find the project node and the three category nodes
    const projectNode = nodes.find((node) => node.type === "projectNode");
    const frontendNode = nodes.find(
      (node) => node.type === "frontendParentNode"
    );
    const backendNode = nodes.find((node) => node.type === "backendParentNode");
    const mlNode = nodes.find((node) => node.type === "machineParentNode");

    if (!projectNode) return { nodes, edges };

    // Set project node at center
    const centerX = 400;
    const centerY = 400;
    projectNode.position = { x: centerX, y: centerY };

    // Position the three main category nodes in a triangle around the project node
    if (frontendNode) {
      frontendNode.position = { x: centerX, y: centerY - 220 };
    }

    if (backendNode) {
      backendNode.position = { x: centerX + 220, y: centerY };
    }

    if (mlNode) {
      mlNode.position = { x: centerX, y: centerY + 220 };
    }

    // Process each section's children with added randomness and boundaries
    layoutChildNodes(nodes, edges, frontendNode, "frontend");
    layoutChildNodes(nodes, edges, backendNode, "backend");
    layoutChildNodes(nodes, edges, mlNode, "ml");

    return { nodes, edges };
  };

  // Layout children for a specific parent node with randomness and boundaries
  const layoutChildNodes = (nodes: any[], edges: any[], parentNode: never, sectionType: string | undefined) => {
    if (!parentNode) return;

    // Find all children of this parent
    const childEdges = edges.filter((edge) => edge.source === parentNode.id);
    const childIds = childEdges.map((edge) => edge.target);
    const childNodes = nodes.filter((node) => childIds.includes(node.id));

    if (childNodes.length === 0) return;

    const parentX = parentNode.position.x;
    const parentY = parentNode.position.y;
    const parentDim = getNodeDimensions(parentNode.type);

    // Set different randomness parameters based on section
    let randomConfig;

    switch (sectionType) {
      case "frontend":
        randomConfig = {
          minDistance: 120, // Minimum distance from parent center
          maxDistance: 250, // Maximum distance from parent center
          spreadFactor: 150,
          angleStart: -Math.PI / 2 - Math.PI / 4, // Top with spread
          angleEnd: -Math.PI / 2 + Math.PI / 4,
          minNodeDistance: 80, // Minimum distance between nodes
        };
        break;
      case "backend":
        randomConfig = {
          minDistance: 140,
          maxDistance: 280,
          spreadFactor: 130,
          angleStart: -Math.PI / 8, // Right with spread
          angleEnd: Math.PI / 8,
          minNodeDistance: 70,
        };
        break;
      case "ml":
        randomConfig = {
          minDistance: 120,
          maxDistance: 250,
          spreadFactor: 150,
          angleStart: Math.PI / 2 - Math.PI / 4, // Bottom with spread
          angleEnd: Math.PI / 2 + Math.PI / 4,
          minNodeDistance: 80,
        };
        break;
      default:
        randomConfig = {
          minDistance: 130,
          maxDistance: 260,
          spreadFactor: 120,
          angleStart: 0,
          angleEnd: Math.PI * 2,
          minNodeDistance: 75,
        };
    }

    // Keep track of positioned nodes
    const positionedNodes: any[] = [];

    // Position child nodes with randomness and boundaries
    childNodes.forEach((node, index) => {
      const nodeIndex = nodes.findIndex((n) => n.id === node.id);
      const nodeDim = getNodeDimensions(node.type);

      // Calculate minimum distance that accounts for node dimensions
      const effectiveMinDistance =
        randomConfig.minDistance +
        Math.max(parentDim.width, parentDim.height) / 2 +
        Math.max(nodeDim.width, nodeDim.height) / 2;

      // Try to find a valid position (max 20 attempts)
      let validPosition = false;
      let posX, posY;
      let attempts = 0;

      while (!validPosition && attempts < 20) {
        // Create a somewhat randomized placement with constraints
        const angleRange = randomConfig.angleEnd - randomConfig.angleStart;
        const baseAngle =
          randomConfig.angleStart +
          angleRange * (index / Math.max(childNodes.length, 1));

        // Add some randomness to the angle
        const angle = baseAngle + randomInRange(-0.15, 0.15);

        // Random distance from parent within boundaries
        const distance = randomInRange(
          randomConfig.minDistance,
          randomConfig.maxDistance
        );

        // Use polar coordinates for natural spread
        posX = parentX + Math.cos(angle) * distance;
        posY = parentY + Math.sin(angle) * distance;

        // Check if position is valid
        validPosition = isValidPosition(
          posX,
          posY,
          parentX,
          parentY,
          positionedNodes,
          effectiveMinDistance,
          randomConfig.minNodeDistance
        );

        attempts++;
      }

      // If we couldn't find a valid position, use the last attempt
      // but apply force-based adjustments to separate overlapping nodes
      if (!validPosition && positionedNodes.length > 0) {
        // Simple force-based adjustment
        for (let i = 0; i < 5; i++) {
          // Apply force iterations
          let forceX = 0;
          let forceY = 0;

          for (const pos of positionedNodes) {
            const dist = distance(posX, posY, pos.x, pos.y);
            if (dist < randomConfig.minNodeDistance && dist > 0) {
              // Calculate repulsion force
              const fx =
                ((posX - pos.x) / dist) *
                (randomConfig.minNodeDistance - dist) *
                0.2;
              const fy =
                ((posY - pos.y) / dist) *
                (randomConfig.minNodeDistance - dist) *
                0.2;
              forceX += fx;
              forceY += fy;
            }
          }

          // Apply forces
          posX += forceX;
          posY += forceY;
        }

        // Also ensure minimum distance from parent
        const distToParent = distance(posX, posY, parentX, parentY);
        if (distToParent < effectiveMinDistance) {
          const angle = Math.atan2(posY - parentY, posX - parentX);
          posX = parentX + Math.cos(angle) * effectiveMinDistance;
          posY = parentY + Math.sin(angle) * effectiveMinDistance;
        }
      }

      // Add the position to our list
      positionedNodes.push({ x: posX, y: posY });

      // Update the node position
      nodes[nodeIndex].position = { x: posX, y: posY };
    });
  };

  // Use separate useEffect hooks for better control
  // Main data loading effect
  useEffect(() => {
    if (dataNodes && dataEdges && Array.isArray(dataNodes) && Array.isArray(dataEdges)) {
      setLoading(true);
      
      // Clone the data to avoid reference issues
      const nodesWithPositions = dataNodes.map(node => ({
        ...node,
        // Ensure nodes have positions to prevent layout issues
        position: node.position || { x: 0, y: 0 }
      }));
      
      // Set data with a delay to ensure loading state is shown
      setTimeout(() => {
        setNodes(nodesWithPositions);
        setEdges(dataEdges);
        setLoading(false);
      }, 500);
    } else {
      console.log("Invalid or missing data:", { dataNodes, dataEdges });
    }
  }, [dataNodes, dataEdges]);

  // Layout effect - separate from data loading
  useEffect(() => {
    if (nodes.length > 0 && !loading) {
      console.log("Applying layout to", nodes.length, "nodes");
      const { nodes: layoutedNodes } = getCustomLayout(nodes, edges);
      setNodes(layoutedNodes);
    }
  }, [loading]);


  return (
    <ReactFlowProvider>
      <div className="w-full h-screen bg-slate-50 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
            <p className="ml-3 text-lg text-gray-700">Generating roadmap...</p>
          </div>
        ) : (
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
        )}
      </div>
    </ReactFlowProvider>
  );
}