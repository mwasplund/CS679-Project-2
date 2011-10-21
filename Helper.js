 function getMousePosition(e) 
  {
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) 
    {
      x = e.pageX;
      y = e.pageY;
    }
    else 
    {
      x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    
    // Make the position in canvas space
    x -= Canvas.offsetLeft;
    y -= Canvas.offsetTop;
    
    return new Point(x, y);
  }
  
function GetWindowSize()
{
  var Size = new Point(0,0);
  if (window.innerWidth && window.innerHeight) 
  {
    Size.X = window.innerWidth;
    Size.Y = window.innerHeight;
  }
  else if (document.body && document.body.offsetWidth) 
  {
    Size.X = document.body.offsetWidth;
    Size.Y = document.body.offsetHeight;
  }
  else if (document.compatMode=='CSS1Compat' &&
      document.documentElement &&
      document.documentElement.offsetWidth ) 
  {
    Size.X = document.documentElement.offsetWidth;
    Size.Y = document.documentElement.offsetHeight;
  }
  
  return Size;
}


function Point(i_X, i_Y) 
{
    this.X = i_X;
    this.Y = i_Y;
}

function Color(i_R, i_B, i_G, i_A)
{
  // Set the Red
  if(i_R < 0)
    this.R = 0;
  else if(i_R > 1)
    this.R = 1;
  else
    this.R = i_R;
    
  // Set the Blue
  if(i_B < 0)
    this.B = 0;
  else if(i_B > 1)
    this.B = 1;
  else
    this.B = i_B;

  // Set the Green
  if(i_G < 0)
    this.G = 0;
  else if(i_G > 1)
    this.G = 1;
  else
    this.G = i_G;

  // Set the Alpha
  if(i_A < 0)
    this.A = 0;
  else if(i_A > 1)
    this.A = 1;
  else
    this.A = i_A;
  
  this.GetHexString = Color_GetHexString;
  this.GetRBGA = Color_GetRBGA;
}

function Color_GetHexString()
{
  var String_R = parseInt(this.R * 255, 10).toString(16);
  var String_B = parseInt(this.B * 255, 10).toString(16);
  var String_G = parseInt(this.G * 255, 10).toString(16);
  
  if(String_R.length == 1)
     String_R = "0" + String_R;
  if(String_B.length == 1)
     String_B = "0" + String_B;
  if(String_G.length == 1)
     String_G = "0" + String_G;
 
  return "#" + String_R + String_B + String_G;
}

function Color_GetRBGA()
{
  var String_R = parseInt(this.R * 255, 10).toString(16);
  var String_B = parseInt(this.B * 255, 10).toString(16);
  var String_G = parseInt(this.G * 255, 10).toString(16);
  
  if(String_R.length == 1)
     String_R = "0" + String_R;
  if(String_B.length == 1)
     String_B = "0" + String_B;
  if(String_G.length == 1)
     String_G = "0" + String_G;
 
  return "rgba(" + String_R + ", " + String_B + ", " + String_G + ", " + this.A + ")";
}

function degToRad(degrees) 
{
        return degrees * Math.PI / 180;
 }

function checkGLError() 
{
    var error = gl.getError();
    if (error != gl.NO_ERROR && error != gl.CONTEXT_LOST_WEBGL)
    {
        var str = "GL Error: " + error;
        Debug.Trace(str);
    }
}
