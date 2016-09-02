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
const degPerHour = 30;

var minuteHandxPos,minuteHandyPos,hourHandxPos,hourHandyPos;
var inleftQuadrant = false;
var inrightQuadrant = false;

var mousePositionX = 0;
var mousePositionY = 0;
var hourHandAngle = 0;
var angle = 0;
var movingAngle = 0;
var minutes = 0;
var hours = 12;

var reqFrame;
var hourcount = 0;

const images = {
  background: new CustomImage("./assets/static/background.jpg"),
  wristWatch: new CustomImage("./assets/static/clockresized.png"),
  minuteHand: new CustomImage("./assets/dynamic/hands/minutehandresized.png"),
  hourHand: new CustomImage("./assets/dynamic/hands/hourhandresized.png"),
  digitalWatch: new CustomImage("./assets/static/digital_times_resized.png")
};

var imageloadObserver;

//Check that all images have loaded
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

/**
 * Sets all the parameters. The background is static and starts from the origin.
 * The analogue clock is placed 1/4 of the screen from the left. All the other objects are relative to the
 * analogue clock. 
 */
function setParameters() {

  images.background.xPos = 0;
  images.background.yPos = 0;
  images.wristWatch.xPos = backgroundCanvas.width / 4 - images.wristWatch.width;
  images.wristWatch.yPos = backgroundCanvas.height / 4;
  images.minuteHand.xPos = images.wristWatch.midpointX - images.minuteHand.width / 2;
  images.minuteHand.yPos = (dynamicCanvas.height / 4) + (images.wristWatch.height / 2) - images.minuteHand.height;
  images.hourHand.xPos = images.wristWatch.xPos + images.wristWatch.width / 2 - images.hourHand.width / 2;
  images.hourHand.yPos = (images.wristWatch.yPos + images.wristWatch.height / 2) - images.hourHand.height;
  images.digitalWatch.xPos = (backgroundCanvas.width * 3) / 4 - images.digitalWatch.width;
  images.digitalWatch.yPos = (images.wristWatch.height / 2 + backgroundCanvas.height / 4) - (images.digitalWatch.height / 2);
  images.minuteHand.updatedXpos = images.minuteHand.xPos;
  images.minuteHand.updatedYpos = images.minuteHand.yPos;
  hourHandxPos = images.digitalWatch.xPos + (images.digitalWatch.width) / 8;
  hourHandyPos = images.digitalWatch.yPos + images.digitalWatch.height / 2;
  images.hourHand.updatedXpos = images.hourHand.xPos;
  images.hourHand.updatedYpos = images.hourHand.yPos;
  minuteHandxPos = hourHandxPos + (images.digitalWatch.width * 3) / 8;
  minuteHandyPos = hourHandyPos;
  draw();
  setListeners();

}

//Draw the images at the set positions
function draw()
{
  backgroundContext.drawImage(images.background.image, images.background.xPos, images.background.yPos);
  backgroundContext.drawImage(images.wristWatch.image, images.wristWatch.xPos, images.wristWatch.yPos);
  backgroundContext.drawImage(images.digitalWatch.image, images.digitalWatch.xPos, images.digitalWatch.yPos);
  dynamicContext.drawImage(images.minuteHand.image, images.minuteHand.xPos, images.minuteHand.yPos);
  dynamicContext.drawImage(images.hourHand.image, images.minuteHand.xPos, images.hourHand.yPos);
  dynamicContext.font = '50pt verdana, sans-serif';
  dynamicContext.fillStyle = "#FFFFFF";
  backgroundContext.font = dynamicContext.font;
  backgroundContext.fillStyle = dynamicContext.fillStyle;
  dynamicContext.fillText("12", hourHandxPos, hourHandyPos);
  backgroundContext.fillText(":", hourHandxPos + (2 * images.digitalWatch.width) / 8, hourHandyPos - 5);
  dynamicContext.fillText("00", minuteHandxPos, minuteHandyPos);
}

function setListeners() {
  /*
    * When mouse is pressed. Check if the mouse is in the bounding box of either the hourhand or the minutehand
    * and call the respective function.
    */
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

  //Stop the animation of the minute or hour hand.
    dynamicCanvas.addEventListener("mouseup", () => {
      window.cancelAnimationFrame(reqFrame);
      dynamicCanvas.onmousemove = null;

  });

}


//Makes the minutehand point to the cursor 
function minuteHand() {
  var dx = mousePositionX - (images.minuteHand.xPos + images.minuteHand.width / 2);
  var dy = mousePositionY - (images.minuteHand.yPos + images.minuteHand.height);
  angle = Math.atan2(dy, dx) + 1.5708;
  var degrees = Math.floor(angle * 57.2958);
  degrees = (degrees < 0) ? 360 + degrees : degrees;

/**
 * Draw a vertical and horizontal line on the clock. If the minute hand is in the bottom 2 quadrants
 * then ignore it. If the minute hand is in the top left quadrant then in the right quadrant then add 1 to
 * the hours other wise subtract one.
 */


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


  hourHandAngle = ((hourcount * degPerHour) + Math.floor((degrees / minuteHandDegree) * hourHandDegree)) * (Math.PI / 180);
  minutes = Math.floor(degrees/6);
  correctHour();
  dynamicContext.clearRect(0, 0, dynamicCanvas.width, dynamicCanvas.height);
  rotateImage(angle, images.minuteHand.xPos + images.minuteHand.width / 2, images.minuteHand.yPos + images.minuteHand.height, images.minuteHand);
  rotateImage(hourHandAngle, images.hourHand.xPos + images.hourHand.width / 2, images.hourHand.yPos + images.hourHand.height, images.hourHand);
  dynamicContext.fillText(padInput(hours), hourHandxPos, hourHandyPos);
  dynamicContext.fillText(padInput(minutes), minuteHandxPos, minuteHandyPos);
}

//Makes the hour hand point to the cursor
function hourhand() {
  var dx = mousePositionX - (images.hourHand.xPos + images.hourHand.width / 2);
  var dy = mousePositionY - (images.hourHand.yPos + images.hourHand.height);

  angle = Math.atan2(dy, dx) + 1.5708;
  var degrees = Math.round((angle * 57.2958) * 10)/10;
  degrees = (degrees < 0) ? (360 + degrees) : degrees;
  var minutehandmovement = (degrees/0.5 * 6) * (Math.PI/180);

  minutes = Math.floor((degrees/0.5) % 60);
  hours = Math.floor((degrees/30));
  correctHour();

  dynamicContext.clearRect(0, 0, dynamicCanvas.width, dynamicCanvas.height);
  rotateImage(minutehandmovement, images.minuteHand.xPos + images.minuteHand.width / 2, images.minuteHand.yPos + images.minuteHand.height, images.minuteHand);
  rotateImage(angle, images.hourHand.xPos + images.hourHand.width / 2, images.hourHand.yPos + images.hourHand.height, images.hourHand);
  dynamicContext.fillText(padInput(hours), hourHandxPos, hourHandyPos);
  dynamicContext.fillText(padInput(minutes), minuteHandxPos, minuteHandyPos);
}

//Reset the hours such that it is always between 1 and 12 inclusive
function correctHour()
{
  hours = hours % 12;
  if(hours == 0)
  {
    hours = 12;
  }
  if(hours < 0)
  {
    hours += 12;
  }
}

//Add a 0 in front if the number has only one digit
function padInput(number) {
  return number < 10 ? ("0" + number) : number.toString();
}

//Perform the rotation of the canvas and draws the image on the rotated angle.
function rotateImage(angle, translateXpos, translateYpos, imageObj) {
  dynamicContext.save();
  dynamicContext.translate(translateXpos, translateYpos);
  dynamicContext.rotate(angle);
  dynamicContext.translate(-(translateXpos), - (translateYpos));
  dynamicContext.drawImage(imageObj.image, imageObj.xPos, imageObj.yPos);
  dynamicContext.restore();

}

imageloadObserver = window.setInterval(checkIfloaded, 400);