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
  dynamicCanvas.addEventListener("mousedown", function () {
    if (event.clientX >= images.clockBtn.xPos && event.clientX <= images.clockBtn.xPos + images.clockBtn.width) {
      if (event.clientY >= images.upArrow.yPos && event.clientY <= images.upArrow.yPos + images.upArrow.height) {
        minuteHandAngle += minuteHandDegree;
        hourHandAngle += hourHandDegree;
        dynamicContext.clearRect(0, 0, dynamicCanvas.width, dynamicCanvas.height);
        rotateImage(minuteHandAngle, images.minuteHand.xPos + images.minuteHand.width / 2, images.minuteHand.yPos + images.minuteHand.height, images.minuteHand);
        rotateImage(hourHandAngle, images.hourHand.xPos + images.hourHand.width / 2, images.hourHand.yPos + images.hourHand.height, images.hourHand);
        minutes++;
        if (minutes % 60 == 0) {
          hours++;
          minutes = 0;
        }
        hours = hours > 12 ? hours - 12 : hours;
        var minutesText = minutes < 10 ? "0" + Math.abs(minutes) : Math.abs(minutes).toString();
        var hourText = hours < 10 ? "0" + Math.abs(hours) : Math.abs(hours).toString();
        dynamicContext.fillText(hourText, hourHandxPos, hourHandyPos);
        dynamicContext.fillText(minutesText, minuteHandxPos, minuteHandyPos);
      } else {
        minuteHandAngle -= minuteHandDegree;
        hourHandAngle -= hourHandDegree;
        dynamicContext.clearRect(0, 0, dynamicCanvas.width, dynamicCanvas.height);
        rotateImage(minuteHandAngle, images.minuteHand.xPos + images.minuteHand.width / 2, images.minuteHand.yPos + images.minuteHand.height, images.minuteHand);
        rotateImage(hourHandAngle, images.hourHand.xPos + images.hourHand.width / 2, images.hourHand.yPos + images.hourHand.height, images.hourHand);

        minutes--;
        if (minutes < 0) {
          hours--;
          minutes = 59;
        }
        hours = hours <= 0 ? 12 : hours;
        var _minutesText = minutes < 10 ? "0" + Math.abs(minutes) : Math.abs(minutes).toString();
        var hoursText = hours < 10 ? "0" + Math.abs(hours) : Math.abs(hours).toString();
        dynamicContext.fillText(hoursText, hourHandxPos, hourHandyPos);
        dynamicContext.fillText(_minutesText, minuteHandxPos, minuteHandyPos);
      }
    }
  });
}

function rotateImage(angle, translateXpos, translateYpos, imageObj) {
  dynamicContext.save();
  dynamicContext.translate(translateXpos, translateYpos);
  dynamicContext.rotate(angle * (Math.PI / 180));
  dynamicContext.translate(-translateXpos, -translateYpos);
  dynamicContext.drawImage(imageObj.image, imageObj.xPos, imageObj.yPos);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvY3VzdG9tSW1hZ2UvaW1hZ2UuanMiLCJhcHAvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQWEsVyxXQUFBLFc7QUFFWCx1QkFBWSxRQUFaLEVBQ0E7QUFBQTs7QUFBQTs7QUFDRSxTQUFLLE1BQUwsR0FBYyxJQUFJLEtBQUosRUFBZDtBQUNBLFNBQUssTUFBTCxDQUFZLE1BQVosR0FBcUIsWUFDckI7QUFDRSxZQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0QsS0FIRDtBQUlBLFNBQUssTUFBTCxDQUFZLEdBQVosR0FBa0IsUUFBbEI7QUFDRDs7OztzQkFFUSxJLEVBQ1Y7QUFDRSxXQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0QsSzt3QkFRRDtBQUNFLGFBQU8sS0FBSyxLQUFaO0FBQ0Q7OztzQkFSUyxJLEVBQ1Y7QUFDRSxXQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0QsSzt3QkFPRDtBQUNFLGFBQU8sS0FBSyxLQUFaO0FBQ0Q7Ozt3QkFHRDtBQUNFLGFBQU8sS0FBSyxNQUFaO0FBQ0Q7Ozt3QkFHRDtBQUNFLGFBQU8sS0FBSyxPQUFaO0FBQ0Q7Ozt3QkFHRDtBQUNFLGFBQU8sS0FBSyxNQUFMLENBQVksS0FBbkI7QUFDRDs7O3dCQUdEO0FBQ0UsYUFBTyxLQUFLLE1BQUwsQ0FBWSxNQUFuQjtBQUNEOzs7Ozs7Ozs7QUNqREY7O0FBRUEsSUFBTSxtQkFBbUIsU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQXpCO0FBQ0EsSUFBTSxnQkFBZ0IsU0FBUyxjQUFULENBQXdCLFNBQXhCLENBQXRCO0FBQ0EsSUFBTSxpQkFBaUIsY0FBYyxVQUFkLENBQXlCLElBQXpCLENBQXZCO0FBQ0EsSUFBTSxvQkFBb0IsaUJBQWlCLFVBQWpCLENBQTRCLElBQTVCLENBQTFCOztBQUdBLGlCQUFpQixLQUFqQixHQUF5QixPQUFPLFVBQWhDO0FBQ0EsaUJB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QUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY2xhc3MgQ3VzdG9tSW1hZ2V7XG5cbiAgY29uc3RydWN0b3IoZmlsZXBhdGgpXG4gIHtcbiAgICB0aGlzLl9pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIHRoaXMuX2ltYWdlLm9ubG9hZCA9ICgpID0+XG4gICAge1xuICAgICAgdGhpcy5fbG9hZGVkID0gdHJ1ZTtcbiAgICB9O1xuICAgIHRoaXMuX2ltYWdlLnNyYyA9IGZpbGVwYXRoO1xuICB9XG5cbiAgc2V0IHhQb3MoeFBvcylcbiB7XG4gICB0aGlzLl94cG9zID0geFBvcztcbiB9XG5cbiAgc2V0IHlQb3MoeVBvcylcbiB7XG4gICB0aGlzLl95cG9zID0geVBvcztcbiB9XG5cbiAgZ2V0IHhQb3MoKVxuIHtcbiAgIHJldHVybiB0aGlzLl94cG9zO1xuIH1cbiAgZ2V0IHlQb3MoKVxuIHtcbiAgIHJldHVybiB0aGlzLl95cG9zO1xuIH1cblxuIGdldCBpbWFnZSgpXG4ge1xuICAgcmV0dXJuIHRoaXMuX2ltYWdlO1xuIH1cblxuIGdldCBkaWRsb2FkKClcbiB7XG4gICByZXR1cm4gdGhpcy5fbG9hZGVkO1xuIH1cblxuIGdldCB3aWR0aCgpXG4ge1xuICAgcmV0dXJuIHRoaXMuX2ltYWdlLndpZHRoO1xuIH1cblxuIGdldCBoZWlnaHQoKVxuIHtcbiAgIHJldHVybiB0aGlzLl9pbWFnZS5oZWlnaHQ7XG4gfVxufVxuIiwiaW1wb3J0IHtDdXN0b21JbWFnZX0gZnJvbSBcIi4vY3VzdG9tSW1hZ2UvaW1hZ2UuanNcIlxuXG5jb25zdCBiYWNrZ3JvdW5kQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhY2tncm91bmQnKTtcbmNvbnN0IGR5bmFtaWNDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHluYW1pYycpO1xuY29uc3QgZHluYW1pY0NvbnRleHQgPSBkeW5hbWljQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5jb25zdCBiYWNrZ3JvdW5kQ29udGV4dCA9IGJhY2tncm91bmRDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuXG5iYWNrZ3JvdW5kQ2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5iYWNrZ3JvdW5kQ2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuZHluYW1pY0NhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuZHluYW1pY0NhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbmNvbnN0IG1pbnV0ZUhhbmREZWdyZWUgPSA2O1xuY29uc3QgaG91ckhhbmREZWdyZWUgPSAwLjU7XG5cbnZhciBtaW51dGVIYW5keFBvcztcbnZhciBtaW51dGVIYW5keVBvcztcbnZhciBob3VySGFuZHhQb3M7XG52YXIgaG91ckhhbmR5UG9zO1xuXG52YXIgbWludXRlSGFuZEFuZ2xlID0gMDtcbnZhciBob3VySGFuZEFuZ2xlID0gMDtcblxudmFyIG1pbnV0ZXMgPSAwO1xudmFyIGhvdXJzID0gMTI7XG5cbmNvbnN0IGltYWdlcyA9IHtcbiAgYmFja2dyb3VuZDogbmV3IEN1c3RvbUltYWdlKFwiLi9hc3NldHMvc3RhdGljL2JhY2tncm91bmQuanBnXCIpLFxuICB3cmlzdFdhdGNoOiBuZXcgQ3VzdG9tSW1hZ2UoXCIuL2Fzc2V0cy9zdGF0aWMvY2xvY2tyZXNpemVkLnBuZ1wiKSxcbiAgbWludXRlSGFuZDogbmV3IEN1c3RvbUltYWdlKFwiLi9hc3NldHMvZHluYW1pYy9oYW5kcy9taW51dGVoYW5kcmVzaXplZC5wbmdcIiksXG4gIGhvdXJIYW5kOiBuZXcgQ3VzdG9tSW1hZ2UoXCIuL2Fzc2V0cy9keW5hbWljL2hhbmRzL2hvdXJoYW5kcmVzaXplZC5wbmdcIiksXG4gIGNsb2NrQnRuOiBuZXcgQ3VzdG9tSW1hZ2UoXCIuL2Fzc2V0cy9zdGF0aWMvY2xvY2tidG5yZXNpemVkLnBuZ1wiKSxcbiAgdXBBcnJvdzogbmV3IEN1c3RvbUltYWdlKFwiLi9hc3NldHMvc3RhdGljL3VwQXJyb3cucG5nXCIpLFxuICBkb3duQXJyb3c6IG5ldyBDdXN0b21JbWFnZShcIi4vYXNzZXRzL3N0YXRpYy9kb3duQXJyb3cucG5nXCIpLFxuICBkaWdpdGFsV2F0Y2g6IG5ldyBDdXN0b21JbWFnZShcIi4vYXNzZXRzL3N0YXRpYy9kaWdpdGFsX3RpbWVzX3Jlc2l6ZWQucG5nXCIpXG59O1xuXG52YXIgaW1hZ2Vsb2FkT2JzZXJ2ZXI7XG5cblxuZnVuY3Rpb24gY2hlY2tJZmxvYWRlZCgpIHtcbiAgbGV0IGltYWdlc0xvYWRlZCA9IDA7XG4gIGxldCBudW1JbWFnZXMgPSAwO1xuXG4gIGZvciAodmFyIGltYWdlIGluIGltYWdlcykge1xuICAgIG51bUltYWdlcysrO1xuICB9XG5cbiAgZm9yICh2YXIgaW1hZ2UgaW4gaW1hZ2VzKSB7XG4gICAgaWYgKGltYWdlc1tpbWFnZV0uZGlkbG9hZCkge1xuXG4gICAgICBpbWFnZXNMb2FkZWQrKztcbiAgICB9XG4gIH1cbiAgaWYgKGltYWdlc0xvYWRlZCA+PSBudW1JbWFnZXMpIHtcblxuICAgIGNsZWFySW50ZXJ2YWwoaW1hZ2Vsb2FkT2JzZXJ2ZXIpO1xuICAgIHNldFBhcmFtZXRlcnMoKTtcblxuICB9XG59XG5cblxuXG5mdW5jdGlvbiBhZGREaWdpdGFsV2F0Y2hOdW1iZXJzKCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8PSA1OTsgaSsrKSB7XG4gICAgaW1hZ2VzW2kudG9TdHJpbmcoKV0gPSBuZXcgQ3VzdG9tSW1hZ2UoXCIuL2Fzc2V0cy9keW5hbWljL251bWJlcnMvXCIgKyBpICsgXCIucG5nXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldFBhcmFtZXRlcnMoKSB7XG5cbiAgaW1hZ2VzLmJhY2tncm91bmQueFBvcyA9IDA7XG4gIGltYWdlcy5iYWNrZ3JvdW5kLnlQb3MgPSAwO1xuICBpbWFnZXMud3Jpc3RXYXRjaC54UG9zID0gYmFja2dyb3VuZENhbnZhcy53aWR0aCAvIDQgLSBpbWFnZXMud3Jpc3RXYXRjaC53aWR0aDtcbiAgaW1hZ2VzLndyaXN0V2F0Y2gueVBvcyA9IGJhY2tncm91bmRDYW52YXMuaGVpZ2h0IC8gNDtcbiAgaW1hZ2VzLm1pbnV0ZUhhbmQueFBvcyA9IGltYWdlcy53cmlzdFdhdGNoLnhQb3MgKyBpbWFnZXMud3Jpc3RXYXRjaC53aWR0aCAvIDIgLSBpbWFnZXMubWludXRlSGFuZC53aWR0aCAvIDI7XG4gIGltYWdlcy5taW51dGVIYW5kLnlQb3MgPSAoZHluYW1pY0NhbnZhcy5oZWlnaHQgLyA0KSArIChpbWFnZXMud3Jpc3RXYXRjaC5oZWlnaHQgLyAyKSAtIGltYWdlcy5taW51dGVIYW5kLmhlaWdodDtcbiAgaW1hZ2VzLmhvdXJIYW5kLnhQb3MgPSBpbWFnZXMud3Jpc3RXYXRjaC54UG9zICsgaW1hZ2VzLndyaXN0V2F0Y2gud2lkdGggLyAyIC0gaW1hZ2VzLmhvdXJIYW5kLndpZHRoIC8gMjtcbiAgaW1hZ2VzLmhvdXJIYW5kLnlQb3MgPSAoaW1hZ2VzLndyaXN0V2F0Y2gueVBvcyArIGltYWdlcy53cmlzdFdhdGNoLmhlaWdodCAvIDIpIC0gaW1hZ2VzLmhvdXJIYW5kLmhlaWdodDtcbiAgaW1hZ2VzLmNsb2NrQnRuLnhQb3MgPSBpbWFnZXMud3Jpc3RXYXRjaC54UG9zICsgaW1hZ2VzLndyaXN0V2F0Y2gud2lkdGg7XG4gIGltYWdlcy5jbG9ja0J0bi55UG9zID0gKGltYWdlcy53cmlzdFdhdGNoLmhlaWdodCAvIDIgKyBpbWFnZXMud3Jpc3RXYXRjaC55UG9zKSAtIChpbWFnZXMuY2xvY2tCdG4uaGVpZ2h0IC8gMik7XG4gIGltYWdlcy5kaWdpdGFsV2F0Y2gueFBvcyA9IChiYWNrZ3JvdW5kQ2FudmFzLndpZHRoICogMykgLyA0IC0gaW1hZ2VzLmRpZ2l0YWxXYXRjaC53aWR0aDtcbiAgaW1hZ2VzLmRpZ2l0YWxXYXRjaC55UG9zID0gKGltYWdlcy53cmlzdFdhdGNoLmhlaWdodCAvIDIgKyBiYWNrZ3JvdW5kQ2FudmFzLmhlaWdodCAvIDQpIC0gKGltYWdlcy5kaWdpdGFsV2F0Y2guaGVpZ2h0IC8gMik7XG4gIGltYWdlcy51cEFycm93LnhQb3MgPSBpbWFnZXMuY2xvY2tCdG4ueFBvcztcbiAgaW1hZ2VzLnVwQXJyb3cueVBvcyA9IGltYWdlcy5jbG9ja0J0bi55UG9zIC0gaW1hZ2VzLnVwQXJyb3cuaGVpZ2h0O1xuICBpbWFnZXMuZG93bkFycm93LnhQb3MgPSBpbWFnZXMuY2xvY2tCdG4ueFBvcztcbiAgaW1hZ2VzLmRvd25BcnJvdy55UG9zID0gaW1hZ2VzLmNsb2NrQnRuLnlQb3MgKyBpbWFnZXMuY2xvY2tCdG4uaGVpZ2h0O1xuXG4gIGhvdXJIYW5keFBvcyA9IGltYWdlcy5kaWdpdGFsV2F0Y2gueFBvcyArIChpbWFnZXMuZGlnaXRhbFdhdGNoLndpZHRoKSAvIDg7XG4gIGhvdXJIYW5keVBvcyA9IGltYWdlcy5kaWdpdGFsV2F0Y2gueVBvcyArIGltYWdlcy5kaWdpdGFsV2F0Y2guaGVpZ2h0IC8gMjtcbiAgbWludXRlSGFuZHhQb3MgPSBob3VySGFuZHhQb3MgKyAoaW1hZ2VzLmRpZ2l0YWxXYXRjaC53aWR0aCAqIDMpIC8gODtcbiAgbWludXRlSGFuZHlQb3MgPSBob3VySGFuZHlQb3M7XG5cblxuICBiYWNrZ3JvdW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLmJhY2tncm91bmQuaW1hZ2UsIGltYWdlcy5iYWNrZ3JvdW5kLnhQb3MsIGltYWdlcy5iYWNrZ3JvdW5kLnlQb3MpO1xuICBiYWNrZ3JvdW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLndyaXN0V2F0Y2guaW1hZ2UsIGltYWdlcy53cmlzdFdhdGNoLnhQb3MsIGltYWdlcy53cmlzdFdhdGNoLnlQb3MpO1xuICBiYWNrZ3JvdW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLmNsb2NrQnRuLmltYWdlLCBpbWFnZXMuY2xvY2tCdG4ueFBvcywgaW1hZ2VzLmNsb2NrQnRuLnlQb3MpO1xuICBiYWNrZ3JvdW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLmRpZ2l0YWxXYXRjaC5pbWFnZSwgaW1hZ2VzLmRpZ2l0YWxXYXRjaC54UG9zLCBpbWFnZXMuZGlnaXRhbFdhdGNoLnlQb3MpO1xuICBiYWNrZ3JvdW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLnVwQXJyb3cuaW1hZ2UsIGltYWdlcy51cEFycm93LnhQb3MsIGltYWdlcy51cEFycm93LnlQb3MpO1xuICBiYWNrZ3JvdW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLmRvd25BcnJvdy5pbWFnZSwgaW1hZ2VzLmRvd25BcnJvdy54UG9zLCBpbWFnZXMuZG93bkFycm93LnlQb3MpO1xuXG4gIGR5bmFtaWNDb250ZXh0LmRyYXdJbWFnZShpbWFnZXMubWludXRlSGFuZC5pbWFnZSwgaW1hZ2VzLm1pbnV0ZUhhbmQueFBvcywgaW1hZ2VzLm1pbnV0ZUhhbmQueVBvcyk7XG4gIGR5bmFtaWNDb250ZXh0LmRyYXdJbWFnZShpbWFnZXMuaG91ckhhbmQuaW1hZ2UsIGltYWdlcy5taW51dGVIYW5kLnhQb3MsIGltYWdlcy5ob3VySGFuZC55UG9zKTtcblxuICBkeW5hbWljQ29udGV4dC5mb250ID0gJzUwcHQgdmVyZGFuYSwgc2Fucy1zZXJpZic7XG4gIGR5bmFtaWNDb250ZXh0LmZpbGxTdHlsZSA9IFwiI0ZGRkZGRlwiO1xuICBiYWNrZ3JvdW5kQ29udGV4dC5mb250ID0gZHluYW1pY0NvbnRleHQuZm9udDtcbiAgYmFja2dyb3VuZENvbnRleHQuZmlsbFN0eWxlID0gZHluYW1pY0NvbnRleHQuZmlsbFN0eWxlO1xuICBkeW5hbWljQ29udGV4dC5maWxsVGV4dChcIjEyXCIsIGhvdXJIYW5keFBvcywgaG91ckhhbmR5UG9zKTtcbiAgYmFja2dyb3VuZENvbnRleHQuZmlsbFRleHQoXCI6XCIsIGhvdXJIYW5keFBvcyArICgyICogaW1hZ2VzLmRpZ2l0YWxXYXRjaC53aWR0aCkgLyA4LCBob3VySGFuZHlQb3MgLSA1KTtcbiAgZHluYW1pY0NvbnRleHQuZmlsbFRleHQoXCIwMFwiLCBtaW51dGVIYW5keFBvcywgbWludXRlSGFuZHlQb3MpO1xuXG5cbiAgc2V0TGlzdGVuZXJzKCk7XG5cbn1cblxuZnVuY3Rpb24gc2V0TGlzdGVuZXJzKCkge1xuICBkeW5hbWljQ2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKCkgPT4ge1xuICAgIGlmICgoZXZlbnQuY2xpZW50WCA+PSBpbWFnZXMuY2xvY2tCdG4ueFBvcyAmJiBldmVudC5jbGllbnRYIDw9IChpbWFnZXMuY2xvY2tCdG4ueFBvcyArIGltYWdlcy5jbG9ja0J0bi53aWR0aCkpKSB7XG4gICAgICBpZiAoZXZlbnQuY2xpZW50WSA+PSBpbWFnZXMudXBBcnJvdy55UG9zICYmIGV2ZW50LmNsaWVudFkgPD0gKGltYWdlcy51cEFycm93LnlQb3MgKyBpbWFnZXMudXBBcnJvdy5oZWlnaHQpKSB7XG4gICAgICAgIG1pbnV0ZUhhbmRBbmdsZSArPSBtaW51dGVIYW5kRGVncmVlO1xuICAgICAgICBob3VySGFuZEFuZ2xlICs9IGhvdXJIYW5kRGVncmVlO1xuICAgICAgICBkeW5hbWljQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgZHluYW1pY0NhbnZhcy53aWR0aCwgZHluYW1pY0NhbnZhcy5oZWlnaHQpO1xuICAgICAgICByb3RhdGVJbWFnZShtaW51dGVIYW5kQW5nbGUsIGltYWdlcy5taW51dGVIYW5kLnhQb3MgKyBpbWFnZXMubWludXRlSGFuZC53aWR0aCAvIDIsIGltYWdlcy5taW51dGVIYW5kLnlQb3MgKyBpbWFnZXMubWludXRlSGFuZC5oZWlnaHQsIGltYWdlcy5taW51dGVIYW5kKTtcbiAgICAgICAgcm90YXRlSW1hZ2UoaG91ckhhbmRBbmdsZSwgaW1hZ2VzLmhvdXJIYW5kLnhQb3MgKyBpbWFnZXMuaG91ckhhbmQud2lkdGggLyAyLCBpbWFnZXMuaG91ckhhbmQueVBvcyArIGltYWdlcy5ob3VySGFuZC5oZWlnaHQsIGltYWdlcy5ob3VySGFuZCk7XG4gICAgICAgIG1pbnV0ZXMrKztcbiAgICAgICAgaWYgKG1pbnV0ZXMgJSA2MCA9PSAwKSB7XG4gICAgICAgICAgaG91cnMrKztcbiAgICAgICAgICBtaW51dGVzID0gMDtcbiAgICAgICAgfVxuICAgICAgICBob3VycyA9IChob3VycyA+IDEyKSA/IGhvdXJzIC0gMTIgOiBob3VycztcbiAgICAgICAgbGV0IG1pbnV0ZXNUZXh0ID0gKG1pbnV0ZXMgPCAxMCkgPyBcIjBcIiArIE1hdGguYWJzKG1pbnV0ZXMpIDogTWF0aC5hYnMobWludXRlcykudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IGhvdXJUZXh0ID0gKGhvdXJzIDwgMTApID8gXCIwXCIgKyBNYXRoLmFicyhob3VycykgOiBNYXRoLmFicyhob3VycykudG9TdHJpbmcoKTtcbiAgICAgICAgZHluYW1pY0NvbnRleHQuZmlsbFRleHQoaG91clRleHQsIGhvdXJIYW5keFBvcywgaG91ckhhbmR5UG9zKTtcbiAgICAgICAgZHluYW1pY0NvbnRleHQuZmlsbFRleHQobWludXRlc1RleHQsIG1pbnV0ZUhhbmR4UG9zLCBtaW51dGVIYW5keVBvcyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbWludXRlSGFuZEFuZ2xlIC09IG1pbnV0ZUhhbmREZWdyZWU7XG4gICAgICAgIGhvdXJIYW5kQW5nbGUgLT0gaG91ckhhbmREZWdyZWU7XG4gICAgICAgIGR5bmFtaWNDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBkeW5hbWljQ2FudmFzLndpZHRoLCBkeW5hbWljQ2FudmFzLmhlaWdodCk7XG4gICAgICAgIHJvdGF0ZUltYWdlKG1pbnV0ZUhhbmRBbmdsZSwgaW1hZ2VzLm1pbnV0ZUhhbmQueFBvcyArIGltYWdlcy5taW51dGVIYW5kLndpZHRoIC8gMiwgaW1hZ2VzLm1pbnV0ZUhhbmQueVBvcyArIGltYWdlcy5taW51dGVIYW5kLmhlaWdodCwgaW1hZ2VzLm1pbnV0ZUhhbmQpO1xuICAgICAgICByb3RhdGVJbWFnZShob3VySGFuZEFuZ2xlLCBpbWFnZXMuaG91ckhhbmQueFBvcyArIGltYWdlcy5ob3VySGFuZC53aWR0aCAvIDIsIGltYWdlcy5ob3VySGFuZC55UG9zICsgaW1hZ2VzLmhvdXJIYW5kLmhlaWdodCxpbWFnZXMuaG91ckhhbmQpO1xuXG4gICAgICAgIG1pbnV0ZXMtLTtcbiAgICAgICAgaWYgKG1pbnV0ZXMgPCAwKSB7XG4gICAgICAgICAgaG91cnMtLTtcbiAgICAgICAgICBtaW51dGVzID0gNTk7XG4gICAgICAgIH1cbiAgICAgICAgaG91cnMgPSAoaG91cnMgPD0gMCkgPyAxMiA6IGhvdXJzO1xuICAgICAgICBsZXQgbWludXRlc1RleHQgPSAobWludXRlcyA8IDEwKSA/IFwiMFwiICsgTWF0aC5hYnMobWludXRlcykgOiBNYXRoLmFicyhtaW51dGVzKS50b1N0cmluZygpO1xuICAgICAgICBsZXQgaG91cnNUZXh0ID0gKGhvdXJzIDwgMTApID8gXCIwXCIgKyBNYXRoLmFicyhob3VycykgOiBNYXRoLmFicyhob3VycykudG9TdHJpbmcoKTtcbiAgICAgICAgZHluYW1pY0NvbnRleHQuZmlsbFRleHQoaG91cnNUZXh0LCBob3VySGFuZHhQb3MsIGhvdXJIYW5keVBvcyk7XG4gICAgICAgIGR5bmFtaWNDb250ZXh0LmZpbGxUZXh0KG1pbnV0ZXNUZXh0LCBtaW51dGVIYW5keFBvcywgbWludXRlSGFuZHlQb3MpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJvdGF0ZUltYWdlKGFuZ2xlLCB0cmFuc2xhdGVYcG9zLCB0cmFuc2xhdGVZcG9zLCBpbWFnZU9iaikge1xuICBkeW5hbWljQ29udGV4dC5zYXZlKCk7XG4gIGR5bmFtaWNDb250ZXh0LnRyYW5zbGF0ZSh0cmFuc2xhdGVYcG9zLCB0cmFuc2xhdGVZcG9zKTtcbiAgZHluYW1pY0NvbnRleHQucm90YXRlKGFuZ2xlICogKE1hdGguUEkgLyAxODApKTtcbiAgZHluYW1pY0NvbnRleHQudHJhbnNsYXRlKC0odHJhbnNsYXRlWHBvcyksIC0odHJhbnNsYXRlWXBvcykpO1xuICBkeW5hbWljQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VPYmouaW1hZ2UsIGltYWdlT2JqLnhQb3MsIGltYWdlT2JqLnlQb3MpO1xuICBkeW5hbWljQ29udGV4dC5yZXN0b3JlKCk7XG5cbn1cblxuXG5cblxuXG5cblxuXG5cbi8vIGFkZERpZ2l0YWxXYXRjaE51bWJlcnMoKTtcbmltYWdlbG9hZE9ic2VydmVyID0gd2luZG93LnNldEludGVydmFsKGNoZWNrSWZsb2FkZWQsIDQwMClcblxuXG5cbi8vIHZhciBob3VycyA9IDA7XG4vLyB2YXIgbWludXRlcyA9IDA7XG4vL1xuLy9cbi8vXG4vL1xuXG4vL1xuLy8gdmFyIGltYWdlc1RvTG9hZCA9XG4vLyAgIHtcbi8vICAgICBiYWNrZ3JvdW5kOiBcIi4vYXNzZXRzL3N0YXRpYy9iYWNrZ3JvdW5kLmpwZ1wiLFxuLy8gICAgIHdyaXN0V2F0Y2g6IFwiLi9hc3NldHMvc3RhdGljL2Nsb2NrcmVzaXplZC5wbmdcIixcbi8vICAgICBkaWdpdGFsV2F0Y2g6IFwiLi9hc3NldHMvc3RhdGljL2RpZ2l0YWxfdGltZXNfcmVzaXplZC5wbmdcIixcbi8vICAgICBjbG9ja0J0bjogXCIuL2Fzc2V0cy9zdGF0aWMvY2xvY2tidG5yZXNpemVkLnBuZ1wiLFxuLy8gICAgIG1pbnV0ZUhhbmQ6IFwiXCIsXG4vLyAgICAgaG91ckhhbmQ6IFwiLi9hc3NldHMvZHluYW1pYy9oYW5kcy9ob3VyaGFuZHJlc2l6ZWQucG5nXCIsXG4vLyAgICAgLy8gaGFuZDogXCIuL2hhbmQucG5nXCIsXG4vLyAgICAgLy8gcGluY2g6IFwiLi9waW5jaC5wbmdcIixcbi8vICAgICBzZW1pY29sb246IFwiLi9hc3NldHMvc3RhdGljL3NlbWljb2xvbi5wbmdcIixcbi8vICAgICB1cEFycm93OiBcIi4vYXNzZXRzL3N0YXRpYy91cEFycm93LnBuZ1wiLFxuLy8gICAgIGRvd25BcnJvdzogXCIuL2Fzc2V0cy9zdGF0aWMvZG93bkFycm93LnBuZ1wiXG4vL1xuLy8gICB9O1xuLy9cbi8vIGZ1bmN0aW9uIGxvYWROdW1iZXJzKCkge1xuLy8gICBmb3IgKGkgPSAwOyBpIDw9IDU5OyBpKyspIHtcbi8vICAgICBpbWFnZXNUb0xvYWRbaS50b1N0cmluZygpXSA9IFwiLi9hc3NldHMvZHluYW1pYy9udW1iZXJzL1wiICsgaSArIFwiLnBuZ1wiO1xuLy8gICB9XG4vLyB9XG4vL1xuLy8gZnVuY3Rpb24gcHJlbG9hZEltYWdlcyhpbWFnZXNQYXRoLCBkcmF3SW1hZ2VzKSB7XG4vLyAgIGxvYWROdW1iZXJzKCk7XG4vL1xuLy8gICB2YXIgaW1hZ2VzID0ge307XG4vLyAgIHZhciBpbWFnZXNMb2FkZWQgPSAwO1xuLy8gICB2YXIgbnVtSW1hZ2VzID0gMDtcbi8vXG4vLyAgIGZvciAodmFyIGltYWdlIGluIGltYWdlc1BhdGgpIHtcbi8vICAgICBudW1JbWFnZXMrKztcbi8vICAgfVxuLy9cbi8vICAgZm9yICh2YXIgaW1hZ2UgaW4gaW1hZ2VzUGF0aCkge1xuLy8gICAgIGltYWdlc1tpbWFnZV0gPSBuZXcgSW1hZ2UoKTtcbi8vICAgICBpbWFnZXNbaW1hZ2VdLm9ubG9hZCA9ICgpID0+IHtcbi8vICAgICAgIGlmICgrK2ltYWdlc0xvYWRlZCA+PSBudW1JbWFnZXMpIHtcbi8vICAgICAgICAgZHJhd0ltYWdlcyhpbWFnZXMpO1xuLy8gICAgICAgfVxuLy8gICAgIH07XG4vLyAgICAgaW1hZ2VzW2ltYWdlXS5zcmMgPSBpbWFnZXNQYXRoW2ltYWdlXTtcbi8vICAgfVxuLy8gfVxuLy9cbi8vIGZ1bmN0aW9uIHRlc3QoKSB7XG4vLyAgIGNvbnNvbGUubG9nKFwiaW4gaGVyZVwiKTtcbi8vIH1cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy8gcHJlbG9hZEltYWdlcyhpbWFnZXNUb0xvYWQsIChpbWFnZXMpID0+IHtcbi8vICAgdmFyIGNsb2NrWHBvcyA9IG1haW5jYW52YXMud2lkdGgvNCAtIGltYWdlcy53cmlzdFdhdGNoLndpZHRoO1xuLy8gICB2YXIgY2xvY2tZUG9zID0gbWFpbmNhbnZhcy5oZWlnaHQgLyA0O1xuLy8gICB2YXIgbWludXRlaGFuZFhwb3MgPSAoY2xvY2tYcG9zICsgaW1hZ2VzLndyaXN0V2F0Y2gud2lkdGgvMiAtIGltYWdlcy5taW51dGVIYW5kLndpZHRoLzIgKTtcbi8vICAgdmFyIG1pbnV0ZWhhbmRZcG9zID0gKChtYWluY2FudmFzLmhlaWdodCAvIDQpICsgKGltYWdlcy53cmlzdFdhdGNoLmhlaWdodCAvIDIpIC0gaW1hZ2VzLm1pbnV0ZUhhbmQuaGVpZ2h0KTtcbi8vICAgdmFyIGNsb2NrQnRuWHBvcyA9IGNsb2NrWHBvcyArIGltYWdlcy53cmlzdFdhdGNoLndpZHRoO1xuLy8gICB2YXIgY2xvY2tCdG5ZcG9zID0gKGltYWdlcy53cmlzdFdhdGNoLmhlaWdodCAvIDIgKyBtYWluY2FudmFzLmhlaWdodCAvIDQpIC0gKGltYWdlcy5jbG9ja0J0bi5oZWlnaHQgLyAyKTtcbi8vXG4vLyAgIHZhciBob3VySGFuZFhwb3MgPSAoY2xvY2tYcG9zICsgaW1hZ2VzLndyaXN0V2F0Y2gud2lkdGgvMiAtIGltYWdlcy5ob3VySGFuZC53aWR0aC8yKTtcbi8vICAgdmFyIGhvdXJIYW5kWXBvcyA9ICgobWludXRlSGFuZENhbnZhcy5oZWlnaHQgLyA0KSArIChpbWFnZXMud3Jpc3RXYXRjaC5oZWlnaHQgLyAyKSAtIGltYWdlcy5ob3VySGFuZC5oZWlnaHQpO1xuLy8gICB2YXIgaG91cnNYUG9zID0gaW1hZ2VzW1wiMTJcIl0ud2lkdGggLyAyICsgbWFpbmNhbnZhcy53aWR0aCAvIDI7XG4vLyAgIHZhciBob3Vyc1lwb3MgPSBtYWluY2FudmFzLmhlaWdodCAvIDIgLSBpbWFnZXNbXCIxMlwiXS5oZWlnaHQgLyAyO1xuLy8gICB2YXIgc2VtaWNvbG9uWFBvcyA9IGhvdXJzWFBvcyArIGltYWdlc1tcImRpZ2l0YWxXYXRjaFwiXS53aWR0aCAvIDQ7XG4vLyAgIHZhciBzZW1pY29sb25ZUG9zID0gaG91ckhhbmRZcG9zIC0gaW1hZ2VzW1wiZGlnaXRhbFdhdGNoXCJdLmhlaWdodCAvIDU7XG4vLyAgIHZhciBtaW51dGVYcG9zID0gaW1hZ2VzW1wiMTJcIl0ud2lkdGggLyAyICsgc2VtaWNvbG9uWFBvcztcbi8vICAgdmFyIG1pbnV0ZVlwb3MgPSBob3Vyc1lwb3Ncbi8vICAgdmFyIHVwQXJyb3dZcG9zID0gY2xvY2tCdG5ZcG9zIC0gaW1hZ2VzLnVwQXJyb3cuaGVpZ2h0IDtcbi8vICAgdmFyIGRvd25BcnJvd1lwb3MgPSBjbG9ja0J0bllwb3MgKyBpbWFnZXMuY2xvY2tCdG4uaGVpZ2h0O1xuLy8gICB2YXIgYW5nbGUgPSAwO1xuLy8gICB2YXIgaG91cmhhbmRBbmdsZSA9IDA7XG4vL1xuLy8gICBjdHguZHJhd0ltYWdlKGltYWdlcy5iYWNrZ3JvdW5kLCAwLCAwKTtcbi8vICAgY3R4LmRyYXdJbWFnZShpbWFnZXMud3Jpc3RXYXRjaCwgY2xvY2tYcG9zLCBjbG9ja1lQb3MpO1xuLy9cbi8vICAgY3R4LmRyYXdJbWFnZShpbWFnZXMuY2xvY2tCdG4sIGNsb2NrQnRuWHBvcywgY2xvY2tCdG5ZcG9zKTtcbi8vICAgbWludXRlSGFuZENvbnRleHQuZHJhd0ltYWdlKGltYWdlcy5ob3VySGFuZCwgaG91ckhhbmRYcG9zLCBob3VySGFuZFlwb3MpO1xuLy8gICBtaW51dGVIYW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLm1pbnV0ZUhhbmQsIG1pbnV0ZWhhbmRYcG9zLCBtaW51dGVoYW5kWXBvcyk7XG4vLyAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2VzLmRpZ2l0YWxXYXRjaCwgKG1haW5jYW52YXMud2lkdGggKiAzKSAvIDYsIChpbWFnZXMud3Jpc3RXYXRjaC5oZWlnaHQvMiArIG1haW5jYW52YXMuaGVpZ2h0LzQpIC0gKGltYWdlcy5kaWdpdGFsV2F0Y2guaGVpZ2h0LzIpKTtcbi8vICAgbWludXRlSGFuZENvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tcIjE0XCJdLCBob3Vyc1hQb3MsIGhvdXJzWXBvcyk7XG4vLyAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2VzW1wic2VtaWNvbG9uXCJdLCBzZW1pY29sb25YUG9zLCBzZW1pY29sb25ZUG9zKTtcbi8vICAgbWludXRlSGFuZENvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tcIjBcIl0sIG1pbnV0ZVhwb3MsIG1pbnV0ZVlwb3MpO1xuLy8gICBjdHguZHJhd0ltYWdlKGltYWdlcy51cEFycm93LGNsb2NrQnRuWHBvcyx1cEFycm93WXBvcyk7XG4vLyAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2VzLmRvd25BcnJvdyxjbG9ja0J0blhwb3MsZG93bkFycm93WXBvcyk7XG4vL1xuLy9cbi8vXG4vLyAgIG1pbnV0ZUhhbmRDYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoKSA9PiB7XG4vL1xuLy8gICAgIGlmICgoZXZlbnQuY2xpZW50WCA+PSBjbG9ja0J0blhwb3MgJiYgZXZlbnQuY2xpZW50WCA8PSAoY2xvY2tCdG5YcG9zICsgaW1hZ2VzLmNsb2NrQnRuLndpZHRoKSkpIHtcbi8vXG4vLyAgICAgICBpZihldmVudC5jbGllbnRZID49IHVwQXJyb3dZcG9zICYmIGV2ZW50LmNsaWVudFkgPD0gKHVwQXJyb3dZcG9zICsgaW1hZ2VzLnVwQXJyb3cuaGVpZ2h0KSlcbi8vICAgICAgIHtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgbWludXRlSGFuZENhbnZhcy53aWR0aCwgbWludXRlSGFuZENhbnZhcy5oZWlnaHQpO1xuLy9cbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5zYXZlKCk7XG4vLyAgICAgICAgICAgYW5nbGUgKz0gNjtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC50cmFuc2xhdGUobWludXRlaGFuZFhwb3MgKyBpbWFnZXMubWludXRlSGFuZC53aWR0aCAvIDIsIG1pbnV0ZWhhbmRZcG9zICsgaW1hZ2VzLm1pbnV0ZUhhbmQuaGVpZ2h0KTtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5yb3RhdGUoYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCkpO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnRyYW5zbGF0ZSgtKG1pbnV0ZWhhbmRYcG9zICsgaW1hZ2VzLm1pbnV0ZUhhbmQud2lkdGggLyAyKSwgLShtaW51dGVoYW5kWXBvcyArIGltYWdlcy5taW51dGVIYW5kLmhlaWdodCkpO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LmRyYXdJbWFnZShpbWFnZXMubWludXRlSGFuZCwgbWludXRlaGFuZFhwb3MsIG1pbnV0ZWhhbmRZcG9zKTtcbi8vXG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQucmVzdG9yZSgpO1xuLy9cbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5zYXZlKCk7XG4vLyAgICAgICAgICAgaG91cmhhbmRBbmdsZSArPSAwLjU7XG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQudHJhbnNsYXRlKGhvdXJIYW5kWHBvcyArIGltYWdlcy5ob3VySGFuZC53aWR0aCAvIDIsIGhvdXJIYW5kWXBvcyArIGltYWdlcy5ob3VySGFuZC5oZWlnaHQpO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnJvdGF0ZShob3VyaGFuZEFuZ2xlICogKE1hdGguUEkgLyAxODApKTtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC50cmFuc2xhdGUoLShob3VySGFuZFhwb3MgKyBpbWFnZXMuaG91ckhhbmQud2lkdGggLyAyKSwgLShob3VySGFuZFlwb3MgKyBpbWFnZXMuaG91ckhhbmQuaGVpZ2h0KSk7XG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQuZHJhd0ltYWdlKGltYWdlcy5ob3VySGFuZCwgaG91ckhhbmRYcG9zLCBob3VySGFuZFlwb3MpO1xuLy9cbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5yZXN0b3JlKCk7XG4vL1xuLy8gICAgICAgICAgIG1pbnV0ZXMrKztcbi8vICAgICAgICAgICBpZiAobWludXRlcyAlIDYwID09IDApIHtcbi8vICAgICAgICAgICAgIGhvdXJzKys7XG4vLyAgICAgICAgICAgICBtaW51dGVzID0gMDtcbi8vICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgIGhvdXJzID0gKGhvdXJzID4gMTIpID8gaG91cnMgLSAxMiA6IGhvdXJzO1xuLy9cbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW01hdGguYWJzKGhvdXJzKS50b1N0cmluZygpXSwgaG91cnNYUG9zLCBob3Vyc1lwb3MpO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LmRyYXdJbWFnZShpbWFnZXNbTWF0aC5hYnMobWludXRlcykudG9TdHJpbmcoKV0sIG1pbnV0ZVhwb3MsIG1pbnV0ZVlwb3MpO1xuLy8gICAgICAgfVxuLy8gICAgICAgZWxzZSBpZihldmVudC5jbGllbnRZID49IGRvd25BcnJvd1lwb3MgJiYgZXZlbnQuY2xpZW50WSA8PSAoZG93bkFycm93WXBvcyArIGltYWdlcy5kb3duQXJyb3cuaGVpZ2h0KSlcbi8vICAgICAgIHtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgbWludXRlSGFuZENhbnZhcy53aWR0aCwgbWludXRlSGFuZENhbnZhcy5oZWlnaHQpO1xuLy9cbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5zYXZlKCk7XG4vLyAgICAgICAgICAgYW5nbGUgLT0gNjtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC50cmFuc2xhdGUobWludXRlaGFuZFhwb3MgKyBpbWFnZXMubWludXRlSGFuZC53aWR0aCAvIDIsIG1pbnV0ZWhhbmRZcG9zICsgaW1hZ2VzLm1pbnV0ZUhhbmQuaGVpZ2h0KTtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5yb3RhdGUoYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCkpO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnRyYW5zbGF0ZSgtKG1pbnV0ZWhhbmRYcG9zICsgaW1hZ2VzLm1pbnV0ZUhhbmQud2lkdGggLyAyKSwgLShtaW51dGVoYW5kWXBvcyArIGltYWdlcy5taW51dGVIYW5kLmhlaWdodCkpO1xuLy9cbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLm1pbnV0ZUhhbmQsIG1pbnV0ZWhhbmRYcG9zLCBtaW51dGVoYW5kWXBvcyk7XG4vL1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnJlc3RvcmUoKTtcbi8vXG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQuc2F2ZSgpO1xuLy8gICAgICAgICAgIGhvdXJoYW5kQW5nbGUgLT0gMC41O1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnRyYW5zbGF0ZShob3VySGFuZFhwb3MgKyBpbWFnZXMuaG91ckhhbmQud2lkdGggLyAyLCBob3VySGFuZFlwb3MgKyBpbWFnZXMuaG91ckhhbmQuaGVpZ2h0KTtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5yb3RhdGUoaG91cmhhbmRBbmdsZSAqIChNYXRoLlBJIC8gMTgwKSk7XG4vL1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnRyYW5zbGF0ZSgtKGhvdXJIYW5kWHBvcyArIGltYWdlcy5ob3VySGFuZC53aWR0aCAvIDIpLCAtKGhvdXJIYW5kWXBvcyArIGltYWdlcy5ob3VySGFuZC5oZWlnaHQpKTtcbi8vICAgICAgICAgICBtaW51dGVIYW5kQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzLmhvdXJIYW5kLCBob3VySGFuZFhwb3MsIGhvdXJIYW5kWXBvcyk7XG4vL1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LnJlc3RvcmUoKTtcbi8vXG4vLyAgICAgICAgICAgbWludXRlcy0tO1xuLy8gICAgICAgICAgIGlmIChtaW51dGVzIDwgMCkge1xuLy8gICAgICAgICAgICAgaG91cnMtLTtcbi8vICAgICAgICAgICAgIG1pbnV0ZXMgPSA1OTtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgaG91cnMgPSAoaG91cnMgPD0gMCkgPyAxMiA6IGhvdXJzO1xuLy8gICAgICAgICAgIG1pbnV0ZUhhbmRDb250ZXh0LmRyYXdJbWFnZShpbWFnZXNbTWF0aC5hYnMoaG91cnMpLnRvU3RyaW5nKCldLCBob3Vyc1hQb3MsIGhvdXJzWXBvcyk7XG4vLyAgICAgICAgICAgbWludXRlSGFuZENvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tNYXRoLmFicyhtaW51dGVzKS50b1N0cmluZygpXSwgbWludXRlWHBvcywgbWludXRlWXBvcyk7XG4vLyAgICAgICB9XG4vLyAgICAgfVxuLy8gICB9KTtcbi8vXG4vLyB9KTtcbiJdfQ==
