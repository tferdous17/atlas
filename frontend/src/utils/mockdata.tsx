export const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'React' },
      position: { x: 250, y: 25 },
    },
   
    {
      id: '2',
      data: { label:  'TailwindCSS' },
      position: { x: 100, y: 125 },
  
    },
  ];
   
  
  export const initialEdges = [
    { id: "e1-2", source: "1", target: "2", animated: false, interactive: false }, // Prevent interaction
];