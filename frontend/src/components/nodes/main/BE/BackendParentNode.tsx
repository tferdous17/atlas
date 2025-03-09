import { Handle, Position } from "@xyflow/react";

const BackendParentNode = ({ data }) => {
  return (
    <div className="bg-blue-400 relative w-[120px] h-[120px] rounded-lg text-white text-lg font-semibold flex justify-center items-center shadow-md border-none z-[4]">
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-black !rounded-full !absolute !left-[-6px] !top-1/2 !transform !-translate-y-1/2"
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-black !rounded-full !absolute !right-[-6px] !top-1/2 !transform !-translate-y-1/2"
      />

      <span>{data.label}</span>
    </div>
  );
};

export default BackendParentNode;