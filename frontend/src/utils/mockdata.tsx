import { MarkerType } from "@xyflow/react";
export const colors = {
  primary: "#6366F1", // Indigo for main node
  frontend: "#F59E0B", // Amber for frontend
  backend: "#3B82F6", // Blue for backend
  ml: "#8B5CF6", // Purple for ML
  methodology: "#10B981", // Emerald for methodology
  frontendChild: "#F59E0B", // Amber shade for frontend children
  backendChild: "#3B82F6", // Blue shade for backend children
  mlChild: "#8B5CF6", // Purple shade for ML children
  methodologyChild: "#10B981", // Emerald shade for methodology children
  // Enhanced edge colors for better visibility
  edgeColor: "#64748B", // Darker slate for edges
  mainEdgeColor: "#475569", // Even darker for main connections
  background: "#F8FAFC", // Very light slate for background
  text: "#1E293B", // Dark slate for text
};

// Consistent styles for better readability
export const styles = {
  mainNode: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    border: "none",
    zIndex: 5,
  },
  categoryNode: {
    width: 120,
    height: 120,
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
    border: "none",
    zIndex: 4,
  },
  childNode: {
    width: 100,
    height: 40,
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
    border: "none",
    zIndex: 3,
  },
};

export const initialNodes = [
  // Main Project Node
  {
    id: "0",
    data: { label: "Flux" },
    position: { x: 400, y: 400 },
    style: {
      ...styles.mainNode,
      backgroundColor: colors.primary,
    },
  },

  // Category Nodes
  {
    id: "1",
    data: { label: "Frontend" },
    position: { x: 400, y: 180 },
    style: {
      ...styles.categoryNode,
      backgroundColor: colors.frontend,
    },
  },
  {
    id: "2",
    data: { label: "Backend" },
    position: { x: 620, y: 400 },
    style: {
      ...styles.categoryNode,
      backgroundColor: colors.backend,
    },
  },
  {
    id: "3",
    data: { label: "Machine Learning" },
    position: { x: 400, y: 620 },
    style: {
      ...styles.categoryNode,
      backgroundColor: colors.ml,
    },
  },
  {
    id: "4",
    data: { label: "Methodology" },
    position: { x: 180, y: 400 },
    style: {
      ...styles.categoryNode,
      backgroundColor: colors.methodology,
    },
  },

  // Frontend Children
  {
    id: "5",
    data: { label: "React" },
    position: { x: 350, y: 80 },
    style: {
      ...styles.childNode,
      backgroundColor: colors.frontendChild,
    },
  },
  {
    id: "6",
    data: { label: "Tailwind" },
    position: { x: 460, y: 80 },
    style: {
      ...styles.childNode,
      backgroundColor: colors.frontendChild,
    },
  },

  // Backend Children
  {
    id: "7",
    data: { label: "Node.js" },
    position: { x: 760, y: 340 },
    style: {
      ...styles.childNode,
      backgroundColor: colors.backendChild,
    },
  },
  {
    id: "8",
    data: { label: "Database" },
    position: { x: 760, y: 400 },
    style: {
      ...styles.childNode,
      backgroundColor: colors.backendChild,
    },
  },
  {
    id: "9",
    data: { label: "REST API" },
    position: { x: 760, y: 460 },
    style: {
      ...styles.childNode,
      backgroundColor: colors.backendChild,
    },
  },

  // ML Children
  {
    id: "10",
    data: { label: "TensorFlow" },
    position: { x: 350, y: 720 },
    style: {
      ...styles.childNode,
      backgroundColor: colors.mlChild,
    },
  },
  {
    id: "11",
    data: { label: "PyTorch" },
    position: { x: 460, y: 720 },
    style: {
      ...styles.childNode,
      backgroundColor: colors.mlChild,
    },
  },

  // Methodology Children
  {
    id: "12",
    data: { label: "CI/CD" },
    position: { x: 120, y: 340 },
    style: {
      ...styles.childNode,
      backgroundColor: colors.methodologyChild,
    },
  },
  {
    id: "13",
    data: { label: "GitHub Actions" },
    position: { x: 120, y: 460 },
    style: {
      ...styles.childNode,
      backgroundColor: colors.methodologyChild,
    },
  },
];

// Enhanced edges with better styling and arrow markers
export const initialEdges = [
  // Main connections - with stronger visibility
  {
    id: "e0-1",
    source: "0",
    target: "1",
    animated: true,
    style: { stroke: colors.mainEdgeColor, strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: colors.mainEdgeColor,
      width: 20,
      height: 20,
    },
    zIndex: 1,
  },
  {
    id: "e0-2",
    source: "0",
    target: "2",
    animated: true,
    style: { stroke: colors.mainEdgeColor, strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: colors.mainEdgeColor,
      width: 20,
      height: 20,
    },
    zIndex: 1,
  },
  {
    id: "e0-3",
    source: "0",
    target: "3",
    animated: true,
    style: { stroke: colors.mainEdgeColor, strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: colors.mainEdgeColor,
      width: 20,
      height: 20,
    },
    zIndex: 1,
  },
  {
    id: "e0-4",
    source: "0",
    target: "4",
    animated: true,
    style: { stroke: colors.mainEdgeColor, strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: colors.mainEdgeColor,
      width: 20,
      height: 20,
    },
    zIndex: 1,
  },

  // Frontend children - with stronger colors
  {
    id: "e1-5",
    source: "1",
    target: "5",
    style: { stroke: colors.frontendChild, strokeWidth: 2.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: colors.frontendChild,
      width: 15,
      height: 15,
    },
    zIndex: 0,
  },
  {
    id: "e1-6",
    source: "1",
    target: "6",
    style: { stroke: colors.frontendChild, strokeWidth: 2.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: colors.frontendChild,
      width: 15,
      height: 15,
    },
    zIndex: 0,
  },

  // Backend children
  {
    id: "e2-7",
    source: "2",
    target: "7",
    style: { stroke: colors.backendChild, strokeWidth: 2.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: colors.backendChild,
      width: 15,
      height: 15,
    },
    zIndex: 0,
  },
  {
    id: "e2-8",
    source: "2",
    target: "8",
    style: { stroke: colors.backendChild, strokeWidth: 2.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: colors.backendChild,
      width: 15,
      height: 15,
    },
    zIndex: 0,
  },
  {
    id: "e2-9",
    source: "2",
    target: "9",
    style: { stroke: colors.backendChild, strokeWidth: 2.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: colors.backendChild,
      width: 15,
      height: 15,
    },
    zIndex: 0,
  },

  // ML children
  {
    id: "e3-10",
    source: "3",
    target: "10",
    style: { stroke: colors.mlChild, strokeWidth: 2.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: colors.mlChild,
      width: 15,
      height: 15,
    },
    zIndex: 0,
  },
  {
    id: "e3-11",
    source: "3",
    target: "11",
    style: { stroke: colors.mlChild, strokeWidth: 2.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: colors.mlChild,
      width: 15,
      height: 15,
    },
    zIndex: 0,
  },

  // Methodology children
  {
    id: "e4-12",
    source: "4",
    target: "12",
    style: { stroke: colors.methodologyChild, strokeWidth: 2.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: colors.methodologyChild,
      width: 15,
      height: 15,
    },
    zIndex: 0,
  },
  {
    id: "e4-13",
    source: "4",
    target: "13",
    style: { stroke: colors.methodologyChild, strokeWidth: 2.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: colors.methodologyChild,
      width: 15,
      height: 15,
    },
    zIndex: 0,
  },
];
