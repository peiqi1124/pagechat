const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });

wss.on("connection", function connection(ws) {
  console.log("连接成功");
  ws.on("message", function incoming(data) {
    ws.send("你好!");
  });
});
