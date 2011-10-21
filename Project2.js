window.addEventListener("load", WindowLoaded, false);
LoadjsFile("Model/Model.js");
LoadjsFile("Model/Vector3D.js");
LoadjsFile("Helper.js");
LoadjsFile("Events.js");
LoadjsFile("Shader/GLSL_Shader.js");
LoadjsFile("Player.js");
LoadjsFile("Model/glMatrix-0.9.5.min.js");

var gl;
var Height
var Width;
var Canvas;

function LoadjsFile(i_FilePath)
{
  var FileRef = document.createElement('script')
  FileRef.setAttribute("type","text/javascript")
  FileRef.setAttribute("src", i_FilePath)
  
  if (typeof FileRef!= "undefined")
    document.getElementsByTagName("head")[0].appendChild(FileRef)
}


function InitializeWebGL()
{
  // Initialize
  Debug.Trace("Initializing WebGL...");
  
  gl = Canvas.getContext("webgl"); // Webgl

  if(!gl)
    gl = Canvas.getContext("experimental-webgl"); // Development
  if(!gl)
    gl = Canvas.getContext("moz-webgl"); // Firefox
  if(!gl)
    gl = Canvas.getContext("webkit-3d"); // Safari or Chrome
    
  gl.viewportWidth  = Canvas.width;
  gl.viewportHeight = Canvas.height;
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LESS);
  
  mvMatrix = mat4.create();
  pMatrix = mat4.create();
  
  InitializeShaders();
  InitializeBuffers();
}

function WindowLoaded()
{
  // EXECUTION START
  if(!CanvasSupported())
  {
    Debug.Trace("Canvas is not supported.");
    return;
  } 
  
  try
  {
    InitializeCanvas();
    InitializeWebGL();
  }
  catch(e)
  {
  }
  
  if(!gl)
  {
    alert("Could Not Initialize WebGL!");
  }
  
  UpdateWindowSize();
  
  // Load the models
  Debug.Trace("Start");
  InitializeModels();
 
  // Set initial time
  var CurDate = new Date();
  PrevTime = CurDate.getTime();

  // Start the gameloop
  GameLoop();
  
  checkGLError();
}

function UpdateWindowSize()
{
  var WindowSize = GetWindowSize();
  Debug.Trace("Window Resized ("+ WindowSize.X +", "+ WindowSize.Y +")");
  if(WindowSize.X != 0 && WindowSize.Y != 0)
  {
    Canvas.width = WindowSize.X;
    
    // It the window is too short then limit the canvas
    //if(WindowSize.Y < 700)
      Canvas.height = WindowSize.Y;
    //else
    //  Canvas.height = 700;

    Width  = Canvas.width;
    Height = Canvas.height;
    
    gl.viewportWidth  = Canvas.width;
    gl.viewportHeight = Canvas.height;
  }
}


function InitializeCanvas()
{
    // Attach event listeners
    window.addEventListener('resize', WindowResized, false);
    document.addEventListener('keydown', KeyDown, false);
    document.addEventListener('keyup', KeyUp, false);
    
    Canvas = document.getElementById("CanvasOne");
    Canvas.addEventListener('mousedown', MouseDown, false);
    Canvas.addEventListener('mouseup', MouseUp, false);
    Canvas.addEventListener('mousemove', MouseMove, false);
    Canvas.addEventListener('mouseout', MouseOut, false);
    Canvas.addEventListener('click', MouseClick, false);
	Canvas.addEventListener('DOMMouseScroll', MouseWheel, false);
  }

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


function CanvasSupported()
{
  return !document.createElement('TestCanvas').getContext;
}

var Timer;
var PrevTime;
var DEBUG = false;

var TestModel;

function GameLoop()
{
  //Timer = setTimeout("GameLoop()", 1/30 * 1000);
  var CurDate = new Date();
  var CurTime = CurDate.getTime();
  var DeltaMiliSec = CurTime - PrevTime;
  PrevTime = CurTime;
  
  //Update(DeltaMiliSec);
  animate();
  Draw();
  
  if(DEBUG)
  {
    Context.fillStyle = "#FFFFFF";
    var FPS = "FPS = " + Math.round(1000/DeltaMiliSec);
    Context.fillText(FPS, 20, 20);
    Context.fillText("DESIRED POS.X = " + Math.round(DesiredPosition), 20, 40);
    Context.fillText("CURRENT POS.X = " + Math.round(CurrentPosition), 20, 60); 
  }
  
  Timer = setTimeout("GameLoop()", 1/30 * 1000);

}
 
var ClearColor = [0.0, 0.0, 0.0];
function SetClearColor_Red(i_Value)
{
  Debug.Trace("Set Clear Color Red");
  if(!isNaN(i_Value))
  {
    // Limit the value to 0.0 to 1.0
    if(i_Value > 1.0)  
      ClearColor[0] = 1.0;
    else if(i_Value < 0.0)
      ClearColor[0] = 0.0;
    else 
      ClearColor[0] = i_Value;
      
    gl.clearColor(ClearColor[0], ClearColor[1], ClearColor[2], 1.0);
  }
}
 
function SetClearColor_Blue(i_Value)
{
  Debug.Trace("Set Clear Color Blue");
  if(!isNaN(i_Value))
  {
    // Limit the value to 0.0 to 1.0
    if(i_Value > 1.0)  
      ClearColor[1] = 1.0;
    else if(i_Value < 0.0)
      ClearColor[1] = 0.0;
    else 
      ClearColor[1] = i_Value;
      
    gl.clearColor(ClearColor[0], ClearColor[1], ClearColor[2], 1.0);
  }
}

function SetClearColor_Green(i_Value)
{
  Debug.Trace("Set Clear Color Green");
  if(!isNaN(i_Value))
  {
    // Limit the value to 0.0 to 1.0
    if(i_Value > 1.0)  
      ClearColor[2] = 1.0;
    else if(i_Value < 0.0)
      ClearColor[2] = 0.0;
    else 
      ClearColor[2] = i_Value;
      
    gl.clearColor(ClearColor[0], ClearColor[1], ClearColor[2], 1.0);
  }
}
 
var Models = new Array();
function InitializeModels() 
{
    Models.push(new Model("Brick_Block"));
    Models.push(new Model("Test"));
    Models.push(new Model("TestCube"));
    Models.push(new Model("Title"));
    Models.push(new Model("Sword"));
    Models.push(new Model("Human"));
    TestModel = Models[0];
}

function SelectModel(i_ModelName)
{
	Debug.Trace("Select Model " + i_ModelName);
	for(var i = 0; i < Models.length; i++)
	{
		if(Models[i].Name == i_ModelName)
		{
			TestModel = Models[i];
			return;
		}
	}
}


var Shaders = new Array();
function InitializeShaders() 
{
    Shaders.push(LoadShader("PerFragmentLighting"));
    Shaders.push(LoadShader("PerVertexLighting"));
    Shaders.push(LoadShader("TimeTest"));
    CurrentShader = Shaders[0];
}


function SelectShader(i_ShaderName)
{
	Debug.Trace("Select Shader " + i_ShaderName);
	for(var i = 0; i < Shaders.length; i++)
	{
		if(Shaders[i].Name == i_ShaderName)
		{
			CurrentShader = Shaders[i];
			return;
		}
	}
}

var mvMatrix;
var pMatrix;
var mvMatrixStack = [];

function setMatrixUniforms() 
{
    gl.uniformMatrix4fv(CurrentShader.Program.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(CurrentShader.Program.mvMatrixUniform, false, mvMatrix);
    
    var normalMatrix = mat3.create();
    mat4.toInverseMat3(mvMatrix, normalMatrix);
    mat3.transpose(normalMatrix);
    gl.uniformMatrix3fv(CurrentShader.Program.nMatrixUniform, false, normalMatrix);
}

function mvPushMatrix() 
{
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}

function mvPopMatrix() 
{
    if (mvMatrixStack.length == 0) 
        throw "Invalid popMatrix!";
    mvMatrix = mvMatrixStack.pop();
}
    
var rPyramid = 0;
var rCube = 0;
var lastTime = 0;
var Time = 0;
function animate() 
{
    var timeNow = new Date().getTime();
    if (lastTime != 0) 
    {
        var elapsed = timeNow - lastTime;
        Time += elapsed / 1000.0;
        //rPyramid += (90 * elapsed) / 1000.0;
        //rCube -= (40 * elapsed) / 1000.0;
    }
    lastTime = timeNow;
}

var Light0_Enabled = true;
var Camera_LookAt = [0,0,0];
var Camera_Position = [
          0.0,
          0.0,
          50.0
      ];
var Up = [0,1,0];
function Draw() 
{
	gl.useProgram(CurrentShader.Program);

	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.uniform1f(CurrentShader.Program.Time_Uniform, Time);

	gl.uniform1i(CurrentShader.Program.Light0_Enabled_Uniform, Light0_Enabled);
  if (Light0_Enabled) 
  {
      gl.uniform3f(
          CurrentShader.Program.AmbientColor_Uniform,
          0.1,
          0.1,
          0.1
      );

      
      gl.uniform3fv(CurrentShader.Program.Light0_Position_Uniform, Camera_Position);

      gl.uniform3f(
          CurrentShader.Program.DiffuseColor_Uniform,
          0.8,
          0.8,
          0.8
      );
      
      gl.uniform3f(
          CurrentShader.Program.SpecularColor_Uniform,
          0.8,
          0.8,
          0.8
      );
      
      gl.uniform1f(
          CurrentShader.Program.Shininess_Uniform,
          30.0      
      );


  }
	
	
	mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 1.0, 1000.0, pMatrix);
	
	//mat4.identity(mvMatrix);
	
	// Setup the camera
	$("#CameraPos_X").val(Camera_Position[0]);
	$("#CameraPos_Y").val(Camera_Position[1]);
	$("#CameraPos_Z").val(Camera_Position[2]);
	gl.uniform3fv(CurrentShader.Program.Camera_Position_Uniform, Camera_Position);
	//mat4.translate(mvMatrix, [-Camera_Position[0], -Camera_Position[1], -Camera_Position[2]]);
	mat4.lookAt(Camera_Position, Camera_LookAt, Up, mvMatrix);
	
	mvPushMatrix();
	mat4.rotate(mvMatrix, degToRad(rCube), [1, 1, 1]);
	TestModel.Draw();
	mvPopMatrix();
}
