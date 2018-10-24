const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });
 
let pi;

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    if (data.user === 'pi') {
      pi = ws;
      return;
    }

    pi.send(data.message);
  });
});