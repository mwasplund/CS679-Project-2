function Mesh(i_Vertices, i_Indices)
{ 
  // Attach Functions
  this.Draw = Mesh_Draw;
  
  
    for(var k = 0; k < i_Vertices.length; k++)
    {
      var CurrenctVertex = i_Vertices[k];
      Debug.Trace("Vertex: " + CurrenctVertex);
    }
    
    for(var k = 0; k < i_Indices.length; k++)
    {
      var Index = i_Indices[k];
      Debug.Trace("Index: "+Index);
    }
  
  
  // Bind the GL Arrays
  // Vertices
  this.VertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(i_Vertices), gl.STATIC_DRAW);
  this.VertexPositionBuffer.itemSize = 3;
  this.VertexPositionBuffer.numItems = i_Vertices.length / 3;
  
  Debug.Trace("NumVertices: " + this.VertexPositionBuffer.numItems);
  
  // Colors
  this.VertexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexColorBuffer);
  var Colors = new Array();
  for(var i = 0; i < this.VertexPositionBuffer.numItems; i++)
  {
    Colors.push(1.0);
    Colors.push(0.0);
    Colors.push(0.0);
    Colors.push(1.0);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Colors), gl.STATIC_DRAW);
  this.VertexColorBuffer.itemSize = 4;
  this.VertexColorBuffer.numItems = this.VertexPositionBuffer.numItems;

  Debug.Trace("NumColors: " + this.VertexColorBuffer.numItems);
    
  // Indices
  this.VertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(i_Indices), gl.STATIC_DRAW);
  this.VertexIndexBuffer.itemSize = 1;
  this.VertexIndexBuffer.numItems = i_Indices.length;
  
  Debug.Trace("NumIndices: " + this.VertexIndexBuffer.numItems);
}

function Mesh_Draw()
{
  //Debug.Trace("Draw Mesh: "+ this.VertexPositionBuffer.numItems + " " +  this.VertexColorBuffer.numItems + " " + this.VertexIndexBuffer.numItems );
  gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexColorBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.VertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
  setMatrixUniforms();
  
  gl.drawElements(gl.TRIANGLES, this.VertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  checkGLError();

}