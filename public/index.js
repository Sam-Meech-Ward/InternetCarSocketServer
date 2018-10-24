document.addEventListener("DOMContentLoaded", () => {

  function sendHTTPRequest(path) {
    console.log("sendHTTPRequest", path);
    const HTTP = new XMLHttpRequest();
    const url = 'https://internet-car.herokuapp.com/';
    HTTP.open("POST", url+path);
    HTTP.onreadystatechange = function() {
      console.log("done", this.readyState, this.status);
    }
    HTTP.send();
  }

  const car = {
    stopMoving() {
      sendHTTPRequest("stop_moving");
    },
    stopSteering() {
      sendHTTPRequest("stop_steering");
    },
    forward() {
      sendHTTPRequest("forward");
    },
    backward() {
      sendHTTPRequest("backward");
    },
    left() {
      sendHTTPRequest("left");
    },
    right() {
      sendHTTPRequest("right");
    }
  };

  /* Buttons */

  document.querySelector(".forward").addEventListener("mousedown", car.forward);
  document.querySelector(".backward").addEventListener("mousedown", car.backward);
  document.querySelector(".left").addEventListener("mousedown", car.left);
  document.querySelector(".right").addEventListener("mousedown", car.right);

  document.querySelector(".forward").addEventListener("mouseup", car.stopMoving);
  document.querySelector(".backward").addEventListener("mouseup", car.stopMoving);
  document.querySelector(".left").addEventListener("mouseup", car.stopSteering);
  document.querySelector(".right").addEventListener("mouseup", car.stopSteering);

  /* Keyboard */  

  function arrowKey(keyCode) {
    return {
      "40": "down", 
      "39": "right", 
      "37": "left", 
      "38": "up" 
    }[keyCode];
  }

  document.addEventListener("keydown", (event) => {
    switch (arrowKey(event.keyCode)) {
      case "down": car.backward(); break;
      case "left": car.left(); break;
      case "right": car.right(); break;
      case "up": car.forward(); break;
    }
  });
  
  document.addEventListener("keyup", (event) => {
    switch (arrowKey(event.keyCode)) {
      case "left":
      case "right": car.stopSteering(); break;
      case "down": 
      case "up": car.stopMoving(); break;
    }
  });

});