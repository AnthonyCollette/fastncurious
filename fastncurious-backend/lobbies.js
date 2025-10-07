const lobbies = new Map();

// Generate a unique 4-character lobby code
function generateLobbyCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code;
  do {
    code = Array.from(
      { length: 6 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  } while (lobbies.has(code));
  return code;
}

function createLobby(socket, playerName, playerAvatar) {
  const lobbyCode = generateLobbyCode();
  lobbies.set(lobbyCode, {
    players: [{ id: socket.id, name: playerName, avatar: playerAvatar }],
    host: socket.id,
  });
  socket.join(lobbyCode);
  socket.emit("lobbyCreated", {
    lobbyCode,
    host: socket.id,
    players: lobbies.get(lobbyCode).players,
  });
  return lobbyCode;
}

function joinLobby(socket, io, lobbyCode, playerName, playerAvatar) {
  const lobby = lobbies.get(lobbyCode);

  if (!lobby) {
    socket.emit("errorLobbyNotFound", "Lobby inexistant");
    return;
  }
  if (lobby.players.length >= 8) {
    socket.emit("errorLobbyFull", "Lobby plein");
    return;
  }

  if (lobby.players.find((p) => p.id === socket.id)) {
    socket.emit("errorAlreadyInLobby", "Vous êtes déjà dans le lobby");
    return;
  }

  lobby.players.push({ id: socket.id, name: playerName, avatar: playerAvatar });
  socket.join(lobbyCode);

  io.to(lobbyCode).emit("lobbyUpdated", {
    host: lobby.host,
    players: lobby.players,
  });

  socket.emit("lobbyJoined", {
    lobbyCode,
    host: lobby.host,
    players: lobby.players,
  });
}

function disconnectLobby(socket, io) {
  lobbies.forEach((lobby, code) => {
    const index = lobby.players.findIndex((p) => p.id === socket.id);
    if (index !== -1) {
      lobby.players.splice(index, 1);
      io.to(code).emit("lobbyUpdated", {
        lobbdyCode: lobby.lobbyCode,
        host: lobby.host,
        players: lobby.players,
      });
    }
  });
}

module.exports = {
  generateLobbyCode,
  createLobby,
  joinLobby,
  disconnectLobby,
  lobbies,
};
