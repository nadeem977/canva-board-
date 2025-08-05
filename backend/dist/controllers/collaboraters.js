let rectangles = [];
export const handleCanvasEvents = (io, socket) => {
    io.emit("user:count", io.of("/").sockets.size);
    socket.emit("init", rectangles);
    socket.on("rectangle:add", (rect) => {
        rectangles.push(rect);
        socket.broadcast.emit("rectangle:add", rect);
    });
    socket.on("rectangle:move", (updatedRect) => {
        rectangles = rectangles.map((r) => (r.id === updatedRect.id ? updatedRect : r));
        socket.broadcast.emit("rectangle:move", updatedRect);
    });
    socket.on("rectangle:delete", (id) => {
        rectangles = rectangles.filter((r) => r.id !== id);
        socket.broadcast.emit("rectangle:delete", id);
    });
    socket.on("canvas:clear", () => {
        rectangles = [];
        socket.broadcast.emit("canvas:clear");
    });
    io.on("connection", (socket) => {
        const count = io.engine.clientsCount;
        io.emit("user:count", count);
        socket.on("disconnect", () => {
            const count = io.engine.clientsCount;
            io.emit("user:count", count);
        });
    });
};
