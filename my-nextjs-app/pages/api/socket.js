import { Server } from "ws";

export default function handler(req, res) {
  if (!res.socket.server.ws) {
    console.log("Creating WebSocket server...");

    // Create WebSocket server
    const wss = new Server({ server: res.socket.server });

    // Connect to Binance WebSocket
    const binanceWs = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1m");

    binanceWs.onmessage = (event) => {
      const data = event.data;
      console.log("📩 Received from Binance:", data);

      // Broadcast to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(data);
        }
      });
    };

    // Handle client connections
    wss.on("connection", (ws) => {
      console.log("✅ New client connected");

      ws.send(JSON.stringify({ message: "Connected to WebSocket server!" }));

      ws.on("close", () => {
        console.log("❌ Client disconnected");
      });
    });

    res.socket.server.ws = wss;
  }

  res.end();
}
