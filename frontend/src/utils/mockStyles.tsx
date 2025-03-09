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
  edgeColor: "#1E293B", // Darker slate for better edge visibility
  mainEdgeColor: "#0F172A", // Even darker for main connections
  background: "#F8FAFC", // Light background
  text: "#1E293B", // Dark text for better contrast
};

export const arrowStyles = {
  type: MarkerType.ArrowClosed,
  width: 20,
  height: 20,
};
