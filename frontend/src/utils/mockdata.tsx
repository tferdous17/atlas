import { MarkerType } from "@xyflow/react";
import { colors, styles } from "./mockStyles";

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
