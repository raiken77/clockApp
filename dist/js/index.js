(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wristwatch = exports.Wristwatch = function () {
  function Wristwatch() {
    _classCallCheck(this, Wristwatch);

    this._image = new Image();
    this._loaded = false;
    image.onload = function () {
      didload();
    };
    image.src = "./assets/static/clockresized.png";
  }

  _createClass(Wristwatch, [{
    key: "didload",
    value: function didload() {
      console.log("image loaded");
      this._loaded = true;
    }
  }, {
    key: "setXpos",
    set: function set(xPos) {
      this._xpos = xPos;
    }
  }, {
    key: "setYpos",
    set: function set(yPos) {
      this._ypos = yPos;
    }
  }, {
    key: "getXpos",
    get: function get() {
      return this._xpos;
    }
  }, {
    key: "getYpos",
    get: function get() {
      return this_ypos;
    }
  }]);

  return Wristwatch;
}();

},{}],2:[function(require,module,exports){
"use strict";

var _clock = require("./clock.js");

var wristWatch = new _clock.Wristwatch();
// var maincanvas = document.getElementById('mycanvas');
// var minuteHandCanvas = document.getElementById('minutehandCanvas');
// var ctx = maincanvas.getContext('2d');
// var minuteHandContext = minuteHandCanvas.getContext('2d');
// var hours = 0;
// var minutes = 0;
//
//
//
//
// maincanvas.width = window.innerWidth;
// maincanvas.height = window.innerHeight;
//
// minuteHandCanvas.width = window.innerWidth;
// minuteHandCanvas.height = window.innerHeight;
//
// var imagesToLoad =
//   {
//     background: "./assets/static/background.jpg",
//     wristWatch: "./assets/static/clockresized.png",
//     digitalWatch: "./assets/static/digital_times_resized.png",
//     clockBtn: "./assets/static/clockbtnresized.png",
//     minuteHand: "./assets/dynamic/hands/minutehandresized.png",
//     hourHand: "./assets/dynamic/hands/hourhandresized.png",
//     // hand: "./hand.png",
//     // pinch: "./pinch.png",
//     semicolon: "./assets/static/semicolon.png",
//     upArrow: "./assets/static/upArrow.png",
//     downArrow: "./assets/static/downArrow.png"
//
//   };
//
// function loadNumbers() {
//   for (i = 0; i <= 59; i++) {
//     imagesToLoad[i.toString()] = "./assets/dynamic/numbers/" + i + ".png";
//   }
// }
//
// function preloadImages(imagesPath, drawImages) {
//   loadNumbers();
//
//   var images = {};
//   var imagesLoaded = 0;
//   var numImages = 0;
//
//   for (var image in imagesPath) {
//     numImages++;
//   }
//
//   for (var image in imagesPath) {
//     images[image] = new Image();
//     images[image].onload = () => {
//       if (++imagesLoaded >= numImages) {
//         drawImages(images);
//       }
//     };
//     images[image].src = imagesPath[image];
//   }
// }
//
// function test() {
//   console.log("in here");
// }
//
//
//
//
//
// preloadImages(imagesToLoad, (images) => {
//   var clockXpos = maincanvas.width/4 - images.wristWatch.width;
//   var clockYPos = maincanvas.height / 4;
//   var minutehandXpos = (clockXpos + images.wristWatch.width/2 - images.minuteHand.width/2 );
//   var minutehandYpos = ((maincanvas.height / 4) + (images.wristWatch.height / 2) - images.minuteHand.height);
//   var clockBtnXpos = clockXpos + images.wristWatch.width;
//   var clockBtnYpos = (images.wristWatch.height / 2 + maincanvas.height / 4) - (images.clockBtn.height / 2);
//
//   var hourHandXpos = (clockXpos + images.wristWatch.width/2 - images.hourHand.width/2);
//   var hourHandYpos = ((minuteHandCanvas.height / 4) + (images.wristWatch.height / 2) - images.hourHand.height);
//   var hoursXPos = images["12"].width / 2 + maincanvas.width / 2;
//   var hoursYpos = maincanvas.height / 2 - images["12"].height / 2;
//   var semicolonXPos = hoursXPos + images["digitalWatch"].width / 4;
//   var semicolonYPos = hourHandYpos - images["digitalWatch"].height / 5;
//   var minuteXpos = images["12"].width / 2 + semicolonXPos;
//   var minuteYpos = hoursYpos
//   var upArrowYpos = clockBtnYpos - images.upArrow.height ;
//   var downArrowYpos = clockBtnYpos + images.clockBtn.height;
//   var angle = 0;
//   var hourhandAngle = 0;
//
//   ctx.drawImage(images.background, 0, 0);
//   ctx.drawImage(images.wristWatch, clockXpos, clockYPos);
//
//   ctx.drawImage(images.clockBtn, clockBtnXpos, clockBtnYpos);
//   minuteHandContext.drawImage(images.hourHand, hourHandXpos, hourHandYpos);
//   minuteHandContext.drawImage(images.minuteHand, minutehandXpos, minutehandYpos);
//   ctx.drawImage(images.digitalWatch, (maincanvas.width * 3) / 6, (images.wristWatch.height/2 + maincanvas.height/4) - (images.digitalWatch.height/2));
//   minuteHandContext.drawImage(images["14"], hoursXPos, hoursYpos);
//   ctx.drawImage(images["semicolon"], semicolonXPos, semicolonYPos);
//   minuteHandContext.drawImage(images["0"], minuteXpos, minuteYpos);
//   ctx.drawImage(images.upArrow,clockBtnXpos,upArrowYpos);
//   ctx.drawImage(images.downArrow,clockBtnXpos,downArrowYpos);
//
//
//
//   minuteHandCanvas.addEventListener("mousedown", () => {
//
//     if ((event.clientX >= clockBtnXpos && event.clientX <= (clockBtnXpos + images.clockBtn.width))) {
//
//       if(event.clientY >= upArrowYpos && event.clientY <= (upArrowYpos + images.upArrow.height))
//       {
//           minuteHandContext.clearRect(0, 0, minuteHandCanvas.width, minuteHandCanvas.height);
//
//           minuteHandContext.save();
//           angle += 6;
//           minuteHandContext.translate(minutehandXpos + images.minuteHand.width / 2, minutehandYpos + images.minuteHand.height);
//           minuteHandContext.rotate(angle * (Math.PI / 180));
//           minuteHandContext.translate(-(minutehandXpos + images.minuteHand.width / 2), -(minutehandYpos + images.minuteHand.height));
//           minuteHandContext.drawImage(images.minuteHand, minutehandXpos, minutehandYpos);
//
//           minuteHandContext.restore();
//
//           minuteHandContext.save();
//           hourhandAngle += 0.5;
//           minuteHandContext.translate(hourHandXpos + images.hourHand.width / 2, hourHandYpos + images.hourHand.height);
//           minuteHandContext.rotate(hourhandAngle * (Math.PI / 180));
//           minuteHandContext.translate(-(hourHandXpos + images.hourHand.width / 2), -(hourHandYpos + images.hourHand.height));
//           minuteHandContext.drawImage(images.hourHand, hourHandXpos, hourHandYpos);
//
//           minuteHandContext.restore();
//
//           minutes++;
//           if (minutes % 60 == 0) {
//             hours++;
//             minutes = 0;
//           }
//
//           hours = (hours > 12) ? hours - 12 : hours;
//
//           minuteHandContext.drawImage(images[Math.abs(hours).toString()], hoursXPos, hoursYpos);
//           minuteHandContext.drawImage(images[Math.abs(minutes).toString()], minuteXpos, minuteYpos);
//       }
//       else if(event.clientY >= downArrowYpos && event.clientY <= (downArrowYpos + images.downArrow.height))
//       {
//           minuteHandContext.clearRect(0, 0, minuteHandCanvas.width, minuteHandCanvas.height);
//
//           minuteHandContext.save();
//           angle -= 6;
//           minuteHandContext.translate(minutehandXpos + images.minuteHand.width / 2, minutehandYpos + images.minuteHand.height);
//           minuteHandContext.rotate(angle * (Math.PI / 180));
//           minuteHandContext.translate(-(minutehandXpos + images.minuteHand.width / 2), -(minutehandYpos + images.minuteHand.height));
//
//           minuteHandContext.drawImage(images.minuteHand, minutehandXpos, minutehandYpos);
//
//           minuteHandContext.restore();
//
//           minuteHandContext.save();
//           hourhandAngle -= 0.5;
//           minuteHandContext.translate(hourHandXpos + images.hourHand.width / 2, hourHandYpos + images.hourHand.height);
//           minuteHandContext.rotate(hourhandAngle * (Math.PI / 180));
//
//           minuteHandContext.translate(-(hourHandXpos + images.hourHand.width / 2), -(hourHandYpos + images.hourHand.height));
//           minuteHandContext.drawImage(images.hourHand, hourHandXpos, hourHandYpos);
//
//           minuteHandContext.restore();
//
//           minutes--;
//           if (minutes < 0) {
//             hours--;
//             minutes = 59;
//           }
//           hours = (hours <= 0) ? 12 : hours;
//           minuteHandContext.drawImage(images[Math.abs(hours).toString()], hoursXPos, hoursYpos);
//           minuteHandContext.drawImage(images[Math.abs(minutes).toString()], minuteXpos, minuteYpos);
//       }
//     }
//   });
//
// });

},{"./clock.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvY2xvY2suanMiLCJhcHAvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQ2EsVSxXQUFBLFU7QUFDWCx3QkFBYTtBQUFBOztBQUNYLFNBQUssTUFBTCxHQUFjLElBQUksS0FBSixFQUFkO0FBQ0EsU0FBSyxPQUFMLEdBQWUsS0FBZjtBQUNBLFVBQU0sTUFBTixHQUFlLFlBQUs7QUFDbEI7QUFDRCxLQUZEO0FBR0EsVUFBTSxHQUFOLEdBQVksa0NBQVo7QUFFRDs7Ozs4QkFHRDtBQUNFLGNBQVEsR0FBUixDQUFZLGNBQVo7QUFDQSxXQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7OztzQkFFWSxJLEVBQ2I7QUFDRSxXQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0Q7OztzQkFFWSxJLEVBQ2I7QUFDRSxXQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0Q7Ozt3QkFHRDtBQUNFLGFBQU8sS0FBSyxLQUFaO0FBQ0Q7Ozt3QkFFRDtBQUNFLGFBQU8sU0FBUDtBQUNEOzs7Ozs7Ozs7QUNsQ0g7O0FBRUEsSUFBSSxhQUFhLHVCQUFqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuZXhwb3J0IGNsYXNzIFdyaXN0d2F0Y2gge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuX2ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgdGhpcy5fbG9hZGVkID0gZmFsc2U7XG4gICAgaW1hZ2Uub25sb2FkID0gKCkgPT57XG4gICAgICBkaWRsb2FkKCk7XG4gICAgfTtcbiAgICBpbWFnZS5zcmMgPSBcIi4vYXNzZXRzL3N0YXRpYy9jbG9ja3Jlc2l6ZWQucG5nXCI7XG5cbiAgfVxuXG4gICBkaWRsb2FkKClcbiAge1xuICAgIGNvbnNvbGUubG9nKFwiaW1hZ2UgbG9hZGVkXCIpO1xuICAgIHRoaXMuX2xvYWRlZCA9IHRydWU7XG4gIH1cblxuICAgc2V0IHNldFhwb3MoeFBvcylcbiAge1xuICAgIHRoaXMuX3hwb3MgPSB4UG9zO1xuICB9XG5cbiAgIHNldCBzZXRZcG9zKHlQb3MpXG4gIHtcbiAgICB0aGlzLl95cG9zID0geVBvcztcbiAgfVxuXG4gICBnZXQgZ2V0WHBvcygpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5feHBvcztcbiAgfVxuICAgZ2V0IGdldFlwb3MoKVxuICB7XG4gICAgcmV0dXJuIHRoaXNfeXBvcztcbiAgfVxufVxuIiwiXG5pbXBvcnQge1dyaXN0d2F0Y2h9IGZyb20gXCIuL2Nsb2NrLmpzXCJcblxudmFyIHdyaXN0V2F0Y2ggPSBuZXcgV3Jpc3R3YXRjaCgpO1xuLy8gdmFyIG1haW5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXljYW52YXMnKTtcbi8vIHZhciBtaW51dGVIYW5kQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbnV0ZWhhbmRDYW52YXMnKTtcbi8vIHZhciBjdHggPSBtYWluY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4vLyB2YXIgbWludXRlSGFuZENvbnRleHQgPSBtaW51dGVIYW5kQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4vLyB2YXIgaG91cnMgPSAwO1xuLy8gdmFyIG1pbnV0ZXMgPSAwO1xuLy9cbi8vXG4vL1xuLy9cbi8vIG1haW5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vIG1haW5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuLy9cbi8vIG1pbnV0ZUhhbmRDYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vIG1pbnV0ZUhhbmRDYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuLy9cbi8vIHZhciBpbWFnZXNUb0xvYWQgPVxuLy8gICB7XG4vLyAgICAgYmFja2dyb3VuZDogXCIuL2Fzc2V0cy9zdGF0aWMvYmFja2dyb3VuZC5qcGdcIixcbi8vICAgICB3cmlzdFdhdGNoOiBcIi4vYXNzZXRzL3N0YXRpYy9jbG9ja3Jlc2l6ZWQucG5nXCIsXG4vLyAgICAgZGlnaXRhbFdhdGNoOiBcIi4vYXNzZXRzL3N0YXRpYy9kaWdpdGFsX3RpbWVzX3Jlc2l6ZWQucG5nXCIsXG4vLyAgICAgY2xvY2tCdG46IFwiLi9hc3NldHMvc3RhdGljL2Nsb2NrYnRucmVzaXplZC5wbmdcIixcbi8vICAgICBtaW51dGVIYW5kOiBcIi4vYXNzZXRzL2R5bmFtaWMvaGFuZHMvbWludXRlaGFuZHJlc2l6ZWQucG5nXCIsXG4vLyAgICAgaG91ckhhbmQ6IFwiLi9hc3NldHMvZHluYW1pYy9oYW5kcy9ob3VyaGFuZHJlc2l6ZWQucG5nXCIsXG4vLyAgICAgLy8gaGFuZDogXCIuL2hhbmQucG5nXCIsXG4vLyAgICAgLy8gcGluY2g6IFwiLi9waW5jaC5wbmdcIixcbi8vICAgICBzZW1pY29sb246IFwiLi9hc3NldHMvc3RhdGljL3NlbWljb2xvbi5wbmdcIixcbi8vICAgICB1cEFycm93OiBcIi4vYXNzZXRzL3N0YXRpYy91cEFycm93LnBuZ1wiLFxuLy8gICAgIGRvd25BcnJvdzogXCIuL2Fzc2V0cy9zdGF0aWMvZG93bkFycm93LnBuZ1wiXG4vL1xuLy8gICB9O1xuLy9cbi8vIGZ1bmN0aW9uIGxvYWROdW1iZXJzKCkge1xuLy8gICBmb3IgKGkgPSAwOyBpIDw9IDU5OyBpKyspIHtcbi8vICAgICBpbWFnZXNUb0xvYWRbaS50b1N0cmluZygpXSA9IFwiLi9hc3NldHMvZHluYW1pYy9udW1iZXJzL1wiICsgaSArIFwiLnBuZ1wiO1xuLy8gICB9XG4vLyB9XG4vL1xuLy8gZnVuY3Rpb24gcHJlbG9hZEltYWdlcyhpbWFnZXNQYXRoLCBkcmF3SW1hZ2VzKSB7XG4vLyAgIGxvYWROdW1iZXJzKCk7XG4vL1xuLy8gICB2YXIgaW1hZ2VzID0ge307XG4vLyAgIHZhciBpbWFnZXNMb2FkZWQgPSAwO1xuLy8gICB2YXIgbnVtSW1hZ2VzID0gMDtcbi8vXG4vLyAgIGZvciAodmFyIGltYWdlIGluIGltYWdlc1BhdGgpIHtcbi8vICAgICBudW1JbWFnZXMrKztcbi8vICAgfVxuLy9cbi8vICAgZm9yICh2YXIgaW1hZ2UgaW4gaW1hZ2VzUGF0aCkge1xuLy8gICAgIGltYWdlc1tpbWFnZV0gPSBuZXcgSW1hZ2UoKTtcbi8vICAgICBpbWFnZXNbaW1hZ2VdLm9ubG9hZCA9ICgpID0+IHtcbi8vICAgICAgIGlmICgrK2ltYWdlc0xvYWRlZCA+PSBudW1JbWFnZXMpIHtcbi8vICAgICAgICAgZHJhd0ltYWdlcyhpbWFnZXMpO1xuLy8gICAgICAgfVxuLy8gICAgIH07XG4vLyAgICAgaW1hZ2VzW2ltYWdlXS5zcmMgPSBpbWFnZXNQYXRoW2ltYWdlXTtcbi8vICAgfVxuLy8gfVxuLy9cbi8vIGZ1bmN0aW9uIHRlc3QoKSB7XG4vLyAgIGNvbnNvbGUubG9nKFwiaW4gaGVyZVwiKTtcbi8vIH1cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy8gcHJlbG9hZEltYWdlcyhpbWFnZXNUb0xvYWQsIChpbWFnZXMpID0+IHtcbi8vICAgdmFyIGNsb2NrWHBvcyA9IG1haW5jYW52YXMud2lkdGgvNCAtIGltYWdlcy53cmlzdFdhdGNoLndpZHRoO1xuLy8gICB2YXIgY2xvY2tZUG9zID0gbWFpbmNhbnZhcy5oZWlnaHQgLyA0O1xuLy8gICB2YXIgbWludXRlaGFuZFhwb3MgPSAoY2xvY2tYcG9zICsgaW1hZ2VzLndyaXN0V2F0Y2gud2lkdGgvMiAtIGltYWdlcy5taW51dGVIYW5kLndpZHRoLzIgKTtcbi8vICAgdmFyIG1pbnV0ZWhhbmRZcG9zID0gKChtYWluY2FudmFzLmhlaWdodCAvIDQpICsgKGltYWdlcy53cmlzdFdhdGNoLmhlaWdodCAvIDIpIC0gaW1hZ2VzLm1pbnV0ZUhhbmQuaGVpZ2h0KTtcbi8vICAgdmFyIGNsb2NrQnRuWHBvcyA9IGNsb2NrWHBvcyArIGltYWdlcy53cmlzdFdhdGNoLndpZHRoO1xuLy8gICB2YXIgY2xvY2tCdG5ZcG9zID0gKGltYWdlcy53cmlzdFdhdGNoLmhlaWdodCAvIDIgKyBtYWluY2FudmFzLmhlaWdodCAvIDQpIC0gKGltYWdlcy5jbG9ja0J0bi5oZWlnaHQgLyAyKTtcbi8vXG4vLyAgIHZhciBob3VySGFuZFhwb3MgPSAoY2xvY2tYcG9zICsgaW1hZ2VzLndyaXN0V2F0Y2gud2lkdGgvMiAtIGltYWdlcy5ob3VySGFuZC53aWR0aC8yKTtcbi8vICAgdmFyIGhvdXJIYW5kWXBvcyA9ICgobWludXRlSGFuZENhbnZhcy5oZWlnaHQgLyA0KSArIChpbWFnZXMud3Jpc3RXYXRjaC5oZWlnaHQgLyAyKSAtIGltYWdlcy5ob3VySGFuZC5oZWlnaHQpO1xuLy8gICB2YXIgaG91cnNYUG9zID0gaW1hZ2VzW1wiMTJcIl0ud2lkdGggLyAyICsgbWFpbmNhbnZhcy53aWR0aCAvIDI7XG4vLyAgIHZhciBob3Vyc1lwb3MgPSBtYWluY2FudmFzLmhlaWdodCAvIDIgLSBpbWFnZXNbXCIxMlwiXS5oZWlnaHQgLyAyO1xuLy8gICB2YXIgc2VtaWNvbG9uWFBvcyA9IGhvdXJzWFBvcyArIGltYWdlc1tcImRpZ2l0YWxXYXRjaFwiXS53aWR0aCAvIDQ7XG4vLyAgIHZhciBzZW1pY29sb25ZUG9zID0gaG91ckhhbmRZcG9zIC0gaW1hZ2VzW1wiZGlnaXRhbFdhdGNoXCJdLmhlaWdodCAvIDU7XG4vLyAgIHZhciBtaW51dGVYcG9zID0gaW1hZ2VzW1wiMTJcIl0ud2lkdGggLyAyICsgc2VtaWNvbG9uWFBvcztcbi8vICAgdmFyIG1pbnV0ZVlwb3MgPSBob3Vyc1lwb3Ncbi8vICAgdmFyIHVwQXJyb3dZcG9zID0gY2xvY2tCdG5ZcG9zIC0gaW1hZ2VzLnVwQXJyb3cuaGVpZ2h0IDtcbi8vICAgdmFyIGRvd25BcnJvd1lwb3MgPSBjbG9ja0J0bllwb3MgKyBpbWFnZXMuY2xvY2tCdG4uaGVpZ2h0O1xuLy8gICB2YXIgYW5nbGUgPSAwO1xuLy8gICB2YXIgaG91cmhhbmRBbmdsZSA9IDA7XG4vL1xuLy8gICBjdHguZHJhd0ltYWdlKGltYWdlcy5iYWNrZ3JvdW5kLCAwLCAwKTtcbi8vICAgY3R4LmRyYXdJbWFnZShpbWFnZXMud3Jpc3RXYXRjaCwgY2xvY2tYcG9zLCBjbG9ja1lQb3MpO1xuLy9cbi8vICAgY3R4LmRyYXdJbWFnZShpbWFnZXMuY2xvY2tCdG4sIGNsb2NrQnRuWHBvcywgY2xvY2tCdG5ZcG9zKTtcbi8vICAgbWludXRlSGFuZENvbnRleHQuZHJhd0ltYWdlKGltYWdlcy5ob3VySGFuZCwgaG91ckhhbmRYcG9zLCBob3VySGFuZFlwb3MpO1xuLy8gICBtaW51dGVIYW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLm1pbnV0ZUhhbmQsIG1pbnV0ZWhhbmRYcG9zLCBtaW51dGVoYW5kWXBvcyk7XG4vLyAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2VzLmRpZ2l0YWxXYXRjaCwgKG1haW5jYW52YXMud2lkdGggKiAzKSAvIDYsIChpbWFnZXMud3Jpc3RXYXRjaC5oZWlnaHQvMiArIG1haW5jYW52YXMuaGVpZ2h0LzQpIC0gKGltYWdlcy5kaWdpdGFsV2F0Y2guaGVpZ2h0LzIpKTtcbi8vICAgbWludXRlSGFuZENvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tcIjE0XCJdLCBob3Vyc1hQb3MsIGhvdXJzWXBvcyk7XG4vLyAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2VzW1wic2VtaWNvbG9uXCJdLCBzZW1pY29sb25YUG9zLCBzZW1pY29sb25ZUG9zKTtcbi8vICAgbWludXRlSGFuZENvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tcIjBcIl0sIG1pbnV0ZVhwb3MsIG1pbnV0ZVlwb3MpO1xuLy8gICBjdHguZHJhd0ltYWdlKGltYWdlcy51cEFycm93LGNsb2NrQnRuWHBvcyx1cEFycm93WXBvcyk7XG4vLyAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2VzLmRvd25BcnJvdyxjbG9ja0J0blhwb3MsZG93bkFycm93WXBvcyk7XG4vL1xuLy9cbi8vXG4vLyAgIG1pbnV0ZUhhbmRDYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoKSA9PiB7XG4vL1xuLy8gICAgIGlmICgoZXZlbnQuY2xpZW50WCA+PSBjbG9ja0J0blhwb3MgJiYgZXZlbnQuY2xpZW50WCA8PSAoY2xvY2tCdG5YcG9zICsgaW1hZ2VzLmNsb2NrQnRuLndpZHRoKSkpIHtcbi8vXG4vLyAgICAgICBpZihldmVudC5jbGllbnRZID49IHVwQXJyb3dZcG9zICYmIGV2ZW50LmNsaWVudFkgPD0gKHVwQXJyb3dZcG9zICsgaW1hZ2VzLnVwQXJyb3cuaGVpZ2h0KSlcbi8vICAgICAgIHtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgbWludXRlSGFuZENhbnZhcy53aWR0aCwgbWludXRlSGFuZENhbnZhcy5oZWlnaHQpO1xuLy9cbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5zYXZlKCk7XG4vLyAgICAgICAgICAgYW5nbGUgKz0gNjtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC50cmFuc2xhdGUobWludXRlaGFuZFhwb3MgKyBpbWFnZXMubWludXRlSGFuZC53aWR0aCAvIDIsIG1pbnV0ZWhhbmRZcG9zICsgaW1hZ2VzLm1pbnV0ZUhhbmQuaGVpZ2h0KTtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5yb3RhdGUoYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCkpO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnRyYW5zbGF0ZSgtKG1pbnV0ZWhhbmRYcG9zICsgaW1hZ2VzLm1pbnV0ZUhhbmQud2lkdGggLyAyKSwgLShtaW51dGVoYW5kWXBvcyArIGltYWdlcy5taW51dGVIYW5kLmhlaWdodCkpO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LmRyYXdJbWFnZShpbWFnZXMubWludXRlSGFuZCwgbWludXRlaGFuZFhwb3MsIG1pbnV0ZWhhbmRZcG9zKTtcbi8vXG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQucmVzdG9yZSgpO1xuLy9cbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5zYXZlKCk7XG4vLyAgICAgICAgICAgaG91cmhhbmRBbmdsZSArPSAwLjU7XG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQudHJhbnNsYXRlKGhvdXJIYW5kWHBvcyArIGltYWdlcy5ob3VySGFuZC53aWR0aCAvIDIsIGhvdXJIYW5kWXBvcyArIGltYWdlcy5ob3VySGFuZC5oZWlnaHQpO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnJvdGF0ZShob3VyaGFuZEFuZ2xlICogKE1hdGguUEkgLyAxODApKTtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC50cmFuc2xhdGUoLShob3VySGFuZFhwb3MgKyBpbWFnZXMuaG91ckhhbmQud2lkdGggLyAyKSwgLShob3VySGFuZFlwb3MgKyBpbWFnZXMuaG91ckhhbmQuaGVpZ2h0KSk7XG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQuZHJhd0ltYWdlKGltYWdlcy5ob3VySGFuZCwgaG91ckhhbmRYcG9zLCBob3VySGFuZFlwb3MpO1xuLy9cbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5yZXN0b3JlKCk7XG4vL1xuLy8gICAgICAgICAgIG1pbnV0ZXMrKztcbi8vICAgICAgICAgICBpZiAobWludXRlcyAlIDYwID09IDApIHtcbi8vICAgICAgICAgICAgIGhvdXJzKys7XG4vLyAgICAgICAgICAgICBtaW51dGVzID0gMDtcbi8vICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgIGhvdXJzID0gKGhvdXJzID4gMTIpID8gaG91cnMgLSAxMiA6IGhvdXJzO1xuLy9cbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW01hdGguYWJzKGhvdXJzKS50b1N0cmluZygpXSwgaG91cnNYUG9zLCBob3Vyc1lwb3MpO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LmRyYXdJbWFnZShpbWFnZXNbTWF0aC5hYnMobWludXRlcykudG9TdHJpbmcoKV0sIG1pbnV0ZVhwb3MsIG1pbnV0ZVlwb3MpO1xuLy8gICAgICAgfVxuLy8gICAgICAgZWxzZSBpZihldmVudC5jbGllbnRZID49IGRvd25BcnJvd1lwb3MgJiYgZXZlbnQuY2xpZW50WSA8PSAoZG93bkFycm93WXBvcyArIGltYWdlcy5kb3duQXJyb3cuaGVpZ2h0KSlcbi8vICAgICAgIHtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgbWludXRlSGFuZENhbnZhcy53aWR0aCwgbWludXRlSGFuZENhbnZhcy5oZWlnaHQpO1xuLy9cbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5zYXZlKCk7XG4vLyAgICAgICAgICAgYW5nbGUgLT0gNjtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC50cmFuc2xhdGUobWludXRlaGFuZFhwb3MgKyBpbWFnZXMubWludXRlSGFuZC53aWR0aCAvIDIsIG1pbnV0ZWhhbmRZcG9zICsgaW1hZ2VzLm1pbnV0ZUhhbmQuaGVpZ2h0KTtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5yb3RhdGUoYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCkpO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnRyYW5zbGF0ZSgtKG1pbnV0ZWhhbmRYcG9zICsgaW1hZ2VzLm1pbnV0ZUhhbmQud2lkdGggLyAyKSwgLShtaW51dGVoYW5kWXBvcyArIGltYWdlcy5taW51dGVIYW5kLmhlaWdodCkpO1xuLy9cbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLm1pbnV0ZUhhbmQsIG1pbnV0ZWhhbmRYcG9zLCBtaW51dGVoYW5kWXBvcyk7XG4vL1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnJlc3RvcmUoKTtcbi8vXG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQuc2F2ZSgpO1xuLy8gICAgICAgICAgIGhvdXJoYW5kQW5nbGUgLT0gMC41O1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnRyYW5zbGF0ZShob3VySGFuZFhwb3MgKyBpbWFnZXMuaG91ckhhbmQud2lkdGggLyAyLCBob3VySGFuZFlwb3MgKyBpbWFnZXMuaG91ckhhbmQuaGVpZ2h0KTtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5yb3RhdGUoaG91cmhhbmRBbmdsZSAqIChNYXRoLlBJIC8gMTgwKSk7XG4vL1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnRyYW5zbGF0ZSgtKGhvdXJIYW5kWHBvcyArIGltYWdlcy5ob3VySGFuZC53aWR0aCAvIDIpLCAtKGhvdXJIYW5kWXBvcyArIGltYWdlcy5ob3VySGFuZC5oZWlnaHQpKTtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLmhvdXJIYW5kLCBob3VySGFuZFhwb3MsIGhvdXJIYW5kWXBvcyk7XG4vL1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnJlc3RvcmUoKTtcbi8vXG4vLyAgICAgICAgICAgbWludXRlcy0tO1xuLy8gICAgICAgICAgIGlmIChtaW51dGVzIDwgMCkge1xuLy8gICAgICAgICAgICAgaG91cnMtLTtcbi8vICAgICAgICAgICAgIG1pbnV0ZXMgPSA1OTtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgaG91cnMgPSAoaG91cnMgPD0gMCkgPyAxMiA6IGhvdXJzO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LmRyYXdJbWFnZShpbWFnZXNbTWF0aC5hYnMoaG91cnMpLnRvU3RyaW5nKCldLCBob3Vyc1hQb3MsIGhvdXJzWXBvcyk7XG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tNYXRoLmFicyhtaW51dGVzKS50b1N0cmluZygpXSwgbWludXRlWHBvcywgbWludXRlWXBvcyk7XG4vLyAgICAgICB9XG4vLyAgICAgfVxuLy8gICB9KTtcbi8vXG4vLyB9KTtcbiJdfQ==
