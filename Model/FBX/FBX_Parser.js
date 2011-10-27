LoadjsFile("Model/Math.js");
LoadjsFile("Model/FBX/FBX_Objects.js");
LoadjsFile("Model/FBX/FBX_Model.js");
LoadjsFile("Model/FBX/FBX_Geometry.js");
LoadjsFile("Model/FBX/FBX_Texture.js");
LoadjsFile("Model/FBX/FBX_Material.js");
LoadjsFile("Model/FBX/FBX_Properties70.js");
LoadjsFile("Model/FBX/FBX_Connections.js");
LoadjsFile("Model/FBX/FBX_LayerElementUV.js");
LoadjsFile("Model/FBX/FBX_LayerElementNormal.js");

function FBX_Parser(i_File)
{
  var File = new FBX_FileContainer(i_File);
  this.Objects = null;
  this.Connections = null;
  
  this.GetModel    = FBX_GetModel;
	this.GetMaterial = FBX_GetMaterial;
	this.GetTexture  = FBX_GetTexture;
	this.GetGeometry = FBX_GetGeometry;
  
  // If the first token starts with a semi-colon it is a comment
  while(File.HasNext)
  {
     var CurrentLine = File.GetNextLine();
     if(CurrentLine[0] == "Objects:")
     {
       Debug.Trace("Found Objects");
       File.StepBack();
       this.Objects = FBX_Parser_ParseObjects(File);
     }
     else if(CurrentLine[0] == "Connections:")
     {
       Debug.Trace("Found Connections");
       File.StepBack();
       this.Connections = FBX_Parser_ParseConnections(File);
     }
     else
     {
       Debug.Trace("Found Unknown Token: " + CurrentLine[0]);
       FBX_Parser_HandleUnknownToken(File);
     }
   }
   
   // Now that we have parsed the entire file make the connections between objects
   if(this.Objects == null)
   {
   		Debug.Trace("The Model did not contain valid Objects.");
   		return null;
   }
   if(this.Connections == null)
   {
   		Debug.Trace("The Model did not contain valid Connections.");
   		return null;
   }
		
		this.Models = new Array();
		for(var i = 0; i < this.Connections.length; i++)
		{
			var Connection = this.Connections[i];
			//Debug.Trace("Connecting Connection");
			if(Connection.Origin == 0)
			{
				// Find the Model and add it to the list of models
				var Model = this.GetModel(Connection.Destination);
				if(Model != null)
				{
					//Debug.Trace("Match Model (" + Model.Name + ") to origin");
					this.Models.push(Model);
				}
			}
			else
			{
				var Model = this.GetModel(Connection.Origin);
				if(Model != null)
				{
					// The source is a Model
					// Try to see if the Destination is either a geometry or a material
					var Geometry = this.GetGeometry(Connection.Destination);
					if(Geometry != null)
					{
						//Debug.Trace("Match Model (" + Model.Name  + ") to Geometry (" + Geometry.Name + ")");
						Model.Geometry = Geometry;
					}
					else
					{
						var Material = this.GetMaterial(Connection.Destination);
						if(Material != null)
						{
							//Debug.Trace("Match Model (" + Model.Name  + ") to Material (" + Material.Name + ")");
							Model.Material = Material;
						}
					}
				}
				else
				{
					var Material = this.GetMaterial(Connection.Origin);
					if(Material != null)
					{
						// The source is a Material
						// Try to see if the Destination is a texture
						var Texture = this.GetTexture(Connection.Destination);
						if(Texture != null)
						{
							if(Connection.Property == "DiffuseColor")
							{
  							//Debug.Trace("Match Material (" + Material.Name  + ") to Texture (" + Texture.Name + ")");
  							Material.Texture = Texture;
  						}
  						else
  						{
  							Debug.Trace("We do not know how to apply textures to " + Connection.Property);
  						}
						}
					}
				}
			}
		}
}

function FBX_GetModel(i_Number)
{
	for(var i = 0; i < this.Objects.ModelList.length; i++)
	{
		var Model = this.Objects.ModelList[i];
		if(Model.Number == i_Number)
			return Model;
	}
	return null;
}

function FBX_GetMaterial(i_Number)
{
	for(var i = 0; i < this.Objects.MaterialList.length; i++)
	{
		var Material = this.Objects.MaterialList[i];
		if(Material.Number == i_Number)
			return Material;
	}
	return null;
}

function FBX_GetTexture(i_Number)
{
	for(var i = 0; i < this.Objects.TextureList.length; i++)
	{
		var Texture = this.Objects.TextureList[i];
		if(Texture.Number == i_Number)
			return Texture;
	}
	return null;
}

function FBX_GetGeometry(i_Number)
{
	for(var i = 0; i < this.Objects.GeometryList.length; i++)
	{
		var Geometry = this.Objects.GeometryList[i];
		if(Geometry.Number == i_Number)
			return Geometry;
	}
	return null;
}


function FBX_Parser_ParseLine(i_Line)
{
  var Tokens = new Array();
  var Length = i_Line.length;
  var Token = new String();
  var InQuote = false;
  for(var i = 0; i < Length; i++)
  {
  	if(!InQuote)
  	{
      // Ignore whitespace and comma seperated
      if(i_Line[i] != " " && i_Line[i] != "\t" && i_Line[i] != ",")
      {
        Token += i_Line[i];
        if(i_Line[i] == '"')
        	InQuote = true;
      }
      else if(Token != "")
      {
        Tokens.push(Token);
        Token = new String();
      }
    }
    else
    {
    	// Add everything if we are in a quote
    	Token += i_Line[i];
    	if(i_Line[i] == '"')
        	InQuote = false;
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
  var Line = "";
  for(var i = 0; i < i_File.length; i++)
  {
    if((i_File[i] == "\n") || // Windows NewLine
       (i_File[i] == "\r" && ++i < i_File.length && i_File[i] == "\n")) // Linux NewLine
    {
      var Tokens = FBX_Parser_ParseLine(Line);
      // Don't add empty lines or lines that are comments
      if(Tokens.length > 0 && Tokens[0][0] != ";")
      {
        this.Lines.push(Tokens);
      }

      Line = "";
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

function FBX_Parser_HandleUnknownToken(i_FileContainer)
{
  while(i_FileContainer.HasNext)
  {
    var CurrentLine = i_FileContainer.GetNextLine();
    
    if(CurrentLine[0] == "}")
    {
      //Debug.Trace("Found End of Unknown Token");
      return;
    }
    else if(CurrentLine[CurrentLine.length-1] == "{")
    {
      //Debug.Trace("Found Unknown Token")
      FBX_Parser_HandleUnknownToken(i_FileContainer);
    }
  }
}