import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import useStore from "./store";
import { socket } from "../services/socket";
import type { Shape,Tool } from '../interfaces/types';
import Toolbar from "./Toolbar";

const  CanvasBoard =()=> {


  const { shapes, addShape, updateShape, removeShape, clearAll,setShapes } = useStore();
  const [tool, setTool] = useState<Tool>("select");
  const isDrawing = useRef(false);

 
  useEffect(() => {
    socket.on("init", (serverShapes: Shape[]) => setShapes(serverShapes));
    socket.on("rectangle:add", (shape: Shape) => addShape(shape));
    socket.on("rectangle:move", (shape: Shape) => updateShape(shape));
    socket.on("rectangle:delete", (id: string) => removeShape(id));
    socket.on("canvas:clear", () => clearAll());

    return () => {
      socket.off("init");
      socket.off("rectangle:add");
      socket.off("rectangle:move");
      socket.off("rectangle:delete");
      socket.off("canvas:clear");
    };
  }, []);

  const handleAddRectangle = () => {
    const rect: Shape = {
      id: uuidv4(),
      type: "rectangle",
      x: 50,
      y: 50,
      width: 100,
      height: 60,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      borderRadius: 10
    };
    addShape(rect);
    socket.emit("rectangle:add", rect);
  };

  const handleAddText = () => {
    const text: Shape = {
      id: uuidv4(),
      type: "text",
      x: 100,
      y: 100,
      text: "double click to edit",
      color: "black"
    };
    addShape(text);
    socket.emit("rectangle:add", text);
  };

  const handleMouseDown = (e: any) => {
    if (tool === "draw") {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      const line: Shape = {
        id: uuidv4(),
        type: "drawing",
        points: [pos.x, pos.y],
        color: "black"
      };
      addShape(line);
      socket.emit("rectangle:add", line);
    }
  };

  const handleMouseMove = (e: any) => {

    
    if (!isDrawing.current || tool !== "draw") return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = shapes[shapes.length - 1];
    if (lastLine.type === "drawing") {
      const updatedLine = {
        ...lastLine,
        points: [...(lastLine.points || []), point.x, point.y]
      };
      updateShape(updatedLine);
      socket.emit("rectangle:move", updatedLine);
    }
  };

  const handleMouseUp = () => {
    if (tool === "draw") {
      isDrawing.current = false;
    }
  };

  const handleDelete = (id: string) => {
    removeShape(id);
    socket.emit("rectangle:delete", id);
  };

  const handleClear = () => {
    clearAll();
    socket.emit("canvas:clear");
  };

  return (
    <div>
      <Toolbar
        onAddRectangle={handleAddRectangle}
        onDrawMode={() => setTool("draw")}
        onAddText={handleAddText}
        onSelectMode={() => setTool("select")}
        onClear={handleClear}
      />

      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 50}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {shapes.map((shape) => {
            if (shape.type === "rectangle") {
              return (
                <Rect
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  borderRadius={shape.borderRadius}
                  fill={shape.color}
                  draggable={tool === "select"}
                  onDragMove={(e) => {
                    const updated = { ...shape, x: e.target.x(), y: e.target.y() };
                    updateShape(updated);
                    socket.emit("rectangle:move", updated);
                  }}
                  onContextMenu={(e) => {
                    e.evt.preventDefault();
                    handleDelete(shape.id);
                  }}
                />
              );
            }
            if (shape.type === "text") {
              return (
                <Text
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  text={shape.text || ""}
                  fontSize={20}
                  fill={shape.color}
                  draggable={tool === "select"}
                  onDragMove={(e) => {
                    const updated = { ...shape, x: e.target.x(), y: e.target.y() };
                    updateShape(updated);
                    socket.emit("rectangle:move", updated);
                  }}
                  onDblClick={() => {
                    const newText = prompt("Enter new text:", shape.text);
                    if (newText !== null) {
                      const updated = { ...shape, text: newText };
                      updateShape(updated);
                      socket.emit("rectangle:move", updated);
                    }
                  }}
                  onContextMenu={(e) => {
                    e.evt.preventDefault();
                    handleDelete(shape.id);
                  }}
                />
              );
            }
            if (shape.type === "drawing") {
              return (
                <Line
                  key={shape.id}
                  points={shape.points || []}
                  stroke={shape.color}
                  strokeWidth={2}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  onContextMenu={(e) => {
                    e.evt.preventDefault();
                    handleDelete(shape.id);
                  }}
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
}


export default CanvasBoard;