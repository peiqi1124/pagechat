const socket = new WebSocket("ws://localhost:9000");
socket.addEventListener("open", function (event) {
  console.log("连接成功");
});

export default socket;
