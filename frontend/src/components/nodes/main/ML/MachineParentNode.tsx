import { Handle, Position } from "@xyflow/react";

const MachineParentNode = ({ data }) => {
  return (
    <div className="bg-purple-600 relative w-[140px] h-[140px] rounded-lg text-white text-xl font-bold flex justify-center items-center shadow-md border-none z-[4] leading-tight text-center">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-black !rounded-full !absolute !top-[-6px] !left-1/2 !transform !-translate-x-1/2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-black !rounded-full !absolute !bottom-[-6px] !left-1/2 !transform !-translate-x-1/2"
      />

      <span className="leading-tight text-center px-2">{data.label}</span>
    </div>
  );
};

export default MachineParentNode;
