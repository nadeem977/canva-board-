import { create } from "zustand";
import type { Shape } from "../interfaces/types";

interface StoreState {
  shapes: Shape[];
  addShape: (shape: Shape) => void;
  updateShape: (shape: Shape) => void;
  removeShape: (id: string) => void;
  clearAll: () => void;
  setShapes: (shapes: Shape[]) => void;
}

const useStore = create<StoreState>((set) => ({
  shapes: [],
  addShape: (shape) => set((state) => ({ shapes: [...state.shapes, shape] })),
  updateShape: (shape) =>
    set((state) => ({
      shapes: state.shapes.map((s) => (s.id === shape.id ? shape : s)),
    })),
  removeShape: (id) =>
    set((state) => ({ shapes: state.shapes.filter((s) => s.id !== id) })),
  clearAll: () => set({ shapes: [] }),
  setShapes: (shapes) => set({ shapes }),
}));

export default useStore;
