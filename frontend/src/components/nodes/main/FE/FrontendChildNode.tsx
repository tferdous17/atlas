import { Handle, Position } from "@xyflow/react";

const FrontendChildNode = ({ data }) => {
    return (
      <div className="bg-amber-300 relative w-[100px] h-[40px] rounded-full text-white text-sm font-medium flex justify-center items-center shadow-sm border-none z-[3]">
        <Handle 
          id="bottom"
          type="target"
          position={Position.Bottom} 
          className="!w-3 !h-3 !bg-black !rounded-full !absolute !bottom-[-6px] !left-1/2 !transform !-translate-x-1/2"
        />
        <span>{data.label}</span>
      </div>
    );
  };
  
  export default FrontendChildNode;
  