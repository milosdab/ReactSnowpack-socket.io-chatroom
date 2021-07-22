const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  
  socket.on("chat", (payload) => {
    console.log("What is payload", payload);
    socket.broadcast.emit("chat", payload);
  });
});

// app.listen(5000, () => console.log("server is active..."));

server.listen(5000, () => {
  console.log("Server is listening at port 5000...");
});
