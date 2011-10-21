function Mesh(i_Model)
{ 
  // Attach Functions
  this.Draw = Mesh_Draw;
  
  Debug.Trace("Initialize Mesh");  
  
  // Bind the GL Arrays
  // Vertices
  // Convert the Indexed Triangles to array of vertices
  var Vertices = new Array();
  for(var i = 0; i < i_Model.Geometry.TriangleIndices.length; i++)
  {
    Vertices.push(i_Model.Geometry.Vertices[i_Model.Geometry.TriangleIndices[i] * 3 + 0]);
    Vertices.push(i_Model.Geometry.Vertices[i_Model.Geometry.TriangleIndices[i] * 3 + 1]);
    Vertices.push(i_Model.Geometry.Vertices[i_Model.Geometry.TriangleIndices[i] * 3 + 2]);
  }
  
  this.VertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Vertices), gl.STATIC_DRAW);
  this.VertexPositionBuffer.itemSize = 3;
  this.VertexPositionBuffer.numItems = Vertices.length / 3;
  
  Debug.Trace("NumVertices: " + this.VertexPositionBuffer.numItems);
  
  if(i_Model.Geometry.TriangleNormals != null)
  {
	  this.VertexNormalBuffer = gl.createBuffer();
	  gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexNormalBuffer);
	  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(i_Model.Geometry.TriangleNormals), gl.STATIC_DRAW);
	  this.VertexNormalBuffer.itemSize = 3;
	  this.VertexNormalBuffer.numItems = i_Model.Geometry.TriangleNormals.length/3;
	  Debug.Trace("NumNormals: " + this.VertexNormalBuffer.numItems);
  }
  
  if(i_Model.Geometry.TriangleUVIndices != null)
  {
    //bind the UV buffers
	var TextureCoords = new Array();
	var LayerElementUV = i_Model.Geometry.LayerElementUV;
	for(var i = 0; i <  i_Model.Geometry.TriangleUVIndices.length; i++)
	{
	  var Index = i_Model.Geometry.TriangleUVIndices[i];
	  TextureCoords.push(LayerElementUV.UV[2*Index]);
	  TextureCoords.push(LayerElementUV.UV[2*Index+1]);
	  
	  //Debug.Trace("UV: " + i + " Index: " + Index + "( " +  LayerElementUV.UV[2*Index] + ", " + LayerElementUV.UV[2*Index+1] + ")");
	}
	
	this.VertexTextureCoordBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexTextureCoordBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(TextureCoords), gl.STATIC_DRAW);
   this.VertexTextureCoordBuffer.itemSize = 2;
   this.VertexTextureCoordBuffer.numItems = TextureCoords.length/2;
   Debug.Trace("NumUV: " + this.VertexTextureCoordBuffer.numItems);
  }
  
  // Indices
  /*this.VertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(i_Model.Geometry.Indices), gl.STATIC_DRAW);
  this.VertexIndexBuffer.itemSize = 1;
  this.VertexIndexBuffer.numItems = i_Model.Geometry.Indices.length;
  
  Debug.Trace("NumIndices: " + this.VertexIndexBuffer.numItems);
  */
  
  // Check if model has predefined rotaion, translation, scale... etc
  this.Scale    = new Vector3D(1, 1, 1);
  this.Translate = new Vector3D(0, 0, 0);
	this.Rotate   = new Vector3D(0, 0, 0);

	Debug.Trace("Properties.length = " + i_Model.Properties.length);
  for(var i = 0; i < i_Model.Properties.length; i++)
  {
  	var Property = i_Model.Properties[i];
  	switch(Property.Name)
  	{
  		case "Lcl Translation":
  		{
  			Debug.Trace("Translate (" + Property.Value.X + ", " + Property.Value.Y + ", " + Property.Value.Z + ")");
  			this.Translate = Property.Value;
  			break;
  		}
  		case "PreRotation":
  		{
  			Debug.Trace("PreRotate (" + Property.Value.X + ", " + Property.Value.Y + ", " + Property.Value.Z + ")");
	
  			this.Rotate.X += Property.Value.X;
  			this.Rotate.Y += Property.Value.Y;
  			this.Rotate.Z += Property.Value.Z;
  			break;
  		}
  		case "Lcl Rotation":
  		{
  			Debug.Trace("Rotate (" + Property.Value.X + ", " + Property.Value.Y + ", " + Property.Value.Z + ")");
	
  			this.Rotate.X += Property.Value.X;
  			this.Rotate.Y += Property.Value.Y;
  			this.Rotate.Z += Property.Value.Z;
  			break;
  		}
      case "Lcl Scaling":
      {
      	Debug.Trace("Scale (" + Property.Value.X + ", " + Property.Value.Y + ", " + Property.Value.Z + ")");

      	this.Scale = Property.Value;
      	break;
     	}
  	}
  }
  
  // Check if the image has a texture
  this.Texture = null;
  if(i_Model.Material != null)
  {
  	if(i_Model.Material.Texture != null)
  	{
  		Debug.Trace("This mesh uses Texture = " + i_Model.Material.Texture.RelativeFilename);
  		this.Texture = gl.createTexture();
  		this.Texture.image = new Image();
  		var Texture = this.Texture;
  		this.Texture.image.onload = function()
  		{
  			Mesh_HandleLoadedTexture(Texture);
  		}
  		var RelativeFilename = i_Model.Material.Texture.RelativeFilename;
  		this.Texture.image.src = "sceneassets/images/" + RelativeFilename.substring(RelativeFilename.lastIndexOf('\\') + 1);
  	}
  }
  
  checkGLError();
  Debug.Trace("Model loaded");
}

function Mesh_HandleLoadedTexture(i_Texture) 
{
  gl.bindTexture(gl.TEXTURE_2D, i_Texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, i_Texture.image);
  //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
 // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);
	
  gl.bindTexture(gl.TEXTURE_2D, null);
  //Debug.Trace("Image Loaded");
  checkGLError();
}

function Mesh_Draw()
{
	mvPushMatrix();
	mat4.translate(mvMatrix, [this.Translate.X, this.Translate.Y, this.Translate.Z]);
	mat4.rotate(mvMatrix, degToRad(this.Rotate.X), [1, 0, 0]);
	mat4.rotate(mvMatrix, degToRad(this.Rotate.Y), [0, 1, 0]);
	mat4.rotate(mvMatrix, degToRad(this.Rotate.Z), [0, 0, 1]);
	
	mat4.scale(mvMatrix, [this.Scale.X, this.Scale.Y, this.Scale.Z]);
	
	// Bind the texture UV
	gl.uniform1i(CurrentShader.Program.Texture0_Enabled_Uniform, this.Texture != null);
	
	if(this.Texture != null)
	{
		gl.activeTexture(gl.TEXTURE0);
	  gl.bindTexture(gl.TEXTURE_2D, this.Texture);
	  gl.uniform1i(CurrentShader.Program.samplerUniform, 0);
	}
	
	if(this.VertexTextureCoordBuffer != null)
	{
  		gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexTextureCoordBuffer);
  		gl.vertexAttribPointer(CurrentShader.Program.textureCoordAttribute, this.VertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
	}
 	
		
  //Debug.Trace("Draw Mesh: "+ this.VertexPositionBuffer.numItems + " " +  this.VertexColorBuffer.numItems + " " + this.VertexIndexBuffer.numItems );
  gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
  gl.vertexAttribPointer(CurrentShader.Program.vertexPositionAttribute, this.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  if(this.VertexNormalBuffer != null)
  {
	// Bind the Normal buffer
 	gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexNormalBuffer);
  	gl.vertexAttribPointer(CurrentShader.Program.vertexNormalAttribute, this.VertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
  }

  setMatrixUniforms();
  
  gl.drawArrays(gl.TRIANGLES, 0, this.VertexPositionBuffer.numItems);
  
  mvPopMatrix();
  checkGLError();
}