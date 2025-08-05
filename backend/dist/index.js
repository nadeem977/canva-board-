import express from "express";
import { createServer } from "http";
import cors from "cors";
import { initSocket } from "./config/socket.js";
const app = express();
app.use(cors());
app.use(express.json());
const server = createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    initSocket(server);
    console.log(`Server running on port ${PORT}`);
});
