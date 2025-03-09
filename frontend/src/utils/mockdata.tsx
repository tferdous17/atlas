import { arrowStyles, colors } from "./mockStyles";
import ProjectNode from "@/components/nodes/main/ProjectNode";
import FrontendParentNode from "@/components/nodes/main/FE/FrontendParentNode";
import FrontendChildNode from "@/components/nodes/main/FE/FrontendChildNode";
import BackendParentNode from "@/components/nodes/main/BE/BackendParentNode";
import BackendChildNode from "@/components/nodes/main/BE/BackendChildNode";
import MachineParentNode from "@/components/nodes/main/ML/MachineParentNode";
import MachineChildNode from "@/components/nodes/main/ML/MachineChildNode";
export const nodeTypes = {
  projectNode: ProjectNode,
  frontendParentNode: FrontendParentNode,
  frontendChildNode: FrontendChildNode,
  backendParentNode: BackendParentNode,
  backendChildNode: BackendChildNode,
  machineParentNode: MachineParentNode,
  machineChildNode: MachineChildNode,
};
export const initialNodes = [
  {
    id: "0",
    data: { label: "Flux" },
    position: { x: 400, y: 400 },
    type: "projectNode",
  },
  {
    id: "1",
    data: { label: "Frontend" },
    position: { x: 400, y: 180 },
    type: "frontendParentNode",
  },
  {
    id: "2",
    data: { label: "Backend" },
    position: { x: 620, y: 400 },
    type: "backendParentNode",
  },
  {
    id: "3",
    data: { label: "Machine Learning" },
    position: { x: 400, y: 620 },
    type: "machineParentNode",
  },

  // Frontend Children
  {
    id: "5",
    data: { label: "React" },
    position: { x: 350, y: 80 },
    type: "frontendChildNode",
  },
  {
    id: "6",
    data: { label: "Tailwind" },
    position: { x: 460, y: 80 },
    type: "frontendChildNode",
  },

  // Backend Children
  {
    id: "7",
    data: { label: "Node.js" },
    position: { x: 900, y: 340 },
    type: "backendChildNode",
  },

  {
    id: "8",
    data: { label: "Database" },
    position: { x: 900, y: 400 },
    type: "backendChildNode",
  },
  {
    id: "9",
    data: { label: "REST API" },
    position: { x: 900, y: 460 },
    type: "backendChildNode",
  },

  // ML Children
  {
    id: "10",
    data: { label: "TensorFlow" },
    position: { x: 350, y: 800 },
    type: "machineChildNode",
  },
  {
    id: "11",
    data: { label: "PyTorch" },
    position: { x: 460, y: 800 },
    type: "machineChildNode",
  },
];

export const initialEdges = [
  {
    id: "e0-1",
    source: "0",
    target: "1",
    sourceHandle: "top",
    animated: true,
    style: { stroke: colors.mainEdgeColor, strokeWidth: 3 },
    markerEnd: {
      color: colors.mainEdgeColor,
      ...arrowStyles,
    },
    zIndex: 1,
  },
  {
    id: "e0-2",
    source: "0",
    target: "2",
    sourceHandle: "right",
    animated: true,
    style: { stroke: colors.mainEdgeColor, strokeWidth: 3 },
    markerEnd: {
      color: colors.mainEdgeColor,
      ...arrowStyles,
    },
    zIndex: 1,
  },
  {
    id: "e0-3",
    source: "0",
    target: "3",
    sourceHandle: "bottom",
    animated: true,
    style: { stroke: colors.mainEdgeColor, strokeWidth: 3 },
    markerEnd: {
      color: colors.mainEdgeColor,
      ...arrowStyles,
    },
    zIndex: 1,
  },

  // Frontend children
  {
    id: "e1-5",
    source: "1",
    target: "5",
    style: { stroke: colors.frontendChild, strokeWidth: 2.5 },
    markerEnd: {
      color: colors.frontendChild,
      ...arrowStyles,
    },
    zIndex: 0,
  },
  {
    id: "e1-6",
    source: "1",
    target: "6",
    style: { stroke: colors.frontendChild, strokeWidth: 2.5 },
    markerEnd: {
      color: colors.frontendChild,
      ...arrowStyles,
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
      color: colors.backendChild,
      ...arrowStyles,
    },
    zIndex: 0,
  },
  {
    id: "e2-8",
    source: "2",
    target: "8",
    style: { stroke: colors.backendChild, strokeWidth: 2.5 },
    markerEnd: {
      color: colors.backendChild,
      ...arrowStyles,
    },
    zIndex: 0,
  },
  {
    id: "e2-9",
    source: "2",
    target: "9",
    style: { stroke: colors.backendChild, strokeWidth: 2.5 },
    markerEnd: {
      color: colors.backendChild,
      ...arrowStyles,
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
      color: colors.mlChild,
      ...arrowStyles,
    },
    zIndex: 0,
  },
  {
    id: "e3-11",
    source: "3",
    target: "11",
    style: { stroke: colors.mlChild, strokeWidth: 2.5 },
    markerEnd: {
      color: colors.mlChild,
      ...arrowStyles,
    },
    zIndex: 0,
  },
];