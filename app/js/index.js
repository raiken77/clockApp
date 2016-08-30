import {CustomImage} from "./customImage/image.js"

const backgroundCanvas = document.getElementById('background');
const dynamicCanvas = document.getElementById('dynamic');
const dynamicContext = dynamicCanvas.getContext('2d');
const backgroundContext = backgroundCanvas.getContext('2d');


backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;

dynamicCanvas.width = window.innerWidth;
dynamicCanvas.height = window.innerHeight;

const minuteHandDegree = 6;
const hourHandDegree = 0.5;

var minuteHandxPos;
var minuteHandyPos;
var hourHandxPos;
var hourHandyPos;

var minuteHandAngle = 0;
var hourHandAngle = 0;

var minutes = 0;
var hours = 12;

const images = {
  background: new CustomImage("./assets/static/background.jpg"),
  wristWatch: new CustomImage("./assets/static/clockresized.png"),
  minuteHand: new CustomImage("./assets/dynamic/hands/minutehandresized.png"),
  hourHand: new CustomImage("./assets/dynamic/hands/hourhandresized.png"),
  clockBtn: new CustomImage("./assets/static/clockbtnresized.png"),
  upArrow: new CustomImage("./assets/static/upArrow.png"),
  downArrow: new CustomImage("./assets/static/downArrow.png"),
  digitalWatch: new CustomImage("./assets/static/digital_times_resized.png")
};

var imageloadObserver;


function checkIfloaded() {
  let imagesLoaded = 0;
  let numImages = 0;

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
    images[i.toString()] = new CustomImage("./assets/dynamic/numbers/" + i + ".png");
  }
}

function setParameters() {

  images.background.xPos = 0;
  images.background.yPos = 0;
  images.wristWatch.xPos = backgroundCanvas.width / 4 - images.wristWatch.width;
  images.wristWatch.yPos = backgroundCanvas.height / 4;
  images.minuteHand.xPos = images.wristWatch.xPos + images.wristWatch.width / 2 - images.minuteHand.width / 2;
  images.minuteHand.yPos = (dynamicCanvas.height / 4) + (images.wristWatch.height / 2) - images.minuteHand.height;
  images.hourHand.xPos = images.wristWatch.xPos + images.wristWatch.width / 2 - images.hourHand.width / 2;
  images.hourHand.yPos = (images.wristWatch.yPos + images.wristWatch.height / 2) - images.hourHand.height;
  images.clockBtn.xPos = images.wristWatch.xPos + images.wristWatch.width;
  images.clockBtn.yPos = (images.wristWatch.height / 2 + images.wristWatch.yPos) - (images.clockBtn.height / 2);
  images.digitalWatch.xPos = (backgroundCanvas.width * 3) / 4 - images.digitalWatch.width;
  images.digitalWatch.yPos = (images.wristWatch.height / 2 + backgroundCanvas.height / 4) - (images.digitalWatch.height / 2);
  images.upArrow.xPos = images.clockBtn.xPos;
  images.upArrow.yPos = images.clockBtn.yPos - images.upArrow.height;
  images.downArrow.xPos = images.clockBtn.xPos;
  images.downArrow.yPos = images.clockBtn.yPos + images.clockBtn.height;

  hourHandxPos = images.digitalWatch.xPos + (images.digitalWatch.width) / 8;
  hourHandyPos = images.digitalWatch.yPos + images.digitalWatch.height / 2;
  minuteHandxPos = hourHandxPos + (images.digitalWatch.width * 3) / 8;
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
  backgroundContext.fillText(":", hourHandxPos + (2 * images.digitalWatch.width) / 8, hourHandyPos - 5);
  dynamicContext.fillText("00", minuteHandxPos, minuteHandyPos);
  setListeners();

}

function setListeners() {
  dynamicCanvas.addEventListener("mousemove", () => {

    // if (images.minuteHand.inBoundingBox(event.clientX, event.clientY)) {


      // dynamicCanvas.onmousemove = () => {
        console.log("xpos is :" + event.clientX);
        console.log("x mid point of minutehand is: " +(images.minuteHand.xPos + images.minuteHand.width/2) );
        var dx = event.clientX - (images.minuteHand.xPos );
        var dy = event.clientY - (images.minuteHand.yPos);
        var degrees = Math.atan2(dy,dx);
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
  dynamicContext.translate(-(translateXpos), - (translateYpos));
  dynamicContext.drawImage(imageObj.image, imageObj.xPos, imageObj.yPos);
  dynamicContext.restore();

}









// addDigitalWatchNumbers();
imageloadObserver = window.setInterval(checkIfloaded, 400)



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
