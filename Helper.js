/******************************************************/
/* Helper.js
/*
/* Helper Functions that make using javascript easier
/******************************************************/

/******************************************************/
/* Debug.Trace
/*
/* Helpful little global variable that makes printing 
/* to the console easy.
/******************************************************/
var Debug = function() {};
Debug.Trace = function(i_Message)
{
  try
  {
    console.log(i_Message);
  }
  catch(e)
  {
    return;
  }
}

/******************************************************/
/* CanvasSupported
/*
/* This function checks if the html canvas elent is 
/* supported.
/******************************************************/
function CanvasSupported()
{
  return !document.createElement('TestCanvas').getContext;
}

/******************************************************/
/* LoadjsFile
/*
/* Load a seperate Javascript file to be used on the 
/* current page.
/*
/* i_FilePath - the location of the file to be loaded
/******************************************************/
function LoadjsFile(i_FilePath)
{
  var FileRef = document.createElement('script')
  FileRef.setAttribute("type","text/javascript")
  FileRef.setAttribute("src", i_FilePath)
  
  if (typeof FileRef!= "undefined")
    document.getElementsByTagName("head")[0].appendChild(FileRef)
}

/******************************************************/
/* getMousePosition
/*
/* Crossbrowser safe function that returns the current
/* location of the mouse. It also converts the mouse's 
/* absolute position in the page to a relative position
/* to the upper left corner of the canvas
/*
/* e - pass in the mouse even to be used to find mouse
/*     position
/******************************************************/
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
  
/******************************************************/
/* GetWindowSize
/*
/* Crossbrowser safe function that returns the current
/* windows size.
/******************************************************/
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

/******************************************************/
/* Point
/*
/* A simple class that holds an X,Y Position.
/******************************************************/
function Point(i_X, i_Y) 
{
    this.X = i_X;
    this.Y = i_Y;
}

/******************************************************/
/* Color
/*
/* A simple class that holds a color's Red, Blue, Green
/* and Alpha values.
/******************************************************/
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


/******************************************************/
/* Color_GetHexString
/*
/* A function attached to the Color class that converts 
/* the color to a Hexidecimal representation of the
/* color with "#RRGGBB".
/******************************************************/
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

/******************************************************/
/* Color_GetRBGA
/*
/* A function attached to the Color class that converts 
/* the color to a CSS representation of the
/* color. "rgba(RR, BB, GG, AA)"
/******************************************************/
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

/******************************************************/
/* degToRad
/*
/* A function that converts an angle from degrees to 
/* radians.
/******************************************************/
function degToRad(degrees) 
{
  return degrees * Math.PI / 180;
}

/******************************************************/
/* checkGLError
/*
/* A function that checks for an error in gl
/******************************************************/
function checkGLError() 
{
 var error = gl.getError();
 if (error != gl.NO_ERROR && error != gl.CONTEXT_LOST_WEBGL)
 {
   var str = "GL Error: " + error;
   Debug.Trace(str);
 }
}
