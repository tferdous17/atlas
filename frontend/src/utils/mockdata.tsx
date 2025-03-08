export const initialNodes = [
    {
      id: "0",
      data: { label: "Flux" },
      position: { x: 400, y: 400 },
      style: {
        width: 120,
        height: 120,
        borderRadius: "50%",
        fontSize: "20px",
        fontWeight: "bold",
        backgroundColor: "#4CAF50",
        color: "#fff",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  
    {
      id: "1",
      data: { label: "Frontend" },
      position: { x: 400, y: 150 },
      style: { borderRadius: "50%", textAlign: "center", backgroundColor: "#FF9800" },
    },
    {
      id: "2",
      data: { label: "Backend" },
      position: { x: 650, y: 400 },
      style: { borderRadius: "50%", textAlign: "center", backgroundColor: "#3F51B5" },
    },
    {
      id: "3",
      data: { label: "Machine Learning" },
      position: { x: 400, y: 650 },
      style: { borderRadius: "50%", textAlign: "center", backgroundColor: "#9C27B0" },
    },
    {
      id: "4",
      data: { label: "Methodology" },
      position: { x: 150, y: 400 },
      style: { borderRadius: "50%", textAlign: "center", backgroundColor: "#009688" },
    },
  
    {
      id: "5",
      data: { label: "React" },
      position: { x: 350, y: 50 },
      parent: "1",
      style: { borderRadius: "50%", backgroundColor: "#2196F3", color: "#fff" },
    },
    {
      id: "6",
      data: { label: "Tailwind" },
      position: { x: 450, y: 50 },
      parent: "1",
      style: { borderRadius: "50%", backgroundColor: "#2196F3", color: "#fff" },
    },
  
    {
      id: "7",
      data: { label: "Node.js" },
      position: { x: 750, y: 350 },
      parent: "2",
      style: { borderRadius: "50%", backgroundColor: "#8BC34A", color: "#fff" },
    },
    {
      id: "8",
      data: { label: "Database" },
      position: { x: 750, y: 450 },
      parent: "2",
      style: { borderRadius: "50%", backgroundColor: "#8BC34A", color: "#fff" },
    },
    {
      id: "9",
      data: { label: "REST API" },
      position: { x: 750, y: 550 },
      parent: "2",
      style: { borderRadius: "50%", backgroundColor: "#8BC34A", color: "#fff" },
    },
  
    {
      id: "10",
      data: { label: "TensorFlow" },
      position: { x: 350, y: 750 },
      parent: "3",
      style: { borderRadius: "50%", backgroundColor: "#F44336", color: "#fff" },
    },
    {
      id: "11",
      data: { label: "PyTorch" },
      position: { x: 450, y: 750 },
      parent: "3",
      style: { borderRadius: "50%", backgroundColor: "#F44336", color: "#fff" },
    },
  
    {
      id: "12",
      data: { label: "CI/CD" },
      position: { x: 50, y: 350 },
      parent: "4",
      style: { borderRadius: "50%", backgroundColor: "#FFC107", color: "#fff" },
    },
    {
      id: "13",
      data: { label: "GitHub Actions" },
      position: { x: 50, y: 450 },
      parent: "4",
      style: { borderRadius: "50%", backgroundColor: "#FFC107", color: "#fff" },
    },
  ];
  
  export const initialEdges = [
    { id: "e0-1", source: "0", target: "1" },
    { id: "e0-2", source: "0", target: "2" },
    { id: "e0-3", source: "0", target: "3" },
    { id: "e0-4", source: "0", target: "4" },
  
    { id: "e1-5", source: "1", target: "5" },
    { id: "e1-6", source: "1", target: "6" },
  
    { id: "e2-7", source: "2", target: "7" },
    { id: "e2-8", source: "2", target: "8" },
    { id: "e2-9", source: "2", target: "9" },
  
    { id: "e3-10", source: "3", target: "10" },
    { id: "e3-11", source: "3", target: "11" },
  
    { id: "e4-12", source: "4", target: "12" },
    { id: "e4-13", source: "4", target: "13" },
  ];