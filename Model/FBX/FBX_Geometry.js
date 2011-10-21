function FBX_Geometry()
{
  this.Name = null;
  this.Number = 0;
  this.Type = null;
  
  this.Properties = null;
  this.Vertices = null;
  this.Indices = null;
}

function FBX_Parser_ParseGeometry(i_FileContainer)
{
  var NewGeometry = new FBX_Geometry();
  NewGeometry.Properties = null;
  
  // The next tokens should be, number, name, type, Right Bracket
  if(i_FileContainer.HasNext)
  {
    // Geometry: NUMBER "Name" "Type" {
    var FirstLine = i_FileContainer.GetNextLine();
    if(FirstLine.length != 5 || FirstLine[0] != "Geometry:")
    {
      Debug.Trace("Geometry First line not formatted correctly");
      return null;
    }
    
    // Parse the reference number
    NewGeometry.Number = parseInt(FirstLine[1], 10);
    if(isNaN(NewGeometry.Number))
    {
      Debug.Trace("The Geometry reference number was NaN");
      return null;
    }
    // Parse the Geometry Name
    if(FirstLine[2][0] == "\"" && FirstLine[2][FirstLine[2].length -1] == "\"")
    {
      NewGeometry.Name = FirstLine[2].substring(1, FirstLine[2].length - 1);
      Debug.Trace("Geometry Name = " + NewGeometry.Name);
    }
    else
    {
      Debug.Trace("Geometry Name was formatted incorrectly");
      return null;
    }
    // Parse the Geometry Type
    if(FirstLine[3][0] == "\"" && FirstLine[3][FirstLine[3].length - 1] == "\"")
    {
      NewGeometry.Type = FirstLine[3].substring(1, FirstLine[3].length - 1);
      Debug.Trace("Geometry Type = " + NewGeometry.Type);
    }
    else
    {
      Debug.Trace("Geometry Type not formatted correctly");
      return null;
    }
    // Verify that there is a right curly bracket
    if(FirstLine[4] != "{")
    {
      Debug.Trace("Did not see a beginning bracket for the Geometry:");
      return null;
    }
  }

  while(i_FileContainer.HasNext)
  {
    var CurrentLine = i_FileContainer.GetNextLine();
    if(CurrentLine[0] == "}")
    {
    	// Verify that they were actually triangles
     	// Negative numbers indicate the end of a polygon, but we only know how to 
     	// handle triangles as of now... so fail if we dont have a triangle
		if(NewGeometry.PolygonVertexIndex == null)
		{
			Debug.Trace("There was no PolygonVertexIndex in the Geometry");
			return NewGeometry;	
		}
		
     	if(NewGeometry.LayerElementUV == null || NewGeometry.PolygonVertexIndex.length != NewGeometry.LayerElementUV.UVIndex.length)
		{
			Debug.Trace("There was either no LayerElementUV or its length was invalid, did not initialize triangle UV");
			//alert("There was either no LayerElementUV or its length was invalid, did not initialize triangle UV");	
		}
		else
		{
			NewGeometry.TriangleUVIndices = new Array();
		}
		
		if(NewGeometry.LayerElementNormal == null || NewGeometry.PolygonVertexIndex.length != NewGeometry.LayerElementNormal.Normals.length / 3)
 		  {
 		 		Debug.Trace("There was either no LayerEementNormal or its length was invalid, did not initialize the triangle Normals");
				alert("There was either no LayerEementNormal or its length was invalid, did not initialize the triangle Normals");
 		  }
		  else
		  {
			  NewGeometry.TriangleNormals = new Array();
		  }
 		  
 		  NewGeometry.TriangleIndices = new Array();
     	for(var i = 0; i < NewGeometry.PolygonVertexIndex.length; i++)
     	{
     		var Start = i;
     		while(i < NewGeometry.PolygonVertexIndex.length && NewGeometry.PolygonVertexIndex[i] >= 0)
     			i++;
     	
     		var NumSides = i - Start + 1;
     		// We can handle triangles and Rectangles
     		if(NumSides == 3)
     		{
     			// We found a triangle
     			// Copy over the Triangle Indices
        	NewGeometry.TriangleIndices.push( NewGeometry.PolygonVertexIndex[Start+0]);
					NewGeometry.TriangleIndices.push( NewGeometry.PolygonVertexIndex[Start+1]);
					NewGeometry.TriangleIndices.push(-NewGeometry.PolygonVertexIndex[Start+2] - 1);
					
					if(NewGeometry.TriangleUVIndices != null)
					{
						// Copy over the UV Indices
						NewGeometry.TriangleUVIndices.push(NewGeometry.LayerElementUV.UVIndex[Start+0]);
						NewGeometry.TriangleUVIndices.push(NewGeometry.LayerElementUV.UVIndex[Start+1]);
						NewGeometry.TriangleUVIndices.push(NewGeometry.LayerElementUV.UVIndex[Start+2]);
					}
					
					if(NewGeometry.TriangleNormals != null)
					{
						// Copy over the Normals
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+0]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+1]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+2]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+3]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+4]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+5]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+6]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+7]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+8]);
					}
       	}
       	else if(NumSides == 4)
       	{
       		// Convert the rectangle to two triangles
       		NewGeometry.TriangleIndices.push( NewGeometry.PolygonVertexIndex[Start+0]);
					NewGeometry.TriangleIndices.push( NewGeometry.PolygonVertexIndex[Start+1]);
					NewGeometry.TriangleIndices.push( NewGeometry.PolygonVertexIndex[Start+2]);
					
					NewGeometry.TriangleIndices.push( NewGeometry.PolygonVertexIndex[Start+0]);
					NewGeometry.TriangleIndices.push( NewGeometry.PolygonVertexIndex[Start+2]);
					NewGeometry.TriangleIndices.push(-NewGeometry.PolygonVertexIndex[Start+3] - 1);
					
					if(NewGeometry.TriangleUVIndices != null)
					{
						// UV Indices
						NewGeometry.TriangleUVIndices.push(NewGeometry.LayerElementUV.UVIndex[Start+0]);
						NewGeometry.TriangleUVIndices.push(NewGeometry.LayerElementUV.UVIndex[Start+1]);
						NewGeometry.TriangleUVIndices.push(NewGeometry.LayerElementUV.UVIndex[Start+2]);
	
						NewGeometry.TriangleUVIndices.push(NewGeometry.LayerElementUV.UVIndex[Start+0]);
						NewGeometry.TriangleUVIndices.push(NewGeometry.LayerElementUV.UVIndex[Start+2]);
						NewGeometry.TriangleUVIndices.push(NewGeometry.LayerElementUV.UVIndex[Start+3]);
					}
					
					if(NewGeometry.TriangleNormals != null)
					{
						// Normals
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+0]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+1]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+2]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+3]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+4]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+5]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+6]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+7]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+8]);
	
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+0]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+1]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+2]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+3]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+4]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+5]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+9]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+10]);
						NewGeometry.TriangleNormals.push(NewGeometry.LayerElementNormal.Normals[Start*3+11]);
					}
       	}
       	else
       	{
       		Debug.Trace("This loader does not know how to parse " + NumSides + " sided polygons... Sorry.");
       		return null;
       	}
      }
    
      // We found the end of the geometry class
      return NewGeometry;
    }
    else if(CurrentLine[0] == "Properties70:")
    {
      //Debug.Trace("Found Properties70");
      i_FileContainer.StepBack();
      NewGeometry.Properties = FBX_Parser_ParseProperties70(i_FileContainer);
    }
    else if(CurrentLine[0] == "Vertices:")
    {
      Debug.Trace("Found Vertices");
      i_FileContainer.StepBack();
      NewGeometry.Vertices = FBX_Parser_ParseVertices(i_FileContainer);
      if(NewGeometry.Vertices == null)
      {
        Debug.Trace("There was an error parsing the Vertices");
        return null;
      }
    }
    else if(CurrentLine[0] == "PolygonVertexIndex:")
    {
      //Debug.Trace("Found PolygonVertexIndex");
      i_FileContainer.StepBack();
      NewGeometry.PolygonVertexIndex = FBX_Parser_ParsePolygonVertexIndex(i_FileContainer);
      if(NewGeometry.PolygonVertexIndex == null)
      {
        Debug.Trace("There was an error parsing the PolygonVertexIndex");
        return null;
      }
    }
    else if(CurrentLine[0] == "Edges:")
    {
      Debug.Trace("Found Edges");
      FBX_Parser_HandleUnknownToken(i_FileContainer);
    }
    else if(CurrentLine[0] == "GeometryVersion:")
    {
      Debug.Trace("Found GeometryVersion");
      //FBX_Parser_HandleUnknownToken(i_FileContainer);
    }
    else if(CurrentLine[0] == "LayerElementNormal:")
    {
      Debug.Trace("Found LayerElementNormal");
      i_FileContainer.StepBack();
      NewGeometry.LayerElementNormal = FBX_Parser_ParseLayerElementNormal(i_FileContainer);
    }
    else if(CurrentLine[0] == "LayerElementUV:")
    {
      Debug.Trace("Found LayerElementUV");
      i_FileContainer.StepBack();
      NewGeometry.LayerElementUV = FBX_Parser_ParseLayerElementUV(i_FileContainer);
    }
    else if(CurrentLine[0] == "LayerElementVisibility:")
    {
      Debug.Trace("Found LayerElementVisibility");
      FBX_Parser_HandleUnknownToken(i_FileContainer);
    }
    else if(CurrentLine[0] == "LayerElementMaterial:")
    {
      Debug.Trace("Found LayerElementMaterial");
      FBX_Parser_HandleUnknownToken(i_FileContainer);
    }
    else if(CurrentLine[0] == "Layer:")
    {
      Debug.Trace("Found Layer");
      FBX_Parser_HandleUnknownToken(i_FileContainer);
    }
    else
    {
      Debug.Trace("Found Unknown Token in Geometry: " + CurrentLine[0]);
      //return null;
    }
  }
  
  Debug.Trace("Never saw the end bracket for Geometry:");
  return null;
}

function FBX_Parser_ParsePolygonVertexIndex(i_FileContainer)
{
  var Count;
  if(i_FileContainer.HasNext)
  {
    var FirstLine = i_FileContainer.GetNextLine();
    for(var i = 0; i < FirstLine.length;i++)
      Debug.Trace(FirstLine[i]);
    if(FirstLine.length != 3 || FirstLine[0] != "PolygonVertexIndex:" || FirstLine[1][0] != "*" || FirstLine[2] != "{")
    {
      Debug.Trace("PolygonVertexIndex: not formatted correctly");
      return null;
    }
    
    Count = parseInt(FirstLine[1].substring(1));
    if(isNaN(Count))
    {
      Debug.Trace("The PolygonVertexIndex: count was NaN");
      return null;
    }

    Debug.Trace("PolygonVertexIndex: " + Count);
  }

  var PolygonVertexIndex = new Array();
  if(i_FileContainer.HasNext)
  {
    var SecondLine = i_FileContainer.GetNextLine();
    if(SecondLine[0] != "a:")
    {
      Debug.Trace("Triangles not formatted correctly");
      return null;
    }
    
    for(var i = 1; i < SecondLine.length; i++)
    {
      var Index = parseInt(SecondLine[i]);
            
      // Negative numbers indicate the end of a polygon, but we only know how to 
      // handle triangles as of now... so fail if we dont have a triangle
      if(isNaN(Index))
      {
        Debug.Trace("A triangle indice was " + Index);
        return null;
      }
      PolygonVertexIndex.push(Index);
    }
  }
  
  // Continue until we find an end bracket
  while(i_FileContainer.HasNext)
  {
    var CurrentLine  = i_FileContainer.GetNextLine();
    if(CurrentLine[0] == "}")
    {
			if(PolygonVertexIndex.length != Count)
			{
				Debug.Trace("Expected " + Count + " Indices but found " + PolygonVertexIndex.length);
				return null;
			}
      else
      {
      	// The PolygonVertexIndex are now correctly formatted
  			return PolygonVertexIndex;
      }
    }
  
    for(var i = 0; i < CurrentLine.length; i++)
    {
      var Index = parseInt(CurrentLine[i]);
      if(isNaN(Index))
      {
        Debug.Trace("A triangle index was " + Index);
        return null;
      }
      PolygonVertexIndex.push(Index);
    }
  }
}

function FBX_Parser_ParseVertices(i_FileContainer)
{
  var Count;
  if(i_FileContainer.HasNext)
  {
    var FirstLine = i_FileContainer.GetNextLine();
    if(FirstLine.length != 3 || FirstLine[0] != "Vertices:" || FirstLine[1][0] != "*" || FirstLine[2] != "{")
    {
      Debug.Trace("Vertices: not formatted correctly");
      return null;
    }
    
    Count = parseInt(FirstLine[1].substring(1));
    if(isNaN(Count))
    {
      Debug.Trace("The Vertices: count was NaN");
      return null;
    }
    if((Count % 3) != 0)
    {
      // There was an invalid number of numbers
      Debug.Trace("The Vertices: count was not a multiple of three.");
      return null;
    }
    
    Debug.Trace("Vertices: " + Count);
  }

  var Vertices = new Array();
  if(i_FileContainer.HasNext)
  {
    var SecondLine = i_FileContainer.GetNextLine();
    if(SecondLine[0] != "a:")
    {
      Debug.Trace("Vertices not formatted correctly");
      return null;
    }
    
    for(var i = 1; i < SecondLine.length; i++)
    {
      var Vertex = parseFloat(SecondLine[i]);
      if(isNaN(Vertex))
      {
        Debug.Trace("A vertex was " + Vertex);
        return null;
      }
      Vertices.push(Vertex);
    }
  }
  
  // Parse lines until we reach and end bracket
  while(i_FileContainer.HasNext)
  {
  	var CurrentLine = i_FileContainer.GetNextLine();
    if(CurrentLine[0] == "}")
    {
    	if(Vertices.length != Count)
    	{
    		Debug.Trace("Expected " + Count + " Vertices but found " + Vertices.length);
    		return null;
    	}
    	else
    	{
      	 // The Vertices were correctly formatted
 				return Vertices;
 			}
    }
  
    for(var i = 0; i < CurrentLine.length; i++)
    {
      var Vertex = parseFloat(CurrentLine[i]);
      if(isNaN(Vertex))
      {
        Debug.Trace("A vertex was " + Vertex);
        return null;
      }
      Vertices.push(Vertex);
    }
  }
  
   Debug.Trace("Never saw the end bracket for Vertices:");
   return null;
}

