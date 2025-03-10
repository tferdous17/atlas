import { Handle, Position } from "@xyflow/react";

const FrontendParentNode = ({ data }) => {
  return (
    <div className="bg-amber-400 relative w-[120px] h-[120px] rounded-lg text-white text-lg font-semibold flex justify-center items-center shadow-md border-none z-[4]">
      <Handle 
        id="top"
        type="source" 
        position={Position.Top} 
        className="!w-3 !h-3 !bg-black !rounded-full !absolute !top-[-6px] !left-1/2 !transform !-translate-x-1/2"
      />
      <Handle 
        id="bottom"
        type="target" 
        position={Position.Bottom} 
        className="!w-3 !h-3 !bg-black !rounded-full !absolute !bottom-[-6px] !left-1/2 !transform !-translate-x-1/2"
      />
      {data.label}
    </div>
  );
};

export default FrontendParentNode;
