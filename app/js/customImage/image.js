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

  inBoundingBox(x,y)
 {

   return ((x >= this.xPos && x <= this.xPos+ this.width) && (y >= this.yPos && y <= this.yPos + this.height));
 }
}
