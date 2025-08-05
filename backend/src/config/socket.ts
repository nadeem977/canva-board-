import { Server } from "socket.io";
import { handleCanvasEvents } from "../controllers/collaboraters.js";  

export const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {
    handleCanvasEvents(io, socket);
    console.log("Client connected:", socket.id);
  });

  return io;
};
