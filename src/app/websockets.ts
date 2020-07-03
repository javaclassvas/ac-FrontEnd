import openSocket from "socket.io-client";

const socket = openSocket({
  transports: ["websocket"]
});

export default socket;
