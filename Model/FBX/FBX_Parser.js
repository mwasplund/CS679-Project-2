LoadjsFile("Model/Math.js");

function FBX_Parser(i_File)
{
  var File = new FBX_FileContainer(i_File);
  this.Objects = null;
  
  // If the first token starts with a semi-colon it is a comment
  while(File.HasNext)
  {
     var CurrentLine = File.GetNextLine();
     if(CurrentLine[0][0] == ';')
     {
       // We found a comment
       // Ignore the rest of the row
       //Debug.Trace("Found Comment");
     }
     else if(CurrentLine[0] == "Objects:")
     {
       Debug.Trace("Found Objects");
       File.StepBack();
       this.Objects = FBX_Parser_ParseObjects(File);
       if(this.Objects == null)
       {
          Debug.Trace("There was an error parsing the Objects.");
       }
     }
     else
     {
       //Debug.Trace("Found Unknown Token: " + CurrentLine[0]);
     }
   }
}

function FBX_Parser_ParseObjects(i_FileContainer)
{
  // The next token should be a Right Bracket
  if(i_FileContainer.HasNext)
  {
    var FirstLine = i_FileContainer.GetNextLine();
    if(FirstLine.length != 2 || FirstLine[0] != "Objects:" || FirstLine[1] != "{")
    {
      Debug.Trace("Objects not formatted correctly. Objects: {");
      return null;
    }
  }
  
  var Objects = new FBX_Objects();
  while(i_FileContainer.HasNext)
  {
    var CurrentLine = i_FileContainer.GetNextLine();
    if(CurrentLine[0] == "}")
    {
      // We found the end of the objects class
      return Objects;
    }
    else if(CurrentLine[0] == "Geometry:")
    {
      Debug.Trace("Found Geometry");
      i_FileContainer.StepBack();
      var Geometry = FBX_Parser_ParseGeometry(i_FileContainer);
      if(Geometry != null)
      {
        Objects.GeometryList.push(Geometry);
      }
      else
      {
        Debug.Trace("There was an error parsing a Geometry in the Objects:");
        return null;
      }
    }
    else if(CurrentLine[0] == "Model:")
    {
      Debug.Trace("Found Model");
      i_FileContainer.StepBack();
      var Model = FBX_Parser_ParseModel(i_FileContainer);
    }
    else
    {
      Debug.Trace("Found Unknown Token in Objects: " + CurrentLine[0]);
      //return null
    }
  }
  
  Debug.Trace("Never saw the end bracket for Objects:");
  return null;
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
      // We found the end of the geometry class
      return NewGeometry;
    }
    else if(CurrentLine[0] == "Properties70:")
    {
      Debug.Trace("Found Properties70");
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
      Debug.Trace("Found PolygonVertexIndex");
      i_FileContainer.StepBack();
      NewGeometry.Indices = FBX_Parser_ParsePolygonVertexIndex(i_FileContainer);
      if(NewGeometry.Indices == null)
      {
        Debug.Trace("There was an error parsing the PolygonVertexIndex");
        return null;
      }
    }
    else if(CurrentLine[0] == "Edges:")
    {
      Debug.Trace("Found Edges");
      //var Model = FBX_Parser_ParseModel(i_FileContainer);
    }
    else if(CurrentLine[0] == "GeometryVersion:")
    {
      Debug.Trace("Found GeometryVersion");
      //var Model = FBX_Parser_ParseModel(i_FileContainer);
    }
    else if(CurrentLine[0] == "LayerElementNormal:")
    {
      Debug.Trace("Found LayerElementNormal");
      //var Model = FBX_Parser_ParseModel(i_FileContainer);
    }
    else if(CurrentLine[0] == "LayerElementUV:")
    {
      Debug.Trace("Found LayerElementUV");
      //var Model = FBX_Parser_ParseModel(i_FileContainer);
    }
    else if(CurrentLine[0] == "LayerElementVisibility:")
    {
      Debug.Trace("Found LayerElementVisibility");
      //var Model = FBX_Parser_ParseModel(i_FileContainer);
    }
    else if(CurrentLine[0] == "Layer:")
    {
      Debug.Trace("Found Layer");
      //var Model = FBX_Parser_ParseModel(i_FileContainer);
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
    if((Count % 3) != 0)
    {
      // There was an invalid number of numbers
      // we expect triangles
      Debug.Trace("The PolygonVertexIndex: count was not a multiple of three.");
      return null;
    }
    
    Debug.Trace("PolygonVertexIndex: " + Count);
  }

  var Indices = new Array();
  if(i_FileContainer.HasNext)
  {
    var SecondLine = i_FileContainer.GetNextLine();
    if(SecondLine[0] != "a:" || SecondLine.length != Count + 1)
    {
      Debug.Trace("Triangles not formatted correctly");
      return null;
    }
    
    for(var i = 1; i+2 < SecondLine.length; i+=3)
    {
      var Index1 = parseInt(SecondLine[i]);
      var Index2 = parseInt(SecondLine[i+1]);
      var Index3 = parseInt(SecondLine[i+2]);
      
      // Negative numbers indicate the end of a polygon, but we only know how to 
      // handle triangles as of now... so fail if we dont have a triangle
      if(isNaN(Index1) || isNaN(Index2) || isNaN(Index3) || Index3 > 0)
      {
        Debug.Trace("A triangle indices were (" + Index1 + ", " + Index2 + ", " + Index3 + ")");
        return null;
      }
      Indices.push(Index1);
      Indices.push(Index2);
      Indices.push(-Index3 - 1);
    }
  }
  
  if(i_FileContainer.HasNext)
  {
    var ThirdLine = i_FileContainer.GetNextLine();
    if(ThirdLine[0] != "}")
    {
      Debug.Trace("Never saw the end bracket for ParsePolygonVertexIndex:");
      return null;
    }
  }
  
  // The Triangles were correctly formatted
  return Indices;
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
    if(SecondLine[0] != "a:" || SecondLine.length != Count + 1)
    {
      Debug.Trace("Vertices not formatted correctly");
      return null;
    }
    
    for(var i = 1; i+2 < SecondLine.length; i+=3)
    {
      var X = parseFloat(SecondLine[i]);
      var Y = parseFloat(SecondLine[i+1]);
      var Z = parseFloat(SecondLine[i+2]);
      if(isNaN(X) || isNaN(Y) || isNaN(Z))
      {
        Debug.Trace("A vertex was (" + X + ", " + Y + ", " + Z + ")");
        return null;
      }
      Vertices.push(X);
      Vertices.push(Y);
      Vertices.push(Z);
    }
  }
  
  if(i_FileContainer.HasNext)
  {
    var ThirdLine = i_FileContainer.GetNextLine();
    if(ThirdLine[0] != "}")
    {
      Debug.Trace("Never saw the end bracket for Vertices:");
      return null;
    }
  }
  
  // The Vertices were correctly formatted
  return Vertices;
}


function FBX_Parser_ParseProperties70(i_FileContainer)
{
  if(i_FileContainer.HasNext)
  {
    var FirstLine = i_FileContainer.GetNextLine();
    if(FirstLine[0] != "Properties70:" || FirstLine[1] != "{")
    {
      Debug.Trace("Properties70: not formatted correctly");
      return null;
    }
  }

  var Properties = new Array();
  while(i_FileContainer.HasNext)
  {
    var CurrentLine = i_FileContainer.GetNextLine();
    if(CurrentLine[0] == "}")
    {
      // We found the end of the properties70
      return Properties;
    }
    else if(CurrentLine[0] == "P:")
    {
      
    }
    else
    {
      Debug.Trace("Found Unknown Token in Properties70: " + CurrentLine[0]);
      return null;
    }
  }
  
  Debug.Trace("Never saw the end bracket for Properties70:");
  return null;
}

function FBX_Parser_ParseModel(i_FileContainer)
{

}

function FBX_Geometry()
{
  this.Name = null;
  this.Number = 0;
  this.Type = null;
  
  this.Properties = null;
  this.Vertices = null;
  this.Indices = null;
}

function FBX_Objects()
{
  this.GeometryList = new Array();
  this.ModelList = new Array();
}

function FBX_Parser_ParseLine(i_Line)
{
  var Tokens = new Array();
  var Length = i_Line.length;
  var Token = new String();
  for(var i = 0; i < Length; i++)
  {
    // Ignore whitespace and comma seperated
    if(i_Line[i] != " " && i_Line[i] != "\t" && i_Line[i] != ",")
    {
      Token += i_Line[i];
    }
    else if(Token != "")
    {
      Tokens.push(Token);
      Token = new String();
    }
  }
  
  // Check if we have a Token at the end of the line
  if(Token != "")
  {
    Tokens.push(Token);
  }
  
  return Tokens;
}

function FBX_FileContainer(i_File)
{
  this.Lines = new Array();
  this.LineIndex = 0;
  this.TokenIndex = 0;
  
  // Convert the file string into a array of lines, array of tokens
  var Line = new String();
  for(var i = 0; i < i_File.length; i++)
  {
    if(i_File[i] == "\r" && i+1 < i_File.length && i_File[i+1] == "\n")
    {
      var Tokens = FBX_Parser_ParseLine(Line);
      if(Tokens.length > 0)
      {
        this.Lines.push(Tokens);
      }

      i++;
      Line = new String();
    }
    else
    {
      Line += i_File[i];
    }
  }
  
  // Check the last line of the file
  var Tokens = FBX_Parser_ParseLine(Line);
  if(Tokens.length > 0)
    this.Lines.push(Tokens);

  
  // Check if we found at least one token
  if(this.Lines.length > 0)
    this.HasNext = true;
  else
    this.HasNext = false;

  // Attach functions
  this.GetNextLine = FBX_FileContainer_GetNextLine;
  this.StepBack = FBX_FileContainer_StepBack;
}

function FBX_FileContainer_GetNextLine()
{
  var NextLine = this.Lines[this.LineIndex];
  this.LineIndex++;
  // Check if there is a next line
  if(this.LineIndex >= this.Lines.length)
    this.HasNext = false;
  
  return NextLine;
}

function FBX_FileContainer_StepBack()
{
  this.LineIndex--;
  if(this.LineIndex < 0)
    this.LineIndex = 0;
}

function ascii_value (c)
{
	// restrict input to a single character
	c = c . charAt (0);

	// loop through all possible ASCII values
	var i;
	for (i = 0; i < 256; ++ i)
	{
		// convert i into a 2-digit hex string
		var h = i . toString (16);
		if (h . length == 1)
			h = "0" + h;

		// insert a % character into the string
		h = "%" + h;

		// determine the character represented by the escape code
		h = unescape (h);

		// if the characters match, we've found the ASCII value
		if (h == c)
			break;
	}
	return i;
}

function FBX_Parser_HandleUnknownToken(i_FileContainer)
{
  while(i_FileContainer.HasNext)
  {
    var NextToken = i_FileContainer.GetNextToken();
    
    if(NextToken == "}")
    {
      //Debug.Trace("Found End of Unknown Token");
      return;
    }
    else if(NextToken == "{")
    {
      //Debug.Trace("Found Unknown Token")
      FBX_Parser_HandleUnknownToken(i_FileContainer);
    }
  }
}