import { Handle, Position } from "@xyflow/react";
const BackendChildNode = ({ data }) => {
  return (
    <div className="bg-blue-300 relative w-[100px] h-[40px] rounded-full text-white text-sm font-medium flex justify-center items-center shadow-sm border-none z-[3]">
      <Handle
        id="left"
        type="target"
        position={Position.Left}
         className="!w-3 !h-3 !bg-black !rounded-full !absolute !left-[-6px] !transform !-translate-x-1/2"
      />
      <span>{data.label}</span>
    </div>
  );
};
export default BackendChildNode;
