import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:5000", {
  transports: ["websocket"],
  autoConnect: true
});

export { socket };
