import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MarkerType,
  ReactFlowProvider,
  Panel,
} from "@xyflow/react";
import dagre from "dagre";
import { initialEdges, initialNodes, nodeTypes } from "@/utils/mockdata";
import { colors } from "@/utils/mockStyles";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

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

  // Node dimensions by type - adjust these based on your node components
  const getNodeDimensions = (nodeType) => {
    switch (nodeType) {
      case "projectNode":
        return { width: 120, height: 120 }; // Circle
      case "frontendParentNode":
      case "backendParentNode":
      case "machineParentNode":
        return { width: 160, height: 100 }; // Parent rectangles
      case "frontendChildNode":
      case "backendChildNode":
      case "MachineChildNode":
        return { width: 120, height: 40 }; // Child pills
      default:
        return { width: 150, height: 40 };
    }
  };

  // Custom layout function for our specific roadmap structure
  const getCustomLayout = (inputNodes, inputEdges) => {
    const nodes = [...inputNodes];
    const edges = [...inputEdges];
    
    // Find the project node and the three category nodes
    const projectNode = nodes.find(node => node.type === "projectNode");
    const frontendNode = nodes.find(node => node.type === "frontendParentNode");
    const backendNode = nodes.find(node => node.type === "backendParentNode");
    const mlNode = nodes.find(node => node.type === "machineParentNode");
    
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
    
    // Process each section's children with dagre
    layoutChildNodes(nodes, edges, frontendNode, "TB"); // Frontend children at top
    layoutChildNodes(nodes, edges, backendNode, "LR"); // Backend children to the right
    layoutChildNodes(nodes, edges, mlNode, "BT"); // ML children at bottom
    
    return { nodes, edges };
  };
  
  // Layout children for a specific parent node
  const layoutChildNodes = (nodes, edges, parentNode, direction) => {
    if (!parentNode) return;
    
    // Find all children of this parent
    const childEdges = edges.filter(edge => edge.source === parentNode.id);
    const childIds = childEdges.map(edge => edge.target);
    const childNodes = nodes.filter(node => childIds.includes(node.id));
    
    if (childNodes.length === 0) return;
    
    // Create a new dagre graph for this section
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    
    // Configure the layout
    dagreGraph.setGraph({ 
      rankdir: direction,
      nodesep: 40,
      ranksep: 60,
      marginx: 20,
      marginy: 20
    });
    
    // Add parent as the root node
    const parentDim = getNodeDimensions(parentNode.type);
    dagreGraph.setNode(parentNode.id, { 
      width: parentDim.width,
      height: parentDim.height
    });
    
    // Add all child nodes
    childNodes.forEach(node => {
      const dim = getNodeDimensions(node.type);
      dagreGraph.setNode(node.id, { 
        width: dim.width,
        height: dim.height
      });
    });
    
    // Add edges to the graph
    childEdges.forEach(edge => {
      dagreGraph.setEdge(edge.source, edge.target);
    });
    
    // Calculate the layout
    dagre.layout(dagreGraph);
    
    // Position child nodes based on direction and parent position
    const parentX = parentNode.position.x;
    const parentY = parentNode.position.y;
    
    childNodes.forEach(node => {
      const nodeWithPosition = dagreGraph.node(node.id);
      const nodeIndex = nodes.findIndex(n => n.id === node.id);
      
      // Adjust positions based on direction and parent placement
      if (direction === "TB") { // Top to bottom layout (Frontend)
        nodes[nodeIndex].position = {
          x: parentX - 60 + (nodeWithPosition.x - parentDim.width/2),
          y: parentY - 180
        };
      } else if (direction === "LR") { // Left to right layout (Backend)
        nodes[nodeIndex].position = {
          x: parentX + 180,
          y: parentY - 60 + (nodeWithPosition.y - parentDim.height/2)
        };
      } else if (direction === "BT") { // Bottom to top layout (ML)
        nodes[nodeIndex].position = {
          x: parentX - 60 + (nodeWithPosition.x - parentDim.width/2),
          y: parentY + 180
        };
      }
    });
  };
  
  // Apply layout on component mount
  useEffect(() => {
    const { nodes: layoutedNodes } = getCustomLayout(nodes, edges);
    setNodes(layoutedNodes);
  }, []);
  
  // Function to generate nodes for new technologies
  const addTechnology = (section, techName) => {
    // Find the parent section node
    let parentId;
    let nodeType;
    let childColor;
    
    if (section === "frontend") {
      parentId = "1";
      nodeType = "frontendChildNode";
      childColor = colors.frontendChild;
    } else if (section === "backend") {
      parentId = "2";
      nodeType = "backendChildNode";
      childColor = colors.backendChild;
    } else if (section === "ml") {
      parentId = "3";
      nodeType = "MachineChildNode";
      childColor = colors.mlChild;
    } else {
      return;
    }
    
    // Create a new node
    const newNodeId = `${section}-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      data: { label: techName },
      position: { x: 0, y: 0 }, // Position will be set by layout
      type: nodeType,
    };
    
    // Create a new edge connecting to parent
    const newEdge = {
      id: `e${parentId}-${newNodeId}`,
      source: parentId,
      target: newNodeId,
      style: { stroke: childColor, strokeWidth: 2.5 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: childColor,
        width: 15,
        height: 15,
      },
      zIndex: 0,
    };
    
    // Add node and edge
    setNodes(prev => [...prev, newNode]);
    setEdges(prev => [...prev, newEdge]);
    
    // Re-apply layout
    setTimeout(() => {
      const { nodes: layoutedNodes } = getCustomLayout([...nodes, newNode], [...edges, newEdge]);
      setNodes(layoutedNodes);
    }, 50);
  };
  
  // Button handler to re-apply layout
  const handleLayout = () => {
    const { nodes: layoutedNodes } = getCustomLayout(nodes, edges);
    setNodes([...layoutedNodes]);
  };

  return (
    <ReactFlowProvider>
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
          <Panel position="top-right">
            <div className="flex flex-col gap-2">
              <Button onClick={handleLayout}>
                Apply Layout
              </Button>
              <Button onClick={() => addTechnology("frontend", "Next.js")}>
                Add Frontend Tech
              </Button>
              <Button onClick={() => addTechnology("backend", "GraphQL")}>
                Add Backend Tech
              </Button>
              <Button onClick={() => addTechnology("ml", "Scikit-learn")}>
                Add ML Tech
              </Button>
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}