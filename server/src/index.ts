import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8000 });

const rooms = new Map<string, Set<WebSocket>>();
const userRoom = new Map<WebSocket, string>();
const userNames = new Map<WebSocket, string>();

wss.on("connection", (socket) => {
  console.log("new connection");

  socket.on("message", (e) => {
    try {
      const parsed = JSON.parse(e.toString());

      // set name + join room
      if (parsed.type === "join") {
  const { name, room } = parsed;

  const prevRoom = userRoom.get(socket);
  if (prevRoom && rooms.has(prevRoom)) {
    rooms.get(prevRoom)!.delete(socket);

    // optional: notify others you left
    rooms.get(prevRoom)!.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== socket) {
        client.send(
          JSON.stringify({
            type: 'notice',
            text: `${name} left the room.`,
          })
        );
      }
    });
  }

  userNames.set(socket, name);
  userRoom.set(socket, room);

  if (!rooms.has(room)) {
    rooms.set(room, new Set());
  }
  rooms.get(room)!.add(socket);

  // notify join
  rooms.get(room)!.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== socket) {
      client.send(`${name} joined room ${room}`);
    }
  });

  return;
}


      // Step 2: message
      if (parsed.type === "message") {
        const name = userNames.get(socket) || "Anonymous";
        const room = userRoom.get(socket);
        const text = parsed.text;

        if (!room) return; // user hasn't joined a room

        const payload = JSON.stringify({
          type: "message",
          name,
          text,
        });

        rooms.get(room)?.forEach((client) => {
          if (client.readyState === WebSocket.OPEN ) {
            client.send(payload);
          }
        });
      }
    } catch (err) {
      console.error("failed to parse msg:", err);
    }
  });

  socket.on("close", () => {
    const room = userRoom.get(socket);
    const name = userNames.get(socket) || "Anonymous";

    if (room && rooms.has(room)) {
      rooms.get(room)!.delete(socket);

      // broadcast to remaining clients in room
      const payload = JSON.stringify({
        type: "notice",
        text: `${name} left the room.`,
      });

      rooms.get(room)!.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== socket) {
          client.send(payload);
        }
      });
    }

    userRoom.delete(socket);
    userNames.delete(socket);

    console.log(`${name} disconnected from room ${room}`);
  });

});
