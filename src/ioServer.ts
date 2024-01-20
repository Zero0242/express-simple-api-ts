import app from "./app";
import { Server } from "socket.io";
import { createServer, Server as HttpServer } from "http";

const httpServer: HttpServer = createServer(app);

const io = new Server(httpServer, {
  /* options */
});

io.use(async (socket, next) => {
  try {
    // here socket.handshake.auth.token is passed from client and it needs to be validated from DB or other sources..
    if (socket.handshake.auth.token === "aa") {
      next();
    } else {
      const err = new Error("unauthorized");
      next(err);
    }
  } catch (e) {
    next(new Error("unauthorized"));
  }
});

io.on("connect", (socket) => {
  // sending to the client
  socket.emit("hello", "can you hear me?", 1, 2, "abc");

  // sending to all clients except sender
  socket.broadcast.emit("broadcast", "hello friends!");

  // sending to all clients in 'game' room except sender
  socket.to("game").emit("nice game", "let's play a game");

  // sending to all clients in 'game' room, including sender
  io.in("game").emit("big-announcement", "the game will start soon");

  // sending to all connected clients
  io.emit("an event sent to all connected clients");
});

export default httpServer;
