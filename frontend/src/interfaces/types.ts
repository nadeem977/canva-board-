export type Tool = "select" | "rectangle" | "draw" | "text";

export interface RectangleShape {
  id: string;
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  borderRadius?: number;
}

export interface TextShape {
  id: string;
  type: "text";
  x: number;
  y: number;
  text: string;
  color: string;
}

export interface DrawingShape {
  id: string;
  type: "drawing";
  points: number[];
  color: string;
}

export type Shape = RectangleShape | TextShape | DrawingShape;
