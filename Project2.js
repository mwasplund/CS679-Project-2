window.addEventListener("load", WindowLoaded, false);
LoadjsFile("Model/Model.js");
LoadjsFile("Helper.js");
LoadjsFile("Events.js");
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
  
  gl = Canvas.getContext("experimental-webgl"); // Chrome
  
  if(!gl)
    gl = theCanvas.getContext("moz-webgl"); // Firefox
  if(!gl)
    gl = theCanvas.getContext("webkit-3d"); // Safari or Chrome
    
  gl.viewportWidth  = Canvas.width;
  gl.viewportHeight = Canvas.height;
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  
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
  TestModel = new Model("Model/Box.FBX");
  
  // Set initial time
  var CurDate = new Date();
  PrevTime = CurDate.getTime();

  // Start the gameloop
  GameLoop();
}

function UpdateWindowSize()
{
  var WindowSize = GetWindowSize();
  Debug.Trace("Window Resized ("+ WindowSize.X +", "+ WindowSize.Y +")");
  if(WindowSize.X != 0 && WindowSize.Y != 0)
  {
    Canvas.width = WindowSize.X;
    
    // It the window is too short then limit the canvas
    if(WindowSize.Y < 700)
      Canvas.height = WindowSize.Y;
    else
      Canvas.height = 700;

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

var REQUEST_NOT_INITIALIZED = 0;
var SERVER_CONNECTION_ESTABLISHED = 1;
var REQUESED_RECEIVED = 2;
var PROCESSING_REQUEST = 3;
var REQUEST_FINISHED_RESPONSE_READY = 4;
var STATUS_OK = 200;
var STATUS_PAGE_NOT_FOUND = 404;

function CreateXMLHttpRequest()
{
  var XMLHttp;
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    XMLHttp = new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    XMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  return XMLHttp;
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
  

    function getShader(gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }


    var shaderProgram;

    function InitializeShaders() 
    {
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) 
            alert("Could not initialize shaders");

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    }


    var mvMatrix;
    var pMatrix;
    var mvMatrixStack = [];

    function setMatrixUniforms() 
    {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    }



    var cubeVertexPositionBuffer;
    var cubeVertexColorBuffer;
    var cubeVertexIndexBuffer;
    
    function InitializeBuffers()
    {
       cubeVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
        vertices = [
            // Front face
            -1.0, -1.0,  1.0,
             1.0, -1.0,  1.0,
             1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,

            // Back face
            -1.0, -1.0, -1.0,
            -1.0,  1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0, -1.0, -1.0,

            // Top face
            -1.0,  1.0, -1.0,
            -1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0, -1.0,

            // Bottom face
            -1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
             1.0, -1.0,  1.0,
            -1.0, -1.0,  1.0,

            // Right face
             1.0, -1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0,  1.0,  1.0,
             1.0, -1.0,  1.0,

            // Left face
            -1.0, -1.0, -1.0,
            -1.0, -1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0,  1.0, -1.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        cubeVertexPositionBuffer.itemSize = 3;
        cubeVertexPositionBuffer.numItems = 24;

        cubeVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
        colors = [
            [1.0, 0.0, 0.0, 1.0], // Front face
            [1.0, 1.0, 0.0, 1.0], // Back face
            [0.0, 1.0, 0.0, 1.0], // Top face
            [1.0, 0.5, 0.5, 1.0], // Bottom face
            [1.0, 0.0, 1.0, 1.0], // Right face
            [0.0, 0.0, 1.0, 1.0]  // Left face
        ];
        var unpackedColors = [];
        for (var i in colors) {
            var color = colors[i];
            for (var j=0; j < 4; j++) {
                unpackedColors = unpackedColors.concat(color);
            }
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedColors), gl.STATIC_DRAW);
        cubeVertexColorBuffer.itemSize = 4;
        cubeVertexColorBuffer.numItems = 24;

        cubeVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
        var cubeVertexIndices = [
            0, 1, 2,      0, 2, 3,    // Front face
            4, 5, 6,      4, 6, 7,    // Back face
            8, 9, 10,     8, 10, 11,  // Top face
            12, 13, 14,   12, 14, 15, // Bottom face
            16, 17, 18,   16, 18, 19, // Right face
            20, 21, 22,   20, 22, 23  // Left face
        ];
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
        cubeVertexIndexBuffer.itemSize = 1;
        cubeVertexIndexBuffer.numItems = 36;   
    }

    function mvPushMatrix() {
        var copy = mat4.create();
        mat4.set(mvMatrix, copy);
        mvMatrixStack.push(copy);
    }

    function mvPopMatrix() {
        if (mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        mvMatrix = mvMatrixStack.pop();
    }

  var rCube = 0;
    function Draw() 
    {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

        mat4.identity(mvMatrix);

        mat4.translate(mvMatrix, [-1.5, 0.0, -8.0]);

        mvPushMatrix();

        mvPopMatrix();


        mat4.translate(mvMatrix, [3.0, 0.0, 0.0]);

        mvPushMatrix();
        mat4.rotate(mvMatrix, degToRad(rCube), [1, 1, 1]);

        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, cubeVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        checkGLError();
        Debug.Trace("Draw");
        mvPopMatrix();  
    }
