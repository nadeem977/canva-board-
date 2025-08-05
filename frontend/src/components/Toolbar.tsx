import React from "react";
import { AiOutlinePlusSquare, AiOutlineClear } from "react-icons/ai";
import { FaDrawPolygon, FaFont, FaMousePointer } from "react-icons/fa";

interface ToolbarProps {
  onAddRectangle: () => void;
  onDrawMode: () => void;
  onAddText: () => void;
  onSelectMode: () => void;
  onClear: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onAddRectangle,
  onDrawMode,
  onAddText,
  onSelectMode,
  onClear
}) => {
  return (
    <div className="flex gap-2 p-2 w-fit mx-auto bg-white rounded-lg shadow-md">
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2 cursor-pointer"
        onClick={onAddRectangle}
      >
        <AiOutlinePlusSquare />
        Add Rectangle
      </button>

      <button
        className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-2 cursor-pointer"
        onClick={onDrawMode}
      >
        <FaDrawPolygon />
        Draw Mode
      </button>

      <button
        className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-2 cursor-pointer"
        onClick={onAddText}
      >
        <FaFont />
        Add Text
      </button>

      <button
        className="bg-gray-500 text-white px-3 py-1 rounded flex items-center gap-2 cursor-pointer"
        onClick={onSelectMode}
      >
        <FaMousePointer />
        Select Mode
      </button>

      <button
        className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-2 cursor-pointer"
        onClick={onClear}
      >
        <AiOutlineClear />
        Clear All
      </button>
    </div>
  );
};

export default Toolbar;
