import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion } from 'framer-motion';


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

// Create invisible placeholder nodes that define the full viewport from the start
const placeholderNodes = [
  {
    id: 'placeholder-1',
    position: { x: 60, y: -100 },
    style: { opacity: 0, width: 1, height: 1 },
    type: 'default',
    data: { label: '' },
  },
  {
    id: 'placeholder-2',
    position: { x: 1010, y: 280 },
    style: { opacity: 0, width: 1, height: 1 },
    type: 'default',
    data: { label: '' },
  }
];
const LandingPageGraphComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Add this to track when component is in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3, // Trigger when 30% of the component is visible
    triggerOnce: true // Only trigger once
  });
  
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  // Start animation only when in view
  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(false);
      setNodes(placeholderNodes);
      
      // Then add real nodes one by one with animation
      const nodeTimeout = setTimeout(() => {
        initialNodes.forEach((node, index) => {
          setTimeout(() => {
            setNodes((prevNodes) => {
              // Keep placeholders during animation
              const filteredNodes = prevNodes.filter(n => 
                !n.id.startsWith('placeholder') || index < initialNodes.length - 1
              );
              return [...filteredNodes, node];
            });
          }, index * 250);
        });
      }, 300);

      // Add edges with animation
      const edgeTimeout = setTimeout(() => {
        initialEdges.forEach((edge, index) => {
          setTimeout(() => {
            setEdges((prevEdges) => [...prevEdges, edge]);
          }, index * 100);
        });
      }, 1800);
      
      return () => {
        clearTimeout(nodeTimeout);
        clearTimeout(edgeTimeout);
      };
    }
  }, [inView, hasAnimated, setNodes, setEdges]);

  // Add hover effects to nodes
  const onNodeMouseEnter = useCallback((_, node) => {
    if (node.id.startsWith('placeholder')) return;
    
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node.id) {
          return {
            ...n,
            style: {
              ...n.style,
              transform: 'scale(1)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              zIndex: 1000,
            },
          };
        }
        return n;
      })
    );
  }, [setNodes]);

  const onNodeMouseLeave = useCallback((_, node) => {
    if (node.id.startsWith('placeholder')) return;
    
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node.id) {
          // Reset to original style
          const originalNode = initialNodes.find(initial => initial.id === n.id);
          return {
            ...n,
            style: originalNode?.style || n.style,
          };
        }
        return n;
      })
    );
  }, [setNodes]);

  return (
    <motion.div 
      className="w-full h-[500px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      ref={inViewRef}  // Add the ref here to track visibility
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        fitView
        fitViewOptions={{
          padding: 0,
          includeHiddenNodes: true,
          duration: 0  // Disable animated transitions for fitView
        }}
        minZoom={0.5}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 1}}
        attributionPosition="bottom-left"
      >
        <Background 
          color="#e5e7eb" 
          gap={16} 
          size={1} 
        />
      </ReactFlow>
    </motion.div>
  );
};

export default LandingPageGraphComponent;
