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
var midpoint;
var inleftQuadrant = false;
var inrightQuadrant = false;

var mousePositionX = 0;
var prevmousePositionX = -1;
var mousePositionY = 0;

var minuteHandAngle = 0;
var hourHandAngle = 0;
var angle = 0;
var movingAngle = 0;

var minutes = 0;
var prevDegrees = -1;
var prevMinutes = -1;
var hours = 12;
var someAngle = 0;

var reqFrame;
var hourcount = 0;

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

  dynamicCanvas.addEventListener("click", () => {
    console.log("mouse click x is: " + event.clientX);
    console.log("mouse click y is: " + event.clientY);
    // console.log("x pos of minutehand is :" + (images.minuteHand.xPos));
    // console.log("y pos of minutehand is: " + (images.minuteHand.yPos + images.minuteHand.height));
  });

  dynamicCanvas.addEventListener("mousedown", () => {

    if(images.hourHand.inBoundingBox(event.clientX,event.clientY))
    {
      dynamicCanvas.onmousemove = () =>
      {
        mousePositionX = event.clientX;
        mousePositionY = event.clientY;

        reqFrame = window.requestAnimationFrame(hourhand);
      }
    }

    else if(images.minuteHand.inBoundingBox(event.clientX,event.clientY))
    {
       dynamicCanvas.onmousemove = () =>
      {
        mousePositionX = event.clientX;
        mousePositionY = event.clientY;

        reqFrame = window.requestAnimationFrame(minuteHand);
      }
    }
  });

    dynamicCanvas.addEventListener("mouseup", () => {
      window.cancelAnimationFrame(reqFrame);
      dynamicCanvas.onmousemove = null;

  });

}

function rotateImage(angle, translateXpos, translateYpos, imageObj) {
  dynamicContext.save();
  dynamicContext.translate(translateXpos, translateYpos);
  dynamicContext.rotate(angle);
  dynamicContext.translate(-(translateXpos), - (translateYpos));
  dynamicContext.drawImage(imageObj.image, imageObj.xPos, imageObj.yPos);
  dynamicContext.restore();
  console.log("image new xpos is :" + ((imageObj.xPos + imageObj.width/2)  * -Math.cos(angle) - (imageObj.yPos + imageObj.height)  * -Math.sin(angle)));
  console.log("image new ypos is :" + (imageObj.yPos + imageObj.height * Math.sin(angle)));
}

function minuteHand() {
  var dx = mousePositionX - (images.minuteHand.xPos + images.minuteHand.width / 2);
  var dy = mousePositionY - (images.minuteHand.yPos + images.minuteHand.height);
  angle = Math.atan2(dy, dx) + 1.5708;
  var degrees = Math.floor(angle * 57.2958);
  degrees = (degrees < 0) ? 360 + degrees : degrees;

  if (degrees <= 90 || degrees >= 270) {
    if (degrees >= 270 && degrees < 360) {
      inleftQuadrant = true;
      if (inrightQuadrant) {
        hourcount--;
        inrightQuadrant = false;
        minutes = 59;
      }
    }

    if (degrees >= 0 && degrees <= 90) {
      inrightQuadrant = true;
      if (inleftQuadrant) {

        hourcount++;
        inleftQuadrant = false;
      }
    }
  }
  else {
    inrightQuadrant = false;
    inleftQuadrant = false;
  }
  hours = hourcount;

  hourHandAngle = ((hourcount * 30) + Math.floor((degrees / 6) * 0.5)) * (Math.PI / 180);

  //Update hour hand because a minute has passed. A minute is 6 degrees.
  if (degrees % 6 == 0) {
    var minutesPassed = minutes;
    minutes = degrees / 6;
  }

  dynamicContext.clearRect(0, 0, dynamicCanvas.width, dynamicCanvas.height);
  rotateImage(angle, images.minuteHand.xPos + images.minuteHand.width / 2, images.minuteHand.yPos + images.minuteHand.height, images.minuteHand);
  rotateImage(hourHandAngle, images.hourHand.xPos + images.hourHand.width / 2, images.hourHand.yPos + images.hourHand.height, images.hourHand);

  hours = hours % 12;

  if (hours == 0) {
    hours = 12;
  }
  dynamicContext.fillText(padInput(hours), hourHandxPos, hourHandyPos);
  dynamicContext.fillText(padInput(minutes), minuteHandxPos, minuteHandyPos);
}

function hourhand() {
  var dx = mousePositionX - (images.hourHand.xPos + images.hourHand.width / 2);
  var dy = mousePositionY - (images.hourHand.yPos + images.hourHand.height);

  angle = Math.atan2(dy, dx) + 1.5708;
  console.log("angle is : " + angle);
  var degrees = Math.round((angle * 57.2958) * 10)/10;
  degrees = (degrees < 0) ? (360 + degrees) : degrees;
  var minutehandmovement = (degrees/0.5 * 6) * (Math.PI/180);

  minutes = Math.floor((degrees/0.5) % 60);
  hours = Math.floor((degrees/30));
  correctHour();
  console.log("hours : " + hours);

  dynamicContext.clearRect(0, 0, dynamicCanvas.width, dynamicCanvas.height);
  rotateImage(minutehandmovement, images.minuteHand.xPos + images.minuteHand.width / 2, images.minuteHand.yPos + images.minuteHand.height, images.minuteHand);
  rotateImage(angle, images.hourHand.xPos + images.hourHand.width / 2, images.hourHand.yPos + images.hourHand.height, images.hourHand);
  dynamicContext.fillText(padInput(hours), hourHandxPos, hourHandyPos);
  dynamicContext.fillText(padInput(minutes), minuteHandxPos, minuteHandyPos);
}

function correctHour()
{
  hours = hours % 12;
  if(hours == 0)
  {
    hours = 12;
  }
}

function padInput(number) {
  return number < 10 ? ("0" + number) : number.toString();
}

imageloadObserver = window.setInterval(checkIfloaded, 400);