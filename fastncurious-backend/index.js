const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const { createLobby, joinLobby, disconnectLobby } = require("./lobbies");
const { disconnect } = require("process");

const app = express();
const PORT = process.env.PORT || 3000;
const server = require("http").createServer(app);

// Middleware pour parser le JSON
app.use(cors()).use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`🔌 Nouvelle connexion : ${socket.id}`);

  socket.on("createLobby", (playerName, playerAvatar) =>
    createLobby(socket, playerName, playerAvatar)
  );

  socket.on("joinLobby", ({ lobbyCode, playerName, avatar }) => {
    joinLobby(socket, io, lobbyCode, playerName, avatar);
  });

  socket.on("disconnect", () => {
    disconnectLobby(socket, io);
  });

  socket.on("leaveLobby", () => {
    disconnectLobby(socket, io);
  });
});

app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur FastnCurious !");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
