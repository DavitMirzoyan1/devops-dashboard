import express from "express";
import { WebSocketServer } from "ws";
import http from "http";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const regions = [
  "us-east",
  "eu-west",
  "eu-central",
  "us-west",
  "sa-east",
  "ap-southeast",
];

let latestData: any = {};
let lastUpdated: string = "";

async function fetchData() {
    const newData: any = {};
  
    await Promise.all(
      regions.map(async (region) => {
        try {
          const res = await fetch(`https://data--${region}.upscope.io/status?stats=1`);
          const data = await res.json();
          newData[region] = data;
        } catch {
          newData[region] = { error: true, message: "Failed to fetch" };
        }
      })
    );
  
    latestData = newData;
    lastUpdated = new Date().toISOString();
  
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ data: latestData, lastUpdated }));
    });
}

setInterval(fetchData, 15000);

wss.on("connection", (ws) => {
    ws.send(JSON.stringify({ data: latestData, lastUpdated}));
});

server.listen(3001, () => console.log("Server on http://localhost:3001"));
