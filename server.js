const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
 
app.use(express.static('public'));

let pi;
function car() {
  return pi || {send: ()=>{}};
}
 
app.ws('/', function(ws, req) {
  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    if (data.user === 'pi') {
      pi = ws;
      return;
    }

    // pi.send(data.message);
  });
});

app.post("/forward", (req, res) => {
  car.send("forward");
  res.send("🤗");
});

app.post("/backward", (req, res) => {
  car().send("backward");
  res.send("🤗");
});

app.post("/stop_moving", (req, res) => {
  car().send("stop_moving");
  res.send("🤗");
});

app.post("/left", (req, res) => {
  car().send("left");
  res.send("🤗");
});

app.post("/right", (req, res) => {
  car().send("right");
  res.send("🤗");
});

app.post("/stop_steering", (req, res) => {
  car().send("stop_steering");
  res.send("🤗");
});
 
app.listen(process.env.PORT || 3000, () => console.log("listening"));
