import React, { useCallback } from 'react';
import {
  Background,
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: 'horizontal-1',
    sourcePosition: 'right',
    type: 'input',
    data: { label: 'Project Idea' },
    position: { x: 0, y: 80 },
    style: {
      background: 'linear-gradient(to right, #2563EB, #1D4ED8)', // Blue gradient
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '12px',
      padding: '12px',
      border: 'none',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
    },
  },
  {
    id: 'horizontal-2',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Frontend' },
    position: { x: 250, y: 0 },
    style: {
      backgroundColor: '#FFFFFF', // White background
      borderRadius: '10px',
      padding: '12px',
      borderTop: '4px solid #3B82F6',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
      color: '#1F2937', // Dark text
      fontWeight: '500',
      textAlign: 'center',
    },
  },
  {
    id: 'horizontal-3',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Backend' },
    position: { x: 250, y: 165 },
    style: {
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      padding: '12px',
      borderTop: '4px solid #3B82F6',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
      color: '#1F2937',
      fontWeight: '500',
      textAlign: 'center',
    },
  },
  {
    id: 'horizontal-4',
    sourcePosition: 'right',
    targetPosition: 'bottom',
    data: { label: 'React' },
    position: { x: 500, y: -60 },
    style: {
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      padding: '12px',
      borderTop: '4px solid #3B82F6',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
      color: '#1F2937',
      fontWeight: '500',
      textAlign: 'center',
    },
  },

  
  {
    id: 'horizontal-5',
    sourcePosition: 'right',
    targetPosition: 'bottom',
    data: { label: 'Node.js' },
    position: { x: 500, y: 120 },
    style: {
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      padding: '12px',
      borderTop: '4px solid #3B82F6',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
      color: '#1F2937',
      fontWeight: '500',
      textAlign: 'center',
    },
  },
  {
    id: 'horizontal-6',
    sourcePosition: 'right',
    targetPosition: 'top',
    data: { label: 'Database' },
    position: { x: 500, y: 230 },
    style: {
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      padding: '12px',
      borderTop: '4px solid #3B82F6',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
      color: '#1F2937',
      fontWeight: '500',
      textAlign: 'center',
    },
  },

  {
    id: 'horizontal-7',
    sourcePosition: 'right',
    targetPosition: 'top',
    data: { label: 'Tailwind CSS' },
    position: { x: 500, y: 50 },
    style: {
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      padding: '12px',
      borderTop: '4px solid #3B82F6',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
      color: '#1F2937',
      fontWeight: '500',
      textAlign: 'center',
    },
  },

  {
    id: 'horizontal-8',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Testing' },
    position: { x: 750, y: 50 },
    style: {
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      padding: '12px',
      borderTop: '4px solid #3B82F6',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
      color: '#1F2937',
      fontWeight: '500',
      textAlign: 'center',
    },
  },

  {
    id: 'horizontal-9',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Deployment' },
    position: { x: 750, y: 150 },
    style: {
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      padding: '12px',
      borderTop: '4px solid #3B82F6',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
      color: '#1F2937',
      fontWeight: '500',
      textAlign: 'center',
    },
  },

  {
    id: 'horizontal-10',
    sourcePosition: 'bottom',
    targetPosition: 'bottom',
    data: { label: 'Launch' },
    position: { x: 960, y: 75 },
    style: {
      background: 'linear-gradient(to right, #2563EB, #1D4ED8)', // Blue gradient
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '12px',
      padding: '12px',
      border: 'none',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
    },
  },


  
];

const initialEdges = [
  { id: 'horizontal-e1-2', source: 'horizontal-1', type: 'smoothstep', target: 'horizontal-2', animated: true },
  { id: 'horizontal-e1-3', source: 'horizontal-1', type: 'smoothstep', target: 'horizontal-3', animated: true },
  { id: 'horizontal-e1-4', source: 'horizontal-2', type: 'smoothstep', target: 'horizontal-4', animated: true },
  { id: 'horizontal-e3-5', source: 'horizontal-3', type: 'smoothstep', target: 'horizontal-5', animated: true },
  { id: 'horizontal-e3-6', source: 'horizontal-3', type: 'smoothstep', target: 'horizontal-6', animated: true },
  { id: 'horizontal-e3-7', source: 'horizontal-2', type: 'smoothstep', target: 'horizontal-7', animated: true },

  { id: 'horizontal-e3-8', source: 'horizontal-4', type: 'smoothstep', target: 'horizontal-8', animated: true },
  { id: 'horizontal-e3-9', source: 'horizontal-7', type: 'smoothstep', target: 'horizontal-8', animated: true },
  { id: 'horizontal-e3-10', source: 'horizontal-5', type: 'smoothstep', target: 'horizontal-8', animated: true },
  { id: 'horizontal-e3-11', source: 'horizontal-6', type: 'smoothstep', target: 'horizontal-8', animated: true },
  { id: 'horizontal-e3-12', source: 'horizontal-8', type: 'smoothstep', target: 'horizontal-9', animated: true },
  { id: 'horizontal-e3-13', source: 'horizontal-9', type: 'smoothstep', target: 'horizontal-10', animated: true },


];

const LandingPageGraphComponent = () => {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (
    <div className="w-full h-[500px]">
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      attributionPosition="bottom-left"
    >
        <Background 
          color="#e5e7eb" 
          gap={16} 
          size={1} 
        />


    </ReactFlow>
    </div>
  );
};

export default LandingPageGraphComponent;
