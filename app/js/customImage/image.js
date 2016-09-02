export class CustomImage{

  constructor(filepath)
  {
    this._image = new Image();
    this._image.onload = () =>
    {
      this._loaded = true;
    };
    this._image.src = filepath;
  }

  set xPos(xPos)
 {
   this._xpos = xPos;
 }

  set yPos(yPos)
 {
   this._ypos = yPos;
 }

  get xPos()
 {
   return this._xpos;
 }
  get yPos()
 {
   return this._ypos;
 }

 get image()
 {
   return this._image;
 }

 get didload()
 {
   return this._loaded;
 }

 get width()
 {
   return this._image.width;
 }

 get height()
 {
   return this._image.height;
 }

 get updatedXpos()
 {
   return this._updatedXpos;
 }

 get updatedYpos()
 {
   return this._updatedYpos;
 }

 set updatedXpos(xpos)
 {
   this._updatedXpos = xpos;
 }

 set updatedYpos(ypos)
 {
   this._updatedYpos = ypos;
 }


 get midpointX()
 {
   return this._image.width/2 + this.xPos;
 }

 get bottomPart()
 {
   return this._image.height + this.yPos;
 }

  inBoundingBox(x,y)
 {
   return ((x >= this.updatedXpos && x <= this.updatedXpos+ this.width) && (y >= this.updatedYpos && y <= this.updatedYpos + this.height));
 }
}
