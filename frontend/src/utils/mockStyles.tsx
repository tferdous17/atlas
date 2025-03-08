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
  