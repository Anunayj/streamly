import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import ACTIONS from "./frontend/shared/Actions.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const NODE_ENV = process.env.NODE_ENV || 'production';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (for development)
    methods: ["GET", "POST"],
  },
});

if(NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}else{
  app.get("/", (req, res) => {
    res.send("Server is running in development mode, please use frontend app port to interact with the server");
  });
}

const userSocketMap = {};

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.PLAY, ({ roomId, currentTime }) => {
    socket.in(roomId).emit(ACTIONS.PLAY, { currentTime });
  });

  socket.on(ACTIONS.PAUSE, ({ roomId, currentTime }) => {
    socket.in(roomId).emit(ACTIONS.PAUSE, { currentTime });
  });

  socket.on(ACTIONS.SEEK, ({ roomId, currentTime }) => {
    socket.in(roomId).emit(ACTIONS.SEEK, { currentTime });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on ${PORT}`));
