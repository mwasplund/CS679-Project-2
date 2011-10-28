﻿/******************************************************/
/* Attach load event and load the needed Javascript 
/* files.
/******************************************************/
window.addEventListener("load", WindowLoaded, false);
LoadjsFile("Model/Model.js");
LoadjsFile("Events.js");
LoadjsFile("Shader/GLSL_Shader.js");
LoadjsFile("Model/Level.js");
LoadjsFile("Model/Layout.js");
LoadjsFile("Player.js");
LoadjsFile("glMatrix.js");
LoadjsFile("Debug.js");
LoadjsFile("GameState.js");

/******************************************************/
/* Global Variables
/******************************************************/
var gl;
var Height
var Width;
var Canvas;
var Timer;
var PrevTime;
var DEBUG = false;
var TestModel;
var ClearColor = [0.0, 0.0, 0.0];
var Models = new Array();
var Shaders = new Array();
var mvMatrix;
var pMatrix;
var mvMatrixStack = [];
var lastTime = 0;
var Time = 0;
var Light0_Enabled = true;
var MainPlayer;
var turn = 0;
var clones = new Array();
var recordings = new Array();
var Up = [0,1,0];
var CurrentShader
var GameState;
var TestLevel;

/******************************************************/
/* InitializeWebGL
/*
/* Initialize Web GL
/******************************************************/
function InitializeWebGL()
{
  // Initialize
  Debug.Trace("Initializing WebGL...");
  
  gl = Canvas.getContext("webgl"); // Completed Webgl
  if(!gl)
    gl = Canvas.getContext("experimental-webgl"); // Development
  if(!gl)
    gl = Canvas.getContext("moz-webgl"); // Firefox
  if(!gl)got 
    gl = Canvas.getContext("webkit-3d"); // Safari or Chrome
    
  // Set the viewport to the same size as the Canvas
  gl.viewportWidth  = Canvas.width;
  gl.viewportHeight = Canvas.height;
  
  gl.clearColor(ClearColor[0], ClearColor[1], ClearColor[2] , 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LESS);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE); 

  mvMatrix = mat4.create();
  pMatrix = mat4.create();
  
  InitializeShaders();
  InitializeBuffers();
}

/******************************************************/
/* WindowLoaded
/*
/* This function is attached to the Window Loaded event
/* and is where we initialize our variables and then 
/* start the game loop
/******************************************************/
function WindowLoaded()
{
  // Check if the Canvas is supported
  GameState = GAME_STATE.LOADING;
  if(!CanvasSupported())
  {
    Debug.Trace("ERROR: Html5 Canvas is not supported.");
    return;
  } 
  
  try
  {
    InitializeCanvas();
    InitializeWebGL();
  }
  catch(e)
  {
    Debug.Trace(e);
  }
  
  if(!gl)
  {
    alert("ERROR: Could Not Initialize WebGL!");
    return;
  }
  
  // Check window size initially
  UpdateWindowSize();
  
  // Instantiate main player
  MainPlayer = new Player();
  recordings[0] = new Record();

  // Load the models
  InitializeModels();
  
  //Load levels
  InitializeLevels();
 
  // Set initial time
  var CurDate = new Date();
  PrevTime = CurDate.getTime();

  // Start the gameloop
  SetGameState_Start();
  GameLoop();
  checkGLError();
}

/******************************************************/
/* UpdateWindowSize
/*
/* This function checks the windows current size and
/* makes sure that the Canvas fills the entire window, 
/* it then makes sure that the Viewport size is the same 
/* as the Canvas.
/******************************************************/
function UpdateWindowSize()
{
  var WindowSize = GetWindowSize();
  //Debug.Trace("Window Resized ("+ WindowSize.X +", "+ WindowSize.Y +")");
  // Only update the sizes if they are larget than zero
  if(WindowSize.X != 0 && WindowSize.Y != 0)
  {
    // Update the canvas size
    Canvas.width = WindowSize.X;
    Canvas.height = WindowSize.Y;
    
    // Save the Canvas size
    Width  = Canvas.width;
    Height = Canvas.height;
    
    // Update the Vieport to match the size of the canvas
    gl.viewportWidth  = Canvas.width;
    gl.viewportHeight = Canvas.height;
  }
}

/******************************************************/
/* InitializeCanvas
/*
/* This function initializes the canvas by attaching all
/* the event listeners
/******************************************************/
function InitializeCanvas()
{
  // Attach event listeners
  window.addEventListener('resize', WindowResized, false);
  document.addEventListener('keydown', KeyDown, false);
  document.addEventListener('keyup', KeyUp, false);
  document.addEventListener('keypress', KeyPress, false);
  
  Canvas = document.getElementById("CanvasOne");
  Canvas.addEventListener('mousedown', MouseDown, false);
  Canvas.addEventListener('mouseup', MouseUp, false);
  Canvas.addEventListener('mousemove', MouseMove, false);
  Canvas.addEventListener('mouseout', MouseOut, false);
  Canvas.addEventListener('click', MouseClick, false);
  Canvas.addEventListener('DOMMouseScroll', MouseWheel, false);
}

/******************************************************/
/* GameLoop
/*
/* This function is called every Frame and then updates
/* all the game objects and then draws them. It then
/* sets a timer so the function will call itself in 
/* another 60th of a second
/******************************************************/
function GameLoop()
{
  Timer = setTimeout("GameLoop()", 1/30 * 1000);
  var CurDate = new Date();
  var CurTime = CurDate.getTime();
  var DeltaMiliSec = CurTime - PrevTime;
  PrevTime = CurTime;
  
	Update(DeltaMiliSec);
  Draw();
  
  if(DEBUG)
  {
    //Context.fillStyle = "#FFFFFF";
   // var FPS = "FPS = " + Math.round(1000/DeltaMiliSec);
    //Context.fillText(FPS, 20, 20);
   // Context.fillText("DESIRED POS.X = " + Math.round(DesiredPosition), 20, 40);
   // Context.fillText("CURRENT POS.X = " + Math.round(CurrentPosition), 20, 60); 
  }
  
  // Timer = setTimeout("GameLoop()", 1/30 * 1000);
}
 
/******************************************************/
/* InitializeModels
/*
/* This function Loads all the models that will be used 
/* during the time of the game
/******************************************************/
function InitializeModels() 
{
    Models.push(new Model("Brick_Block"));
    Models.push(new Model("Test"));
    Models.push(new Model("TestCube"));
    Models.push(new Model("Title"));
    Models.push(new Model("Sword"));
    Models.push(new Model("Human"));
	Models.push(new Model("Pole_Swirly"));
    TestModel = Models[0];
	
	
	TitleModel = GetModel("Title");
}

//Xixi, enable levels
var Levels = new Array();
function InitializeLevels() 
{
	Levels.push(new Level("0"));
    Levels.push(new Level("1"));
    Levels.push(new Level("2"));
	TestLevel = Levels[0];
}

function SelectLevel(i_LevelName)
{
	for(var k = 0; k < 2; k++)
	{
		if(Levels[k].Name == i_LevelName)
		{
			TestLevel = Levels[k];
			return;
			Debug.Trace("TestLevel "+ TestLevel);
			Debug.Trace("k" + k);
		}
	}
	//Debug.Trace("TestLevel "+ TestLevel);
	//Debug.Trace("k" + k);
}
//End of levels


/******************************************************/
/* InitializeShaders
/*
/* This function Loads all the shaders that will be used 
/* during the time of the game.
/******************************************************/
function InitializeShaders() 
{
    Shaders.push(LoadShader("PerFragmentLighting"));
    Shaders.push(LoadShader("PerVertexLighting"));
    Shaders.push(LoadShader("TimeTest"));
    Shaders.push(LoadShader("InvisoShader"));
    Shaders.push(LoadShader("whitey"));
    CurrentShader = Shaders[0];
}

/******************************************************/
/* setMatrixUniforms
/*
/* This function binds the Matrixs used by the shader 
/* programs.
/******************************************************/
function setMatrixUniforms() 
{
    gl.uniformMatrix4fv(CurrentShader.Program.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(CurrentShader.Program.mvMatrixUniform, false, mvMatrix);
    
    var normalMatrix = mat3.create();
    mat4.toInverseMat3(mvMatrix, normalMatrix);
    mat3.transpose(normalMatrix);
    gl.uniformMatrix3fv(CurrentShader.Program.nMatrixUniform, false, normalMatrix);
}

/******************************************************/
/* mvPushMatrix
/*
/* Save the current model view matrix.
/******************************************************/
function mvPushMatrix() 
{
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}

/******************************************************/
/* mvPopMatrix
/*
/* load the previously saved model view matrix.
/******************************************************/
function mvPopMatrix() 
{
    if (mvMatrixStack.length == 0) 
        throw "Invalid popMatrix!";
    mvMatrix = mvMatrixStack.pop();
}
    
/******************************************************/
/* Update
/*
/* Update movement of Player/Clones
/******************************************************/
function Update() 
{
    var timeNow = new Date().getTime();
    if (lastTime != 0) 
    {
        var elapsed = timeNow - lastTime;
        Time += elapsed / 1000.0;
	if(GameState == GAME_STATE.PLAYING)
		{
        		recordings[turn].addSlice(MainPlayer);
			UpdateClones();
			MainPlayer.Update();
		}
    }
    lastTime = timeNow;
}
function UpdateClones(){
	for(var x = 0; x < turn; x++){
		clones[x].updateStateWith(recordings[x].playNextSlice());	
		if(!clones[x].dead) clones[x].Update();
	}
}
function DrawClones(){
	for(var x = 0; x < turn; x++){
		mvPushMatrix();	
		mat4.translate(mvMatrix, [clones[x].pos[0], clones[x].pos[1], clones[x].pos[2]]);
		Models[0].Draw();	
		mvPopMatrix();
	}
}
function ResetClonePos(){
	for(var x = 0; x < turn; x++){
		clones[x].pos = vec3.create([0,0,0]);
	}
}
function EndTurn(){
	clones[turn] = new Player();
	turn++;
	ResetRecordings();
	ResetClonePos();
	recordings[turn] = new Record();
	MainPlayer = new Player();
}
function RestartTurn(){
	ResetRecordings();
	ResetClonePos();
	recordings[turn] = new Record();
	MainPlayer = new Player();
}
function ResetRecordings(){
	for(var x = 0; x < turn; x++){
		recordings[x].resetP();
	}
}


/******************************************************/
/* Draw
/*
/* Draw the world
/******************************************************/
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

      
      gl.uniform3fv(CurrentShader.Program.Light0_Position_Uniform, [0, 0, 100]);

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
	$("#CameraPos_X").val(MainPlayer.pos[0]);
	$("#CameraPos_Y").val(MainPlayer.pos[1]);
	$("#CameraPos_Z").val(MainPlayer.pos[2]);
	$("#CameraPos_Yaw").val(MainPlayer.yaw);
	$("#CameraPos_Pitch").val(MainPlayer.pitch);
	
	gl.uniform3fv(CurrentShader.Program.Camera_Position_Uniform, MainPlayer.pos);
	//mat4.translate(mvMatrix, [-Camera_Position[0], -Camera_Position[1], -Camera_Position[2]]);
	mat4.lookAt(MainPlayer.pos, MainPlayer.lookat, Up, mvMatrix);
	
	//Debug.Trace(TestLevel.Name);
	TestLevel.Draw();
	
	
	mat4.lookAt(MainPlayer.pos, MainPlayer.lookat, Up, mvMatrix);
	
	//Debug.Trace(TestLevel.Name);
	if(GameState == GAME_STATE.PLAYING || GameState == GAME_STATE.PAUSED)
	{
		TestLevel.Draw(CurrentShader.Program);
		DrawClones(CurrentShader.Program);
	}
	else if(GameState == GAME_STATE.START)
	{
		mvPushMatrix();
		mat4.translate(mvMatrix, [0,-10,100]);
		mat4.rotate(mvMatrix, degToRad(20), [0, 1, 0]);
		var TimeTest = GetShader("TimeTest");
		TitleModel.Draw(CurrentShader.Program);
		mvPopMatrix();
	}
}
