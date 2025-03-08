import { Handle, Position } from "@xyflow/react";

const ProjectNode = ({ data }) => {
  return (
    <div className="relative w-[140px] h-[140px] rounded-full text-white text-xl font-bold flex justify-center items-center shadow-lg border-none bg-green-500">
      {/* Top Handle */}
      <Handle 
        type="source" 
        position={Position.Top} 
        className="!w-3 !h-3 !bg-black !rounded-full !absolute !top-[-6px] !left-1/2 !transform !-translate-x-1/2"
      />
      
      {/* Bottom Handle */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!w-3 !h-3 !bg-black !rounded-full !absolute !bottom-[-6px] !left-1/2 !transform !-translate-x-1/2"
      />
      
      {/* Left Handle */}
      <Handle 
        type="source" 
        position={Position.Left} 
        className="!w-3 !h-3 !bg-black !rounded-full !absolute !left-[-6px] !top-1/2 !transform !-translate-y-1/2"
      />
      
      {/* Right Handle */}
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!w-3 !h-3 !bg-black !rounded-full !absolute !right-[-6px] !top-1/2 !transform !-translate-y-1/2"
      />
      
      {/* Node Label */}
      <span>{data.label}</span>
    </div>
  );
};

export default ProjectNode;
