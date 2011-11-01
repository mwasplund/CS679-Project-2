function GLSL_Shader(i_ShaderName)
{
	this.Name = i_ShaderName;
	
  this.Program        = gl.createProgram();
  this.FragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  this.VertexShader   = gl.createShader(gl.VERTEX_SHADER);
  
  this.FragmentShader_Loaded = false;
  this.VertexShader_Loaded   = false;
  this.Loaded                = false;
}

function LoadShader(i_ShaderName)
{
  var Shader = new GLSL_Shader(i_ShaderName);

  // Load the Vertex Shader
  $.get("Shader/" + i_ShaderName + ".vs",
    function(Data)
    {
      gl.shaderSource(Shader.VertexShader, Data);
      gl.compileShader(Shader.VertexShader);
      if (gl.getShaderParameter(Shader.VertexShader, gl.COMPILE_STATUS)) 
        Shader.VertexShader_Loaded = true;
      else
        alert(gl.getShaderInfoLog(Shader.VertexShader));
      
      if(Shader.VertexShader_Loaded && Shader.FragmentShader_Loaded)
      {
        GLSL_AttachShaderProgram(Shader);
        Shader.Loaded = true;
      }
    }
  );
    
  // Load the Fragment Shader
  $.get("Shader/" + i_ShaderName + ".fs",
    function(Data)
    {
      gl.shaderSource(Shader.FragmentShader, Data);
      gl.compileShader(Shader.FragmentShader);
      if (gl.getShaderParameter(Shader.FragmentShader, gl.COMPILE_STATUS)) 
        Shader.FragmentShader_Loaded = true;
      else
        alert(gl.getShaderInfoLog(Shader.FragmentShader));

      if(Shader.VertexShader_Loaded && Shader.FragmentShader_Loaded)
      {
        GLSL_AttachShaderProgram(Shader);
        Shader.Loaded = true;
      }
    }
  );

  return Shader;
}



function GLSL_AttachShaderProgram(i_Shader)
{
    gl.attachShader(i_Shader.Program, i_Shader.VertexShader);
    gl.attachShader(i_Shader.Program, i_Shader.FragmentShader);
    gl.linkProgram(i_Shader.Program);

    if (!gl.getProgramParameter(i_Shader.Program, gl.LINK_STATUS)) 
    {
        alert("Could not initialise shaders " + i_Shader.Name);
    }

    i_Shader.Program.vertexPositionAttribute = gl.getAttribLocation(i_Shader.Program, "aVertexPosition");
    gl.enableVertexAttribArray(i_Shader.Program.vertexPositionAttribute);

    i_Shader.Program.vertexNormalAttribute = gl.getAttribLocation(i_Shader.Program, "aVertexNormal");
    gl.enableVertexAttribArray(i_Shader.Program.vertexNormalAttribute);
    
    i_Shader.Program.textureCoordAttribute = gl.getAttribLocation(i_Shader.Program, "aTextureCoord");
    gl.enableVertexAttribArray(i_Shader.Program.textureCoordAttribute);

    i_Shader.Program.pMatrixUniform  = gl.getUniformLocation(i_Shader.Program, "uPMatrix");
    i_Shader.Program.mvMatrixUniform = gl.getUniformLocation(i_Shader.Program, "uMVMatrix");
    i_Shader.Program.nMatrixUniform  = gl.getUniformLocation(i_Shader.Program, "uNMatrix");
    
    i_Shader.Program.samplerUniform           = gl.getUniformLocation(i_Shader.Program, "uSampler"); 
    i_Shader.Program.Time_Uniform             = gl.getUniformLocation(i_Shader.Program, "uTime");
    i_Shader.Program.Texture0_Enabled_Uniform = gl.getUniformLocation(i_Shader.Program, "uTexture0_Enabled");
    
    // Lighting Variables
    i_Shader.Program.Light0_Enabled_Uniform   = gl.getUniformLocation(i_Shader.Program, "uLight0_Enabled");  
    i_Shader.Program.Light0_Position_Uniform  = gl.getUniformLocation(i_Shader.Program, "uLight0_Position");
    i_Shader.Program.Light0_Color_Uniform     = gl.getUniformLocation(i_Shader.Program, "uLight0_Color");
    
    i_Shader.Program.Light1_Enabled_Uniform   = gl.getUniformLocation(i_Shader.Program, "uLight1_Enabled");  
    i_Shader.Program.Light1_Position_Uniform  = gl.getUniformLocation(i_Shader.Program, "uLight1_Position");
    i_Shader.Program.Light1_Color_Uniform     = gl.getUniformLocation(i_Shader.Program, "uLight1_Color");

    i_Shader.Program.Camera_Position_Uniform  = gl.getUniformLocation(i_Shader.Program, "uCameraPosition");
    i_Shader.Program.AmbientColor_Uniform     = gl.getUniformLocation(i_Shader.Program, "uAmbientColor");
    i_Shader.Program.DiffuseColor_Uniform     = gl.getUniformLocation(i_Shader.Program, "uDiffuseColor");
    i_Shader.Program.SpecularColor_Uniform    = gl.getUniformLocation(i_Shader.Program, "uSpecularColor");
    i_Shader.Program.Shininess_Uniform        = gl.getUniformLocation(i_Shader.Program, "uShininess");
}



