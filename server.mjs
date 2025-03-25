import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import ACTIONS from "./frontend/shared/Actions.js";
import Database from "./database.js";

const db = Database.getInstance();
await db.connect();
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const NODE_ENV = process.env.NODE_ENV || 'production';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());

import jwt from "jsonwebtoken";
import bodyParser from "body-parser";

const JWT_SECRET = process.env.JWT_SECRET || "ABCDstreamly";

app.use(bodyParser.json());

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await db.addUser(username, email, password);
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to sign up user" });
  }
});

import cookieParser from "cookie-parser";
app.use(cookieParser());

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const username = await db.verifyUser(email, password);
    if (username) {
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        maxAge: 3600000, // 1 hour
      });
      res.status(200).json({ message: "Login successful", username });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to log in user" });
  }
});

app.get("/api/userinfo", async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;
    const [results] = await db.sequelize.query(
      "SELECT username FROM users WHERE email = ?",
      { replacements: [email] }
    );
    if (results.length > 0) {
      res.status(200).json({ username: results[0].username });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

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

  socket.on(ACTIONS.PLAY, ({ roomId, currentTime, username }) => {
      socket.join(roomId);
      const clients = getAllConnectedClients(roomId);
      clients.forEach(({ socketId }) => {
        io.to(socketId).emit(ACTIONS.PLAY, { currentTime, username });
      });
    });

    socket.on(ACTIONS.PAUSE, ({ roomId, currentTime, username }) => {
      socket.join(roomId);
      const clients = getAllConnectedClients(roomId);
      clients.forEach(({ socketId }) => {
        io.to(socketId).emit(ACTIONS.PAUSE, { currentTime, username });
      });
    });

    socket.on(ACTIONS.SEEK, ({ roomId, currentTime, username }) => {
      socket.join(roomId);
      const clients = getAllConnectedClients(roomId);
      clients.forEach(({ socketId }) => {
        io.to(socketId).emit(ACTIONS.SEEK, { currentTime, username });
      });
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

process.on('SIGINT', async () => {
  console.log("Closing database connection...");
  await db.close();
  process.exit(0);
});
