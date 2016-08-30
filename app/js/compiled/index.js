(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CustomImage = exports.CustomImage = function () {
  function CustomImage(filepath) {
    var _this = this;

    _classCallCheck(this, CustomImage);

    this._image = new Image();
    this._image.onload = function () {
      _this._loaded = true;
    };
    this._image.src = filepath;
  }

  _createClass(CustomImage, [{
    key: "inBoundingBox",
    value: function inBoundingBox(x, y) {

      return x >= this.xPos && x <= this.xPos + this.width && y >= this.yPos && y <= this.yPos + this.height;
    }
  }, {
    key: "xPos",
    set: function set(xPos) {
      this._xpos = xPos;
    },
    get: function get() {
      return this._xpos;
    }
  }, {
    key: "yPos",
    set: function set(yPos) {
      this._ypos = yPos;
    },
    get: function get() {
      return this._ypos;
    }
  }, {
    key: "image",
    get: function get() {
      return this._image;
    }
  }, {
    key: "didload",
    get: function get() {
      return this._loaded;
    }
  }, {
    key: "width",
    get: function get() {
      return this._image.width;
    }
  }, {
    key: "height",
    get: function get() {
      return this._image.height;
    }
  }]);

  return CustomImage;
}();

},{}],2:[function(require,module,exports){
'use strict';

var _image = require('./customImage/image.js');

var backgroundCanvas = document.getElementById('background');
var dynamicCanvas = document.getElementById('dynamic');
var dynamicContext = dynamicCanvas.getContext('2d');
var backgroundContext = backgroundCanvas.getContext('2d');

backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;

dynamicCanvas.width = window.innerWidth;
dynamicCanvas.height = window.innerHeight;

var minuteHandDegree = 6;
var hourHandDegree = 0.5;

var minuteHandxPos;
var minuteHandyPos;
var hourHandxPos;
var hourHandyPos;

var minuteHandAngle = 0;
var hourHandAngle = 0;

var minutes = 0;
var hours = 12;

var images = {
  background: new _image.CustomImage("./assets/static/background.jpg"),
  wristWatch: new _image.CustomImage("./assets/static/clockresized.png"),
  minuteHand: new _image.CustomImage("./assets/dynamic/hands/minutehandresized.png"),
  hourHand: new _image.CustomImage("./assets/dynamic/hands/hourhandresized.png"),
  clockBtn: new _image.CustomImage("./assets/static/clockbtnresized.png"),
  upArrow: new _image.CustomImage("./assets/static/upArrow.png"),
  downArrow: new _image.CustomImage("./assets/static/downArrow.png"),
  digitalWatch: new _image.CustomImage("./assets/static/digital_times_resized.png")
};

var imageloadObserver;

function checkIfloaded() {
  var imagesLoaded = 0;
  var numImages = 0;

  for (var image in images) {
    numImages++;
  }

  for (var image in images) {
    if (images[image].didload) {

      imagesLoaded++;
    }
  }
  if (imagesLoaded >= numImages) {

    clearInterval(imageloadObserver);
    setParameters();
  }
}

function addDigitalWatchNumbers() {
  for (var i = 0; i <= 59; i++) {
    images[i.toString()] = new _image.CustomImage("./assets/dynamic/numbers/" + i + ".png");
  }
}

function setParameters() {

  images.background.xPos = 0;
  images.background.yPos = 0;
  images.wristWatch.xPos = backgroundCanvas.width / 4 - images.wristWatch.width;
  images.wristWatch.yPos = backgroundCanvas.height / 4;
  images.minuteHand.xPos = images.wristWatch.xPos + images.wristWatch.width / 2 - images.minuteHand.width / 2;
  images.minuteHand.yPos = dynamicCanvas.height / 4 + images.wristWatch.height / 2 - images.minuteHand.height;
  images.hourHand.xPos = images.wristWatch.xPos + images.wristWatch.width / 2 - images.hourHand.width / 2;
  images.hourHand.yPos = images.wristWatch.yPos + images.wristWatch.height / 2 - images.hourHand.height;
  images.clockBtn.xPos = images.wristWatch.xPos + images.wristWatch.width;
  images.clockBtn.yPos = images.wristWatch.height / 2 + images.wristWatch.yPos - images.clockBtn.height / 2;
  images.digitalWatch.xPos = backgroundCanvas.width * 3 / 4 - images.digitalWatch.width;
  images.digitalWatch.yPos = images.wristWatch.height / 2 + backgroundCanvas.height / 4 - images.digitalWatch.height / 2;
  images.upArrow.xPos = images.clockBtn.xPos;
  images.upArrow.yPos = images.clockBtn.yPos - images.upArrow.height;
  images.downArrow.xPos = images.clockBtn.xPos;
  images.downArrow.yPos = images.clockBtn.yPos + images.clockBtn.height;

  hourHandxPos = images.digitalWatch.xPos + images.digitalWatch.width / 8;
  hourHandyPos = images.digitalWatch.yPos + images.digitalWatch.height / 2;
  minuteHandxPos = hourHandxPos + images.digitalWatch.width * 3 / 8;
  minuteHandyPos = hourHandyPos;

  backgroundContext.drawImage(images.background.image, images.background.xPos, images.background.yPos);
  backgroundContext.drawImage(images.wristWatch.image, images.wristWatch.xPos, images.wristWatch.yPos);
  backgroundContext.drawImage(images.clockBtn.image, images.clockBtn.xPos, images.clockBtn.yPos);
  backgroundContext.drawImage(images.digitalWatch.image, images.digitalWatch.xPos, images.digitalWatch.yPos);
  backgroundContext.drawImage(images.upArrow.image, images.upArrow.xPos, images.upArrow.yPos);
  backgroundContext.drawImage(images.downArrow.image, images.downArrow.xPos, images.downArrow.yPos);
  dynamicContext.drawImage(images.minuteHand.image, images.minuteHand.xPos, images.minuteHand.yPos);
  dynamicContext.drawImage(images.hourHand.image, images.minuteHand.xPos, images.hourHand.yPos);
  dynamicContext.font = '50pt verdana, sans-serif';
  dynamicContext.fillStyle = "#FFFFFF";
  backgroundContext.font = dynamicContext.font;
  backgroundContext.fillStyle = dynamicContext.fillStyle;
  dynamicContext.fillText("12", hourHandxPos, hourHandyPos);
  backgroundContext.fillText(":", hourHandxPos + 2 * images.digitalWatch.width / 8, hourHandyPos - 5);
  dynamicContext.fillText("00", minuteHandxPos, minuteHandyPos);
  setListeners();
}

function setListeners() {
  dynamicCanvas.addEventListener("mousemove", function () {

    // if (images.minuteHand.inBoundingBox(event.clientX, event.clientY)) {


    // dynamicCanvas.onmousemove = () => {
    console.log("xpos is :" + event.clientX);
    console.log("x mid point of minutehand is: " + (images.minuteHand.xPos + images.minuteHand.width / 2));
    var dx = event.clientX - images.minuteHand.xPos;
    var dy = event.clientY - images.minuteHand.yPos;
    var degrees = Math.atan2(dy, dx);
    // console.log(degrees);
    dynamicContext.clearRect(0, 0, dynamicCanvas.width, dynamicCanvas.height);
    rotateImage(degrees, images.minuteHand.xPos + images.minuteHand.width / 2, images.minuteHand.yPos + images.minuteHand.height, images.minuteHand);
    // rotateImage(hourHandAngle, images.hourHand.xPos + images.hourHand.width / 2, images.hourHand.yPos + images.hourHand.height, images.hourHand);
    // }
    // }
  });
}

function rotateImage(angle, translateXpos, translateYpos, imageObj) {
  dynamicContext.save();
  dynamicContext.translate(translateXpos, translateYpos);
  dynamicContext.rotate(angle);
  // dynamicContext.translate(-(translateXpos), - (translateYpos));
  dynamicContext.drawImage(imageObj.image, imageObj.width / 2, imageObj.height / 2);
  dynamicContext.restore();
}

// addDigitalWatchNumbers();
imageloadObserver = window.setInterval(checkIfloaded, 400);

// var hours = 0;
// var minutes = 0;
//
//
//
//

//
// var imagesToLoad =
//   {
//     background: "./assets/static/background.jpg",
//     wristWatch: "./assets/static/clockresized.png",
//     digitalWatch: "./assets/static/digital_times_resized.png",
//     clockBtn: "./assets/static/clockbtnresized.png",
//     minuteHand: "",
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

},{"./customImage/image.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvY3VzdG9tSW1hZ2UvaW1hZ2UuanMiLCJhcHAvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQWEsVyxXQUFBLFc7QUFFWCx1QkFBWSxRQUFaLEVBQ0E7QUFBQTs7QUFBQTs7QUFDRSxTQUFLLE1BQUwsR0FBYyxJQUFJLEtBQUosRUFBZDtBQUNBLFNBQUssTUFBTCxDQUFZLE1BQVosR0FBcUIsWUFDckI7QUFDRSxZQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0QsS0FIRDtBQUlBLFNBQUssTUFBTCxDQUFZLEdBQVosR0FBa0IsUUFBbEI7QUFDRDs7OztrQ0F5Q2EsQyxFQUFFLEMsRUFDakI7O0FBRUUsYUFBUyxLQUFLLEtBQUssSUFBVixJQUFrQixLQUFLLEtBQUssSUFBTCxHQUFXLEtBQUssS0FBeEMsSUFBbUQsS0FBSyxLQUFLLElBQVYsSUFBa0IsS0FBSyxLQUFLLElBQUwsR0FBWSxLQUFLLE1BQW5HO0FBQ0Q7OztzQkEzQ1MsSSxFQUNWO0FBQ0UsV0FBSyxLQUFMLEdBQWEsSUFBYjtBQUNELEs7d0JBUUQ7QUFDRSxhQUFPLEtBQUssS0FBWjtBQUNEOzs7c0JBUlMsSSxFQUNWO0FBQ0UsV0FBSyxLQUFMLEdBQWEsSUFBYjtBQUNELEs7d0JBT0Q7QUFDRSxhQUFPLEtBQUssS0FBWjtBQUNEOzs7d0JBR0Q7QUFDRSxhQUFPLEtBQUssTUFBWjtBQUNEOzs7d0JBR0Q7QUFDRSxhQUFPLEtBQUssT0FBWjtBQUNEOzs7d0JBR0Q7QUFDRSxhQUFPLEtBQUssTUFBTCxDQUFZLEtBQW5CO0FBQ0Q7Ozt3QkFHRDtBQUNFLGFBQU8sS0FBSyxNQUFMLENBQVksTUFBbkI7QUFDRDs7Ozs7Ozs7O0FDakRGOztBQUVBLElBQU0sbUJBQW1CLFNBQVMsY0FBVCxDQUF3QixZQUF4QixDQUF6QjtBQUNBLElBQU0sZ0JBQWdCLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUF0QjtBQUNBLElBQU0saUJBQWlCLGNBQWMsVUFBZCxDQUF5QixJQUF6QixDQUF2QjtBQUNBLElBQU0sb0JBQW9CLGlCQUFpQixVQUFqQixDQUE0QixJQUE1QixDQUExQjs7QUFHQSxpQkFBaUIsS0FBakIsR0FBeUIsT0FBTyxVQUFoQztBQUNBLGlCQUFpQixNQUFqQixHQUEwQixPQUFPLFdBQWpDOztBQUVBLGNBQWMsS0FBZCxHQUFzQixPQUFPLFVBQTdCO0FBQ0EsY0FBYyxNQUFkLEdBQXVCLE9BQU8sV0FBOUI7O0FBRUEsSUFBTSxtQkFBbUIsQ0FBekI7QUFDQSxJQUFNLGlCQUFpQixHQUF2Qjs7QUFFQSxJQUFJLGNBQUo7QUFDQSxJQUFJLGNBQUo7QUFDQSxJQUFJLFlBQUo7QUFDQSxJQUFJLFlBQUo7O0FBRUEsSUFBSSxrQkFBa0IsQ0FBdEI7QUFDQSxJQUFJLGdCQUFnQixDQUFwQjs7QUFFQSxJQUFJLFVBQVUsQ0FBZDtBQUNBLElBQUksUUFBUSxFQUFaOztBQUVBLElBQU0sU0FBUztBQUNiLGNBQVksdUJBQWdCLGdDQUFoQixDQURDO0FBRWIsY0FBWSx1QkFBZ0Isa0NBQWhCLENBRkM7QUFHYixjQUFZLHVCQUFnQiw4Q0FBaEIsQ0FIQztBQUliLFlBQVUsdUJBQWdCLDRDQUFoQixDQUpHO0FBS2IsWUFBVSx1QkFBZ0IscUNBQWhCLENBTEc7QUFNYixXQUFTLHVCQUFnQiw2QkFBaEIsQ0FOSTtBQU9iLGFBQVcsdUJBQWdCLCtCQUFoQixDQVBFO0FBUWIsZ0JBQWMsdUJBQWdCLDJDQUFoQjtBQVJELENBQWY7O0FBV0EsSUFBSSxpQkFBSjs7QUFHQSxTQUFTLGFBQVQsR0FBeUI7QUFDdkIsTUFBSSxlQUFlLENBQW5CO0FBQ0EsTUFBSSxZQUFZLENBQWhCOztBQUVBLE9BQUssSUFBSSxLQUFULElBQWtCLE1BQWxCLEVBQTBCO0FBQ3hCO0FBQ0Q7O0FBRUQsT0FBSyxJQUFJLEtBQVQsSUFBa0IsTUFBbEIsRUFBMEI7QUFDeEIsUUFBSSxPQUFPLEtBQVAsRUFBYyxPQUFsQixFQUEyQjs7QUFFekI7QUFDRDtBQUNGO0FBQ0QsTUFBSSxnQkFBZ0IsU0FBcEIsRUFBK0I7O0FBRTdCLGtCQUFjLGlCQUFkO0FBQ0E7QUFFRDtBQUNGOztBQUlELFNBQVMsc0JBQVQsR0FBa0M7QUFDaEMsT0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixLQUFLLEVBQXJCLEVBQXlCLEdBQXpCLEVBQThCO0FBQzVCLFdBQU8sRUFBRSxRQUFGLEVBQVAsSUFBdUIsdUJBQWdCLDhCQUE4QixDQUE5QixHQUFrQyxNQUFsRCxDQUF2QjtBQUNEO0FBQ0Y7O0FBRUQsU0FBUyxhQUFULEdBQXlCOztBQUV2QixTQUFPLFVBQVAsQ0FBa0IsSUFBbEIsR0FBeUIsQ0FBekI7QUFDQSxTQUFPLFVBQVAsQ0FBa0IsSUFBbEIsR0FBeUIsQ0FBekI7QUFDQSxTQUFPLFVBQVAsQ0FBa0IsSUFBbEIsR0FBeUIsaUJBQWlCLEtBQWpCLEdBQXlCLENBQXpCLEdBQTZCLE9BQU8sVUFBUCxDQUFrQixLQUF4RTtBQUNBLFNBQU8sVUFBUCxDQUFrQixJQUFsQixHQUF5QixpQkFBaUIsTUFBakIsR0FBMEIsQ0FBbkQ7QUFDQSxTQUFPLFVBQVAsQ0FBa0IsSUFBbEIsR0FBeUIsT0FBTyxVQUFQLENBQWtCLElBQWxCLEdBQXlCLE9BQU8sVUFBUCxDQUFrQixLQUFsQixHQUEwQixDQUFuRCxHQUF1RCxPQUFPLFVBQVAsQ0FBa0IsS0FBbEIsR0FBMEIsQ0FBMUc7QUFDQSxTQUFPLFVBQVAsQ0FBa0IsSUFBbEIsR0FBMEIsY0FBYyxNQUFkLEdBQXVCLENBQXhCLEdBQThCLE9BQU8sVUFBUCxDQUFrQixNQUFsQixHQUEyQixDQUF6RCxHQUE4RCxPQUFPLFVBQVAsQ0FBa0IsTUFBekc7QUFDQSxTQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsR0FBdUIsT0FBTyxVQUFQLENBQWtCLElBQWxCLEdBQXlCLE9BQU8sVUFBUCxDQUFrQixLQUFsQixHQUEwQixDQUFuRCxHQUF1RCxPQUFPLFFBQVAsQ0FBZ0IsS0FBaEIsR0FBd0IsQ0FBdEc7QUFDQSxTQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsR0FBd0IsT0FBTyxVQUFQLENBQWtCLElBQWxCLEdBQXlCLE9BQU8sVUFBUCxDQUFrQixNQUFsQixHQUEyQixDQUFyRCxHQUEwRCxPQUFPLFFBQVAsQ0FBZ0IsTUFBakc7QUFDQSxTQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsR0FBdUIsT0FBTyxVQUFQLENBQWtCLElBQWxCLEdBQXlCLE9BQU8sVUFBUCxDQUFrQixLQUFsRTtBQUNBLFNBQU8sUUFBUCxDQUFnQixJQUFoQixHQUF3QixPQUFPLFVBQVAsQ0FBa0IsTUFBbEIsR0FBMkIsQ0FBM0IsR0FBK0IsT0FBTyxVQUFQLENBQWtCLElBQWxELEdBQTJELE9BQU8sUUFBUCxDQUFnQixNQUFoQixHQUF5QixDQUEzRztBQUNBLFNBQU8sWUFBUCxDQUFvQixJQUFwQixHQUE0QixpQkFBaUIsS0FBakIsR0FBeUIsQ0FBMUIsR0FBK0IsQ0FBL0IsR0FBbUMsT0FBTyxZQUFQLENBQW9CLEtBQWxGO0FBQ0EsU0FBTyxZQUFQLENBQW9CLElBQXBCLEdBQTRCLE9BQU8sVUFBUCxDQUFrQixNQUFsQixHQUEyQixDQUEzQixHQUErQixpQkFBaUIsTUFBakIsR0FBMEIsQ0FBMUQsR0FBZ0UsT0FBTyxZQUFQLENBQW9CLE1BQXBCLEdBQTZCLENBQXhIO0FBQ0EsU0FBTyxPQUFQLENBQWUsSUFBZixHQUFzQixPQUFPLFFBQVAsQ0FBZ0IsSUFBdEM7QUFDQSxTQUFPLE9BQVAsQ0FBZSxJQUFmLEdBQXNCLE9BQU8sUUFBUCxDQUFnQixJQUFoQixHQUF1QixPQUFPLE9BQVAsQ0FBZSxNQUE1RDtBQUNBLFNBQU8sU0FBUCxDQUFpQixJQUFqQixHQUF3QixPQUFPLFFBQVAsQ0FBZ0IsSUFBeEM7QUFDQSxTQUFPLFNBQVAsQ0FBaUIsSUFBakIsR0FBd0IsT0FBTyxRQUFQLENBQWdCLElBQWhCLEdBQXVCLE9BQU8sUUFBUCxDQUFnQixNQUEvRDs7QUFFQSxpQkFBZSxPQUFPLFlBQVAsQ0FBb0IsSUFBcEIsR0FBNEIsT0FBTyxZQUFQLENBQW9CLEtBQXJCLEdBQThCLENBQXhFO0FBQ0EsaUJBQWUsT0FBTyxZQUFQLENBQW9CLElBQXBCLEdBQTJCLE9BQU8sWUFBUCxDQUFvQixNQUFwQixHQUE2QixDQUF2RTtBQUNBLG1CQUFpQixlQUFnQixPQUFPLFlBQVAsQ0FBb0IsS0FBcEIsR0FBNEIsQ0FBN0IsR0FBa0MsQ0FBbEU7QUFDQSxtQkFBaUIsWUFBakI7O0FBR0Esb0JBQWtCLFNBQWxCLENBQTRCLE9BQU8sVUFBUCxDQUFrQixLQUE5QyxFQUFxRCxPQUFPLFVBQVAsQ0FBa0IsSUFBdkUsRUFBNkUsT0FBTyxVQUFQLENBQWtCLElBQS9GO0FBQ0Esb0JBQWtCLFNBQWxCLENBQTRCLE9BQU8sVUFBUCxDQUFrQixLQUE5QyxFQUFxRCxPQUFPLFVBQVAsQ0FBa0IsSUFBdkUsRUFBNkUsT0FBTyxVQUFQLENBQWtCLElBQS9GO0FBQ0Esb0JBQWtCLFNBQWxCLENBQTRCLE9BQU8sUUFBUCxDQUFnQixLQUE1QyxFQUFtRCxPQUFPLFFBQVAsQ0FBZ0IsSUFBbkUsRUFBeUUsT0FBTyxRQUFQLENBQWdCLElBQXpGO0FBQ0Esb0JBQWtCLFNBQWxCLENBQTRCLE9BQU8sWUFBUCxDQUFvQixLQUFoRCxFQUF1RCxPQUFPLFlBQVAsQ0FBb0IsSUFBM0UsRUFBaUYsT0FBTyxZQUFQLENBQW9CLElBQXJHO0FBQ0Esb0JBQWtCLFNBQWxCLENBQTRCLE9BQU8sT0FBUCxDQUFlLEtBQTNDLEVBQWtELE9BQU8sT0FBUCxDQUFlLElBQWpFLEVBQXVFLE9BQU8sT0FBUCxDQUFlLElBQXRGO0FBQ0Esb0JBQWtCLFNBQWxCLENBQTRCLE9BQU8sU0FBUCxDQUFpQixLQUE3QyxFQUFvRCxPQUFPLFNBQVAsQ0FBaUIsSUFBckUsRUFBMkUsT0FBTyxTQUFQLENBQWlCLElBQTVGO0FBQ0EsaUJBQWUsU0FBZixDQUF5QixPQUFPLFVBQVAsQ0FBa0IsS0FBM0MsRUFBa0QsT0FBTyxVQUFQLENBQWtCLElBQXBFLEVBQTBFLE9BQU8sVUFBUCxDQUFrQixJQUE1RjtBQUNBLGlCQUFlLFNBQWYsQ0FBeUIsT0FBTyxRQUFQLENBQWdCLEtBQXpDLEVBQWdELE9BQU8sVUFBUCxDQUFrQixJQUFsRSxFQUF3RSxPQUFPLFFBQVAsQ0FBZ0IsSUFBeEY7QUFDQSxpQkFBZSxJQUFmLEdBQXNCLDBCQUF0QjtBQUNBLGlCQUFlLFNBQWYsR0FBMkIsU0FBM0I7QUFDQSxvQkFBa0IsSUFBbEIsR0FBeUIsZUFBZSxJQUF4QztBQUNBLG9CQUFrQixTQUFsQixHQUE4QixlQUFlLFNBQTdDO0FBQ0EsaUJBQWUsUUFBZixDQUF3QixJQUF4QixFQUE4QixZQUE5QixFQUE0QyxZQUE1QztBQUNBLG9CQUFrQixRQUFsQixDQUEyQixHQUEzQixFQUFnQyxlQUFnQixJQUFJLE9BQU8sWUFBUCxDQUFvQixLQUF6QixHQUFrQyxDQUFqRixFQUFvRixlQUFlLENBQW5HO0FBQ0EsaUJBQWUsUUFBZixDQUF3QixJQUF4QixFQUE4QixjQUE5QixFQUE4QyxjQUE5QztBQUNBO0FBRUQ7O0FBRUQsU0FBUyxZQUFULEdBQXdCO0FBQ3RCLGdCQUFjLGdCQUFkLENBQStCLFdBQS9CLEVBQTRDLFlBQU07O0FBRWhEOzs7QUFHRTtBQUNFLFlBQVEsR0FBUixDQUFZLGNBQWMsTUFBTSxPQUFoQztBQUNBLFlBQVEsR0FBUixDQUFZLG9DQUFtQyxPQUFPLFVBQVAsQ0FBa0IsSUFBbEIsR0FBeUIsT0FBTyxVQUFQLENBQWtCLEtBQWxCLEdBQXdCLENBQXBGLENBQVo7QUFDQSxRQUFJLEtBQUssTUFBTSxPQUFOLEdBQWlCLE9BQU8sVUFBUCxDQUFrQixJQUE1QztBQUNBLFFBQUksS0FBSyxNQUFNLE9BQU4sR0FBaUIsT0FBTyxVQUFQLENBQWtCLElBQTVDO0FBQ0EsUUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLEVBQVgsRUFBYyxFQUFkLENBQWQ7QUFDQTtBQUNBLG1CQUFlLFNBQWYsQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsY0FBYyxLQUE3QyxFQUFvRCxjQUFjLE1BQWxFO0FBQ0EsZ0JBQVksT0FBWixFQUFxQixPQUFPLFVBQVAsQ0FBa0IsSUFBbEIsR0FBeUIsT0FBTyxVQUFQLENBQWtCLEtBQWxCLEdBQTBCLENBQXhFLEVBQTJFLE9BQU8sVUFBUCxDQUFrQixJQUFsQixHQUF5QixPQUFPLFVBQVAsQ0FBa0IsTUFBdEgsRUFBOEgsT0FBTyxVQUFySTtBQUNBO0FBQ0Y7QUFDRjtBQUVELEdBbEJEO0FBbUJEOztBQUVELFNBQVMsV0FBVCxDQUFxQixLQUFyQixFQUE0QixhQUE1QixFQUEyQyxhQUEzQyxFQUEwRCxRQUExRCxFQUFvRTtBQUNsRSxpQkFBZSxJQUFmO0FBQ0EsaUJBQWUsU0FBZixDQUF5QixhQUF6QixFQUF3QyxhQUF4QztBQUNBLGlCQUFlLE1BQWYsQ0FBc0IsS0FBdEI7QUFDQTtBQUNBLGlCQUFlLFNBQWYsQ0FBeUIsU0FBUyxLQUFsQyxFQUF5QyxTQUFTLEtBQVQsR0FBZSxDQUF4RCxFQUEyRCxTQUFTLE1BQVQsR0FBZ0IsQ0FBM0U7QUFDQSxpQkFBZSxPQUFmO0FBRUQ7O0FBVUQ7QUFDQSxvQkFBb0IsT0FBTyxXQUFQLENBQW1CLGFBQW5CLEVBQWtDLEdBQWxDLENBQXBCOztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY2xhc3MgQ3VzdG9tSW1hZ2V7XG5cbiAgY29uc3RydWN0b3IoZmlsZXBhdGgpXG4gIHtcbiAgICB0aGlzLl9pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIHRoaXMuX2ltYWdlLm9ubG9hZCA9ICgpID0+XG4gICAge1xuICAgICAgdGhpcy5fbG9hZGVkID0gdHJ1ZTtcbiAgICB9O1xuICAgIHRoaXMuX2ltYWdlLnNyYyA9IGZpbGVwYXRoO1xuICB9XG5cbiAgc2V0IHhQb3MoeFBvcylcbiB7XG4gICB0aGlzLl94cG9zID0geFBvcztcbiB9XG5cbiAgc2V0IHlQb3MoeVBvcylcbiB7XG4gICB0aGlzLl95cG9zID0geVBvcztcbiB9XG5cbiAgZ2V0IHhQb3MoKVxuIHtcbiAgIHJldHVybiB0aGlzLl94cG9zO1xuIH1cbiAgZ2V0IHlQb3MoKVxuIHtcbiAgIHJldHVybiB0aGlzLl95cG9zO1xuIH1cblxuIGdldCBpbWFnZSgpXG4ge1xuICAgcmV0dXJuIHRoaXMuX2ltYWdlO1xuIH1cblxuIGdldCBkaWRsb2FkKClcbiB7XG4gICByZXR1cm4gdGhpcy5fbG9hZGVkO1xuIH1cblxuIGdldCB3aWR0aCgpXG4ge1xuICAgcmV0dXJuIHRoaXMuX2ltYWdlLndpZHRoO1xuIH1cblxuIGdldCBoZWlnaHQoKVxuIHtcbiAgIHJldHVybiB0aGlzLl9pbWFnZS5oZWlnaHQ7XG4gfVxuXG4gIGluQm91bmRpbmdCb3goeCx5KVxuIHtcblxuICAgcmV0dXJuICgoeCA+PSB0aGlzLnhQb3MgJiYgeCA8PSB0aGlzLnhQb3MrIHRoaXMud2lkdGgpICYmICh5ID49IHRoaXMueVBvcyAmJiB5IDw9IHRoaXMueVBvcyArIHRoaXMuaGVpZ2h0KSk7XG4gfVxufVxuIiwiaW1wb3J0IHtDdXN0b21JbWFnZX0gZnJvbSBcIi4vY3VzdG9tSW1hZ2UvaW1hZ2UuanNcIlxuXG5jb25zdCBiYWNrZ3JvdW5kQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhY2tncm91bmQnKTtcbmNvbnN0IGR5bmFtaWNDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHluYW1pYycpO1xuY29uc3QgZHluYW1pY0NvbnRleHQgPSBkeW5hbWljQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5jb25zdCBiYWNrZ3JvdW5kQ29udGV4dCA9IGJhY2tncm91bmRDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuXG5iYWNrZ3JvdW5kQ2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5iYWNrZ3JvdW5kQ2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuZHluYW1pY0NhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuZHluYW1pY0NhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbmNvbnN0IG1pbnV0ZUhhbmREZWdyZWUgPSA2O1xuY29uc3QgaG91ckhhbmREZWdyZWUgPSAwLjU7XG5cbnZhciBtaW51dGVIYW5keFBvcztcbnZhciBtaW51dGVIYW5keVBvcztcbnZhciBob3VySGFuZHhQb3M7XG52YXIgaG91ckhhbmR5UG9zO1xuXG52YXIgbWludXRlSGFuZEFuZ2xlID0gMDtcbnZhciBob3VySGFuZEFuZ2xlID0gMDtcblxudmFyIG1pbnV0ZXMgPSAwO1xudmFyIGhvdXJzID0gMTI7XG5cbmNvbnN0IGltYWdlcyA9IHtcbiAgYmFja2dyb3VuZDogbmV3IEN1c3RvbUltYWdlKFwiLi9hc3NldHMvc3RhdGljL2JhY2tncm91bmQuanBnXCIpLFxuICB3cmlzdFdhdGNoOiBuZXcgQ3VzdG9tSW1hZ2UoXCIuL2Fzc2V0cy9zdGF0aWMvY2xvY2tyZXNpemVkLnBuZ1wiKSxcbiAgbWludXRlSGFuZDogbmV3IEN1c3RvbUltYWdlKFwiLi9hc3NldHMvZHluYW1pYy9oYW5kcy9taW51dGVoYW5kcmVzaXplZC5wbmdcIiksXG4gIGhvdXJIYW5kOiBuZXcgQ3VzdG9tSW1hZ2UoXCIuL2Fzc2V0cy9keW5hbWljL2hhbmRzL2hvdXJoYW5kcmVzaXplZC5wbmdcIiksXG4gIGNsb2NrQnRuOiBuZXcgQ3VzdG9tSW1hZ2UoXCIuL2Fzc2V0cy9zdGF0aWMvY2xvY2tidG5yZXNpemVkLnBuZ1wiKSxcbiAgdXBBcnJvdzogbmV3IEN1c3RvbUltYWdlKFwiLi9hc3NldHMvc3RhdGljL3VwQXJyb3cucG5nXCIpLFxuICBkb3duQXJyb3c6IG5ldyBDdXN0b21JbWFnZShcIi4vYXNzZXRzL3N0YXRpYy9kb3duQXJyb3cucG5nXCIpLFxuICBkaWdpdGFsV2F0Y2g6IG5ldyBDdXN0b21JbWFnZShcIi4vYXNzZXRzL3N0YXRpYy9kaWdpdGFsX3RpbWVzX3Jlc2l6ZWQucG5nXCIpXG59O1xuXG52YXIgaW1hZ2Vsb2FkT2JzZXJ2ZXI7XG5cblxuZnVuY3Rpb24gY2hlY2tJZmxvYWRlZCgpIHtcbiAgbGV0IGltYWdlc0xvYWRlZCA9IDA7XG4gIGxldCBudW1JbWFnZXMgPSAwO1xuXG4gIGZvciAodmFyIGltYWdlIGluIGltYWdlcykge1xuICAgIG51bUltYWdlcysrO1xuICB9XG5cbiAgZm9yICh2YXIgaW1hZ2UgaW4gaW1hZ2VzKSB7XG4gICAgaWYgKGltYWdlc1tpbWFnZV0uZGlkbG9hZCkge1xuXG4gICAgICBpbWFnZXNMb2FkZWQrKztcbiAgICB9XG4gIH1cbiAgaWYgKGltYWdlc0xvYWRlZCA+PSBudW1JbWFnZXMpIHtcblxuICAgIGNsZWFySW50ZXJ2YWwoaW1hZ2Vsb2FkT2JzZXJ2ZXIpO1xuICAgIHNldFBhcmFtZXRlcnMoKTtcblxuICB9XG59XG5cblxuXG5mdW5jdGlvbiBhZGREaWdpdGFsV2F0Y2hOdW1iZXJzKCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8PSA1OTsgaSsrKSB7XG4gICAgaW1hZ2VzW2kudG9TdHJpbmcoKV0gPSBuZXcgQ3VzdG9tSW1hZ2UoXCIuL2Fzc2V0cy9keW5hbWljL251bWJlcnMvXCIgKyBpICsgXCIucG5nXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldFBhcmFtZXRlcnMoKSB7XG5cbiAgaW1hZ2VzLmJhY2tncm91bmQueFBvcyA9IDA7XG4gIGltYWdlcy5iYWNrZ3JvdW5kLnlQb3MgPSAwO1xuICBpbWFnZXMud3Jpc3RXYXRjaC54UG9zID0gYmFja2dyb3VuZENhbnZhcy53aWR0aCAvIDQgLSBpbWFnZXMud3Jpc3RXYXRjaC53aWR0aDtcbiAgaW1hZ2VzLndyaXN0V2F0Y2gueVBvcyA9IGJhY2tncm91bmRDYW52YXMuaGVpZ2h0IC8gNDtcbiAgaW1hZ2VzLm1pbnV0ZUhhbmQueFBvcyA9IGltYWdlcy53cmlzdFdhdGNoLnhQb3MgKyBpbWFnZXMud3Jpc3RXYXRjaC53aWR0aCAvIDIgLSBpbWFnZXMubWludXRlSGFuZC53aWR0aCAvIDI7XG4gIGltYWdlcy5taW51dGVIYW5kLnlQb3MgPSAoZHluYW1pY0NhbnZhcy5oZWlnaHQgLyA0KSArIChpbWFnZXMud3Jpc3RXYXRjaC5oZWlnaHQgLyAyKSAtIGltYWdlcy5taW51dGVIYW5kLmhlaWdodDtcbiAgaW1hZ2VzLmhvdXJIYW5kLnhQb3MgPSBpbWFnZXMud3Jpc3RXYXRjaC54UG9zICsgaW1hZ2VzLndyaXN0V2F0Y2gud2lkdGggLyAyIC0gaW1hZ2VzLmhvdXJIYW5kLndpZHRoIC8gMjtcbiAgaW1hZ2VzLmhvdXJIYW5kLnlQb3MgPSAoaW1hZ2VzLndyaXN0V2F0Y2gueVBvcyArIGltYWdlcy53cmlzdFdhdGNoLmhlaWdodCAvIDIpIC0gaW1hZ2VzLmhvdXJIYW5kLmhlaWdodDtcbiAgaW1hZ2VzLmNsb2NrQnRuLnhQb3MgPSBpbWFnZXMud3Jpc3RXYXRjaC54UG9zICsgaW1hZ2VzLndyaXN0V2F0Y2gud2lkdGg7XG4gIGltYWdlcy5jbG9ja0J0bi55UG9zID0gKGltYWdlcy53cmlzdFdhdGNoLmhlaWdodCAvIDIgKyBpbWFnZXMud3Jpc3RXYXRjaC55UG9zKSAtIChpbWFnZXMuY2xvY2tCdG4uaGVpZ2h0IC8gMik7XG4gIGltYWdlcy5kaWdpdGFsV2F0Y2gueFBvcyA9IChiYWNrZ3JvdW5kQ2FudmFzLndpZHRoICogMykgLyA0IC0gaW1hZ2VzLmRpZ2l0YWxXYXRjaC53aWR0aDtcbiAgaW1hZ2VzLmRpZ2l0YWxXYXRjaC55UG9zID0gKGltYWdlcy53cmlzdFdhdGNoLmhlaWdodCAvIDIgKyBiYWNrZ3JvdW5kQ2FudmFzLmhlaWdodCAvIDQpIC0gKGltYWdlcy5kaWdpdGFsV2F0Y2guaGVpZ2h0IC8gMik7XG4gIGltYWdlcy51cEFycm93LnhQb3MgPSBpbWFnZXMuY2xvY2tCdG4ueFBvcztcbiAgaW1hZ2VzLnVwQXJyb3cueVBvcyA9IGltYWdlcy5jbG9ja0J0bi55UG9zIC0gaW1hZ2VzLnVwQXJyb3cuaGVpZ2h0O1xuICBpbWFnZXMuZG93bkFycm93LnhQb3MgPSBpbWFnZXMuY2xvY2tCdG4ueFBvcztcbiAgaW1hZ2VzLmRvd25BcnJvdy55UG9zID0gaW1hZ2VzLmNsb2NrQnRuLnlQb3MgKyBpbWFnZXMuY2xvY2tCdG4uaGVpZ2h0O1xuXG4gIGhvdXJIYW5keFBvcyA9IGltYWdlcy5kaWdpdGFsV2F0Y2gueFBvcyArIChpbWFnZXMuZGlnaXRhbFdhdGNoLndpZHRoKSAvIDg7XG4gIGhvdXJIYW5keVBvcyA9IGltYWdlcy5kaWdpdGFsV2F0Y2gueVBvcyArIGltYWdlcy5kaWdpdGFsV2F0Y2guaGVpZ2h0IC8gMjtcbiAgbWludXRlSGFuZHhQb3MgPSBob3VySGFuZHhQb3MgKyAoaW1hZ2VzLmRpZ2l0YWxXYXRjaC53aWR0aCAqIDMpIC8gODtcbiAgbWludXRlSGFuZHlQb3MgPSBob3VySGFuZHlQb3M7XG5cblxuICBiYWNrZ3JvdW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLmJhY2tncm91bmQuaW1hZ2UsIGltYWdlcy5iYWNrZ3JvdW5kLnhQb3MsIGltYWdlcy5iYWNrZ3JvdW5kLnlQb3MpO1xuICBiYWNrZ3JvdW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLndyaXN0V2F0Y2guaW1hZ2UsIGltYWdlcy53cmlzdFdhdGNoLnhQb3MsIGltYWdlcy53cmlzdFdhdGNoLnlQb3MpO1xuICBiYWNrZ3JvdW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLmNsb2NrQnRuLmltYWdlLCBpbWFnZXMuY2xvY2tCdG4ueFBvcywgaW1hZ2VzLmNsb2NrQnRuLnlQb3MpO1xuICBiYWNrZ3JvdW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLmRpZ2l0YWxXYXRjaC5pbWFnZSwgaW1hZ2VzLmRpZ2l0YWxXYXRjaC54UG9zLCBpbWFnZXMuZGlnaXRhbFdhdGNoLnlQb3MpO1xuICBiYWNrZ3JvdW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLnVwQXJyb3cuaW1hZ2UsIGltYWdlcy51cEFycm93LnhQb3MsIGltYWdlcy51cEFycm93LnlQb3MpO1xuICBiYWNrZ3JvdW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLmRvd25BcnJvdy5pbWFnZSwgaW1hZ2VzLmRvd25BcnJvdy54UG9zLCBpbWFnZXMuZG93bkFycm93LnlQb3MpO1xuICBkeW5hbWljQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLm1pbnV0ZUhhbmQuaW1hZ2UsIGltYWdlcy5taW51dGVIYW5kLnhQb3MsIGltYWdlcy5taW51dGVIYW5kLnlQb3MpO1xuICBkeW5hbWljQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLmhvdXJIYW5kLmltYWdlLCBpbWFnZXMubWludXRlSGFuZC54UG9zLCBpbWFnZXMuaG91ckhhbmQueVBvcyk7XG4gIGR5bmFtaWNDb250ZXh0LmZvbnQgPSAnNTBwdCB2ZXJkYW5hLCBzYW5zLXNlcmlmJztcbiAgZHluYW1pY0NvbnRleHQuZmlsbFN0eWxlID0gXCIjRkZGRkZGXCI7XG4gIGJhY2tncm91bmRDb250ZXh0LmZvbnQgPSBkeW5hbWljQ29udGV4dC5mb250O1xuICBiYWNrZ3JvdW5kQ29udGV4dC5maWxsU3R5bGUgPSBkeW5hbWljQ29udGV4dC5maWxsU3R5bGU7XG4gIGR5bmFtaWNDb250ZXh0LmZpbGxUZXh0KFwiMTJcIiwgaG91ckhhbmR4UG9zLCBob3VySGFuZHlQb3MpO1xuICBiYWNrZ3JvdW5kQ29udGV4dC5maWxsVGV4dChcIjpcIiwgaG91ckhhbmR4UG9zICsgKDIgKiBpbWFnZXMuZGlnaXRhbFdhdGNoLndpZHRoKSAvIDgsIGhvdXJIYW5keVBvcyAtIDUpO1xuICBkeW5hbWljQ29udGV4dC5maWxsVGV4dChcIjAwXCIsIG1pbnV0ZUhhbmR4UG9zLCBtaW51dGVIYW5keVBvcyk7XG4gIHNldExpc3RlbmVycygpO1xuXG59XG5cbmZ1bmN0aW9uIHNldExpc3RlbmVycygpIHtcbiAgZHluYW1pY0NhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsICgpID0+IHtcblxuICAgIC8vIGlmIChpbWFnZXMubWludXRlSGFuZC5pbkJvdW5kaW5nQm94KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpKSB7XG5cblxuICAgICAgLy8gZHluYW1pY0NhbnZhcy5vbm1vdXNlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ4cG9zIGlzIDpcIiArIGV2ZW50LmNsaWVudFgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInggbWlkIHBvaW50IG9mIG1pbnV0ZWhhbmQgaXM6IFwiICsoaW1hZ2VzLm1pbnV0ZUhhbmQueFBvcyArIGltYWdlcy5taW51dGVIYW5kLndpZHRoLzIpICk7XG4gICAgICAgIHZhciBkeCA9IGV2ZW50LmNsaWVudFggLSAoaW1hZ2VzLm1pbnV0ZUhhbmQueFBvcyApO1xuICAgICAgICB2YXIgZHkgPSBldmVudC5jbGllbnRZIC0gKGltYWdlcy5taW51dGVIYW5kLnlQb3MpO1xuICAgICAgICB2YXIgZGVncmVlcyA9IE1hdGguYXRhbjIoZHksZHgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkZWdyZWVzKTtcbiAgICAgICAgZHluYW1pY0NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGR5bmFtaWNDYW52YXMud2lkdGgsIGR5bmFtaWNDYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgcm90YXRlSW1hZ2UoZGVncmVlcywgaW1hZ2VzLm1pbnV0ZUhhbmQueFBvcyArIGltYWdlcy5taW51dGVIYW5kLndpZHRoIC8gMiwgaW1hZ2VzLm1pbnV0ZUhhbmQueVBvcyArIGltYWdlcy5taW51dGVIYW5kLmhlaWdodCwgaW1hZ2VzLm1pbnV0ZUhhbmQpO1xuICAgICAgICAvLyByb3RhdGVJbWFnZShob3VySGFuZEFuZ2xlLCBpbWFnZXMuaG91ckhhbmQueFBvcyArIGltYWdlcy5ob3VySGFuZC53aWR0aCAvIDIsIGltYWdlcy5ob3VySGFuZC55UG9zICsgaW1hZ2VzLmhvdXJIYW5kLmhlaWdodCwgaW1hZ2VzLmhvdXJIYW5kKTtcbiAgICAgIC8vIH1cbiAgICAvLyB9XG5cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJvdGF0ZUltYWdlKGFuZ2xlLCB0cmFuc2xhdGVYcG9zLCB0cmFuc2xhdGVZcG9zLCBpbWFnZU9iaikge1xuICBkeW5hbWljQ29udGV4dC5zYXZlKCk7XG4gIGR5bmFtaWNDb250ZXh0LnRyYW5zbGF0ZSh0cmFuc2xhdGVYcG9zLCB0cmFuc2xhdGVZcG9zKTtcbiAgZHluYW1pY0NvbnRleHQucm90YXRlKGFuZ2xlKTtcbiAgLy8gZHluYW1pY0NvbnRleHQudHJhbnNsYXRlKC0odHJhbnNsYXRlWHBvcyksIC0gKHRyYW5zbGF0ZVlwb3MpKTtcbiAgZHluYW1pY0NvbnRleHQuZHJhd0ltYWdlKGltYWdlT2JqLmltYWdlLCBpbWFnZU9iai53aWR0aC8yLCBpbWFnZU9iai5oZWlnaHQvMik7XG4gIGR5bmFtaWNDb250ZXh0LnJlc3RvcmUoKTtcblxufVxuXG5cblxuXG5cblxuXG5cblxuLy8gYWRkRGlnaXRhbFdhdGNoTnVtYmVycygpO1xuaW1hZ2Vsb2FkT2JzZXJ2ZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoY2hlY2tJZmxvYWRlZCwgNDAwKVxuXG5cblxuLy8gdmFyIGhvdXJzID0gMDtcbi8vIHZhciBtaW51dGVzID0gMDtcbi8vXG4vL1xuLy9cbi8vXG5cbi8vXG4vLyB2YXIgaW1hZ2VzVG9Mb2FkID1cbi8vICAge1xuLy8gICAgIGJhY2tncm91bmQ6IFwiLi9hc3NldHMvc3RhdGljL2JhY2tncm91bmQuanBnXCIsXG4vLyAgICAgd3Jpc3RXYXRjaDogXCIuL2Fzc2V0cy9zdGF0aWMvY2xvY2tyZXNpemVkLnBuZ1wiLFxuLy8gICAgIGRpZ2l0YWxXYXRjaDogXCIuL2Fzc2V0cy9zdGF0aWMvZGlnaXRhbF90aW1lc19yZXNpemVkLnBuZ1wiLFxuLy8gICAgIGNsb2NrQnRuOiBcIi4vYXNzZXRzL3N0YXRpYy9jbG9ja2J0bnJlc2l6ZWQucG5nXCIsXG4vLyAgICAgbWludXRlSGFuZDogXCJcIixcbi8vICAgICBob3VySGFuZDogXCIuL2Fzc2V0cy9keW5hbWljL2hhbmRzL2hvdXJoYW5kcmVzaXplZC5wbmdcIixcbi8vICAgICAvLyBoYW5kOiBcIi4vaGFuZC5wbmdcIixcbi8vICAgICAvLyBwaW5jaDogXCIuL3BpbmNoLnBuZ1wiLFxuLy8gICAgIHNlbWljb2xvbjogXCIuL2Fzc2V0cy9zdGF0aWMvc2VtaWNvbG9uLnBuZ1wiLFxuLy8gICAgIHVwQXJyb3c6IFwiLi9hc3NldHMvc3RhdGljL3VwQXJyb3cucG5nXCIsXG4vLyAgICAgZG93bkFycm93OiBcIi4vYXNzZXRzL3N0YXRpYy9kb3duQXJyb3cucG5nXCJcbi8vXG4vLyAgIH07XG4vL1xuLy8gZnVuY3Rpb24gbG9hZE51bWJlcnMoKSB7XG4vLyAgIGZvciAoaSA9IDA7IGkgPD0gNTk7IGkrKykge1xuLy8gICAgIGltYWdlc1RvTG9hZFtpLnRvU3RyaW5nKCldID0gXCIuL2Fzc2V0cy9keW5hbWljL251bWJlcnMvXCIgKyBpICsgXCIucG5nXCI7XG4vLyAgIH1cbi8vIH1cbi8vXG4vLyBmdW5jdGlvbiBwcmVsb2FkSW1hZ2VzKGltYWdlc1BhdGgsIGRyYXdJbWFnZXMpIHtcbi8vICAgbG9hZE51bWJlcnMoKTtcbi8vXG4vLyAgIHZhciBpbWFnZXMgPSB7fTtcbi8vICAgdmFyIGltYWdlc0xvYWRlZCA9IDA7XG4vLyAgIHZhciBudW1JbWFnZXMgPSAwO1xuLy9cbi8vICAgZm9yICh2YXIgaW1hZ2UgaW4gaW1hZ2VzUGF0aCkge1xuLy8gICAgIG51bUltYWdlcysrO1xuLy8gICB9XG4vL1xuLy8gICBmb3IgKHZhciBpbWFnZSBpbiBpbWFnZXNQYXRoKSB7XG4vLyAgICAgaW1hZ2VzW2ltYWdlXSA9IG5ldyBJbWFnZSgpO1xuLy8gICAgIGltYWdlc1tpbWFnZV0ub25sb2FkID0gKCkgPT4ge1xuLy8gICAgICAgaWYgKCsraW1hZ2VzTG9hZGVkID49IG51bUltYWdlcykge1xuLy8gICAgICAgICBkcmF3SW1hZ2VzKGltYWdlcyk7XG4vLyAgICAgICB9XG4vLyAgICAgfTtcbi8vICAgICBpbWFnZXNbaW1hZ2VdLnNyYyA9IGltYWdlc1BhdGhbaW1hZ2VdO1xuLy8gICB9XG4vLyB9XG4vL1xuLy8gZnVuY3Rpb24gdGVzdCgpIHtcbi8vICAgY29uc29sZS5sb2coXCJpbiBoZXJlXCIpO1xuLy8gfVxuLy9cbi8vXG4vL1xuLy9cbi8vXG4vLyBwcmVsb2FkSW1hZ2VzKGltYWdlc1RvTG9hZCwgKGltYWdlcykgPT4ge1xuLy8gICB2YXIgY2xvY2tYcG9zID0gbWFpbmNhbnZhcy53aWR0aC80IC0gaW1hZ2VzLndyaXN0V2F0Y2gud2lkdGg7XG4vLyAgIHZhciBjbG9ja1lQb3MgPSBtYWluY2FudmFzLmhlaWdodCAvIDQ7XG4vLyAgIHZhciBtaW51dGVoYW5kWHBvcyA9IChjbG9ja1hwb3MgKyBpbWFnZXMud3Jpc3RXYXRjaC53aWR0aC8yIC0gaW1hZ2VzLm1pbnV0ZUhhbmQud2lkdGgvMiApO1xuLy8gICB2YXIgbWludXRlaGFuZFlwb3MgPSAoKG1haW5jYW52YXMuaGVpZ2h0IC8gNCkgKyAoaW1hZ2VzLndyaXN0V2F0Y2guaGVpZ2h0IC8gMikgLSBpbWFnZXMubWludXRlSGFuZC5oZWlnaHQpO1xuLy8gICB2YXIgY2xvY2tCdG5YcG9zID0gY2xvY2tYcG9zICsgaW1hZ2VzLndyaXN0V2F0Y2gud2lkdGg7XG4vLyAgIHZhciBjbG9ja0J0bllwb3MgPSAoaW1hZ2VzLndyaXN0V2F0Y2guaGVpZ2h0IC8gMiArIG1haW5jYW52YXMuaGVpZ2h0IC8gNCkgLSAoaW1hZ2VzLmNsb2NrQnRuLmhlaWdodCAvIDIpO1xuLy9cbi8vICAgdmFyIGhvdXJIYW5kWHBvcyA9IChjbG9ja1hwb3MgKyBpbWFnZXMud3Jpc3RXYXRjaC53aWR0aC8yIC0gaW1hZ2VzLmhvdXJIYW5kLndpZHRoLzIpO1xuLy8gICB2YXIgaG91ckhhbmRZcG9zID0gKChtaW51dGVIYW5kQ2FudmFzLmhlaWdodCAvIDQpICsgKGltYWdlcy53cmlzdFdhdGNoLmhlaWdodCAvIDIpIC0gaW1hZ2VzLmhvdXJIYW5kLmhlaWdodCk7XG4vLyAgIHZhciBob3Vyc1hQb3MgPSBpbWFnZXNbXCIxMlwiXS53aWR0aCAvIDIgKyBtYWluY2FudmFzLndpZHRoIC8gMjtcbi8vICAgdmFyIGhvdXJzWXBvcyA9IG1haW5jYW52YXMuaGVpZ2h0IC8gMiAtIGltYWdlc1tcIjEyXCJdLmhlaWdodCAvIDI7XG4vLyAgIHZhciBzZW1pY29sb25YUG9zID0gaG91cnNYUG9zICsgaW1hZ2VzW1wiZGlnaXRhbFdhdGNoXCJdLndpZHRoIC8gNDtcbi8vICAgdmFyIHNlbWljb2xvbllQb3MgPSBob3VySGFuZFlwb3MgLSBpbWFnZXNbXCJkaWdpdGFsV2F0Y2hcIl0uaGVpZ2h0IC8gNTtcbi8vICAgdmFyIG1pbnV0ZVhwb3MgPSBpbWFnZXNbXCIxMlwiXS53aWR0aCAvIDIgKyBzZW1pY29sb25YUG9zO1xuLy8gICB2YXIgbWludXRlWXBvcyA9IGhvdXJzWXBvc1xuLy8gICB2YXIgdXBBcnJvd1lwb3MgPSBjbG9ja0J0bllwb3MgLSBpbWFnZXMudXBBcnJvdy5oZWlnaHQgO1xuLy8gICB2YXIgZG93bkFycm93WXBvcyA9IGNsb2NrQnRuWXBvcyArIGltYWdlcy5jbG9ja0J0bi5oZWlnaHQ7XG4vLyAgIHZhciBhbmdsZSA9IDA7XG4vLyAgIHZhciBob3VyaGFuZEFuZ2xlID0gMDtcbi8vXG4vLyAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2VzLmJhY2tncm91bmQsIDAsIDApO1xuLy8gICBjdHguZHJhd0ltYWdlKGltYWdlcy53cmlzdFdhdGNoLCBjbG9ja1hwb3MsIGNsb2NrWVBvcyk7XG4vL1xuLy8gICBjdHguZHJhd0ltYWdlKGltYWdlcy5jbG9ja0J0biwgY2xvY2tCdG5YcG9zLCBjbG9ja0J0bllwb3MpO1xuLy8gICBtaW51dGVIYW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLmhvdXJIYW5kLCBob3VySGFuZFhwb3MsIGhvdXJIYW5kWXBvcyk7XG4vLyAgIG1pbnV0ZUhhbmRDb250ZXh0LmRyYXdJbWFnZShpbWFnZXMubWludXRlSGFuZCwgbWludXRlaGFuZFhwb3MsIG1pbnV0ZWhhbmRZcG9zKTtcbi8vICAgY3R4LmRyYXdJbWFnZShpbWFnZXMuZGlnaXRhbFdhdGNoLCAobWFpbmNhbnZhcy53aWR0aCAqIDMpIC8gNiwgKGltYWdlcy53cmlzdFdhdGNoLmhlaWdodC8yICsgbWFpbmNhbnZhcy5oZWlnaHQvNCkgLSAoaW1hZ2VzLmRpZ2l0YWxXYXRjaC5oZWlnaHQvMikpO1xuLy8gICBtaW51dGVIYW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW1wiMTRcIl0sIGhvdXJzWFBvcywgaG91cnNZcG9zKTtcbi8vICAgY3R4LmRyYXdJbWFnZShpbWFnZXNbXCJzZW1pY29sb25cIl0sIHNlbWljb2xvblhQb3MsIHNlbWljb2xvbllQb3MpO1xuLy8gICBtaW51dGVIYW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW1wiMFwiXSwgbWludXRlWHBvcywgbWludXRlWXBvcyk7XG4vLyAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2VzLnVwQXJyb3csY2xvY2tCdG5YcG9zLHVwQXJyb3dZcG9zKTtcbi8vICAgY3R4LmRyYXdJbWFnZShpbWFnZXMuZG93bkFycm93LGNsb2NrQnRuWHBvcyxkb3duQXJyb3dZcG9zKTtcbi8vXG4vL1xuLy9cbi8vICAgbWludXRlSGFuZENhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsICgpID0+IHtcbi8vXG4vLyAgICAgaWYgKChldmVudC5jbGllbnRYID49IGNsb2NrQnRuWHBvcyAmJiBldmVudC5jbGllbnRYIDw9IChjbG9ja0J0blhwb3MgKyBpbWFnZXMuY2xvY2tCdG4ud2lkdGgpKSkge1xuLy9cbi8vICAgICAgIGlmKGV2ZW50LmNsaWVudFkgPj0gdXBBcnJvd1lwb3MgJiYgZXZlbnQuY2xpZW50WSA8PSAodXBBcnJvd1lwb3MgKyBpbWFnZXMudXBBcnJvdy5oZWlnaHQpKVxuLy8gICAgICAge1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBtaW51dGVIYW5kQ2FudmFzLndpZHRoLCBtaW51dGVIYW5kQ2FudmFzLmhlaWdodCk7XG4vL1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnNhdmUoKTtcbi8vICAgICAgICAgICBhbmdsZSArPSA2O1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnRyYW5zbGF0ZShtaW51dGVoYW5kWHBvcyArIGltYWdlcy5taW51dGVIYW5kLndpZHRoIC8gMiwgbWludXRlaGFuZFlwb3MgKyBpbWFnZXMubWludXRlSGFuZC5oZWlnaHQpO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnJvdGF0ZShhbmdsZSAqIChNYXRoLlBJIC8gMTgwKSk7XG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQudHJhbnNsYXRlKC0obWludXRlaGFuZFhwb3MgKyBpbWFnZXMubWludXRlSGFuZC53aWR0aCAvIDIpLCAtKG1pbnV0ZWhhbmRZcG9zICsgaW1hZ2VzLm1pbnV0ZUhhbmQuaGVpZ2h0KSk7XG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQuZHJhd0ltYWdlKGltYWdlcy5taW51dGVIYW5kLCBtaW51dGVoYW5kWHBvcywgbWludXRlaGFuZFlwb3MpO1xuLy9cbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5yZXN0b3JlKCk7XG4vL1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnNhdmUoKTtcbi8vICAgICAgICAgICBob3VyaGFuZEFuZ2xlICs9IDAuNTtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC50cmFuc2xhdGUoaG91ckhhbmRYcG9zICsgaW1hZ2VzLmhvdXJIYW5kLndpZHRoIC8gMiwgaG91ckhhbmRZcG9zICsgaW1hZ2VzLmhvdXJIYW5kLmhlaWdodCk7XG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQucm90YXRlKGhvdXJoYW5kQW5nbGUgKiAoTWF0aC5QSSAvIDE4MCkpO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnRyYW5zbGF0ZSgtKGhvdXJIYW5kWHBvcyArIGltYWdlcy5ob3VySGFuZC53aWR0aCAvIDIpLCAtKGhvdXJIYW5kWXBvcyArIGltYWdlcy5ob3VySGFuZC5oZWlnaHQpKTtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLmhvdXJIYW5kLCBob3VySGFuZFhwb3MsIGhvdXJIYW5kWXBvcyk7XG4vL1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnJlc3RvcmUoKTtcbi8vXG4vLyAgICAgICAgICAgbWludXRlcysrO1xuLy8gICAgICAgICAgIGlmIChtaW51dGVzICUgNjAgPT0gMCkge1xuLy8gICAgICAgICAgICAgaG91cnMrKztcbi8vICAgICAgICAgICAgIG1pbnV0ZXMgPSAwO1xuLy8gICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgaG91cnMgPSAoaG91cnMgPiAxMikgPyBob3VycyAtIDEyIDogaG91cnM7XG4vL1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LmRyYXdJbWFnZShpbWFnZXNbTWF0aC5hYnMoaG91cnMpLnRvU3RyaW5nKCldLCBob3Vyc1hQb3MsIGhvdXJzWXBvcyk7XG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tNYXRoLmFicyhtaW51dGVzKS50b1N0cmluZygpXSwgbWludXRlWHBvcywgbWludXRlWXBvcyk7XG4vLyAgICAgICB9XG4vLyAgICAgICBlbHNlIGlmKGV2ZW50LmNsaWVudFkgPj0gZG93bkFycm93WXBvcyAmJiBldmVudC5jbGllbnRZIDw9IChkb3duQXJyb3dZcG9zICsgaW1hZ2VzLmRvd25BcnJvdy5oZWlnaHQpKVxuLy8gICAgICAge1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBtaW51dGVIYW5kQ2FudmFzLndpZHRoLCBtaW51dGVIYW5kQ2FudmFzLmhlaWdodCk7XG4vL1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnNhdmUoKTtcbi8vICAgICAgICAgICBhbmdsZSAtPSA2O1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnRyYW5zbGF0ZShtaW51dGVoYW5kWHBvcyArIGltYWdlcy5taW51dGVIYW5kLndpZHRoIC8gMiwgbWludXRlaGFuZFlwb3MgKyBpbWFnZXMubWludXRlSGFuZC5oZWlnaHQpO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnJvdGF0ZShhbmdsZSAqIChNYXRoLlBJIC8gMTgwKSk7XG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQudHJhbnNsYXRlKC0obWludXRlaGFuZFhwb3MgKyBpbWFnZXMubWludXRlSGFuZC53aWR0aCAvIDIpLCAtKG1pbnV0ZWhhbmRZcG9zICsgaW1hZ2VzLm1pbnV0ZUhhbmQuaGVpZ2h0KSk7XG4vL1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LmRyYXdJbWFnZShpbWFnZXMubWludXRlSGFuZCwgbWludXRlaGFuZFhwb3MsIG1pbnV0ZWhhbmRZcG9zKTtcbi8vXG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQucmVzdG9yZSgpO1xuLy9cbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5zYXZlKCk7XG4vLyAgICAgICAgICAgaG91cmhhbmRBbmdsZSAtPSAwLjU7XG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQudHJhbnNsYXRlKGhvdXJIYW5kWHBvcyArIGltYWdlcy5ob3VySGFuZC53aWR0aCAvIDIsIGhvdXJIYW5kWXBvcyArIGltYWdlcy5ob3VySGFuZC5oZWlnaHQpO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnJvdGF0ZShob3VyaGFuZEFuZ2xlICogKE1hdGguUEkgLyAxODApKTtcbi8vXG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQudHJhbnNsYXRlKC0oaG91ckhhbmRYcG9zICsgaW1hZ2VzLmhvdXJIYW5kLndpZHRoIC8gMiksIC0oaG91ckhhbmRZcG9zICsgaW1hZ2VzLmhvdXJIYW5kLmhlaWdodCkpO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LmRyYXdJbWFnZShpbWFnZXMuaG91ckhhbmQsIGhvdXJIYW5kWHBvcywgaG91ckhhbmRZcG9zKTtcbi8vXG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQucmVzdG9yZSgpO1xuLy9cbi8vICAgICAgICAgICBtaW51dGVzLS07XG4vLyAgICAgICAgICAgaWYgKG1pbnV0ZXMgPCAwKSB7XG4vLyAgICAgICAgICAgICBob3Vycy0tO1xuLy8gICAgICAgICAgICAgbWludXRlcyA9IDU5O1xuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgICBob3VycyA9IChob3VycyA8PSAwKSA/IDEyIDogaG91cnM7XG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tNYXRoLmFicyhob3VycykudG9TdHJpbmcoKV0sIGhvdXJzWFBvcywgaG91cnNZcG9zKTtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW01hdGguYWJzKG1pbnV0ZXMpLnRvU3RyaW5nKCldLCBtaW51dGVYcG9zLCBtaW51dGVZcG9zKTtcbi8vICAgICAgIH1cbi8vICAgICB9XG4vLyAgIH0pO1xuLy9cbi8vIH0pO1xuIl19
