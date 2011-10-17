function FBX_LayerElementNormal()
{
	this.Number = -1;
	this.Version = null;
	this.Name = null;
	this.MappingInformationType = null;
	this.ReferenceInformationType = null;
	this.Normals = null;
}

function FBX_Parser_ParseLayerElementNormal(i_FileContainer)
{
  var LayerElementNormal = new FBX_LayerElementNormal();
  if(i_FileContainer.HasNext)
  {
    var FirstLine = i_FileContainer.GetNextLine();
    if(FirstLine.length != 3 || FirstLine[0] != "LayerElementNormal:" || FirstLine[2] != "{")
    {
      Debug.Trace("LayerElementNormal: not formatted correctly");
      return null;
    }
    
    LayerElementNormal.Number = parseInt(FirstLine[1]);
    if(isNaN(LayerElementNormal.Number))
    {
      Debug.Trace("The LayerElementNormal: number was NaN");
      return null;
    }
  }

  while(i_FileContainer.HasNext)
  {
    var CurrentLine = i_FileContainer.GetNextLine();
    if(CurrentLine[0] == "}")
    {
      // We found the end of the LayerElementNormal
      return LayerElementNormal;
    }
		else if(CurrentLine[0] == "Version:")
    {
    	LayerElementNormal.Version = parseInt(CurrentLine[1], 10);
      if(isNaN(LayerElementNormal.Version))
      {
      	Debug.Trace("The LayerElementNormal's Version was NaN");
      	return null;
      }
    }
    else if(CurrentLine[0] == "Name:")
    {
    	if(CurrentLine[1][0] == "\"" && CurrentLine[1][CurrentLine[1].length - 1] == "\"")
      {
        LayerElementNormal.Name = CurrentLine[1].substring(1, CurrentLine[1].length - 1);
        Debug.Trace("LayerElementNormal Nmae = " + LayerElementNormal.Name);
      }
      else
      {
      	Debug.Trace("LayerElementNormal Name was formatted incorrectly");
        return null;
      }
    }
    else if(CurrentLine[0] == "MappingInformationType:")
    {
    	if(CurrentLine[1][0] == "\"" && CurrentLine[1][CurrentLine[1].length - 1] == "\"")
      {
        LayerElementNormal.MappingInformationType = CurrentLine[1].substring(1, CurrentLine[1].length - 1);
        Debug.Trace("LayerElementNormal MappingInformationType = " + LayerElementNormal.MappingInformationType);
      }
      else
      {
      	Debug.Trace("LayerElementNormal MappingInformationType was formatted incorrectly");
        return null;
      }
    }
    else if(CurrentLine[0] == "ReferenceInformationType:")
    {
    	if(CurrentLine[1][0] == "\"" && CurrentLine[1][CurrentLine[1].length - 1] == "\"")
      {
        LayerElementNormal.ReferenceInformationType = CurrentLine[1].substring(1, CurrentLine[1].length - 1);
        Debug.Trace("LayerElementNormal ReferenceInformationType = " + LayerElementNormal.ReferenceInformationType);
      }
      else
      {
      	Debug.Trace("LayerElementNormal ReferenceInformationType was formatted incorrectly");
        return null;
      }
    }
    else if(CurrentLine[0] == "Normals:")
    {
      i_FileContainer.StepBack();
      LayerElementNormal.Normals = FBX_Parser_ParseNormals(i_FileContainer);
    }
    else
    {
      Debug.Trace("Found Unknown Token in LayerElementNormal: " + CurrentLine[0]);
      return null;
    }
  }
  
  Debug.Trace("Never saw the end bracket for LayerElementNormal:");
  return null;
}

function  FBX_Parser_ParseNormals(i_FileContainer)
{
  var Normals = new Array();
  var Count;
  if(i_FileContainer.HasNext)
  {
    var FirstLine = i_FileContainer.GetNextLine();
    if(FirstLine.length != 3 || FirstLine[0] != "Normals:" || FirstLine[1][0] != "*" || FirstLine[2] != "{")
    {
      Debug.Trace("Normals: not formatted correctly");
      return null;
    }
    
    Count = parseInt(FirstLine[1].substring(1));
    if(isNaN(Count))
    {
      Debug.Trace("The Normals: count was NaN");
      return null;
    }
    if((Count % 3) != 0)
    {
      // There was an invalid number of numbers
      Debug.Trace("The Normals: count was not a multiple of three.");
      return null;
    }
    
    Debug.Trace("Normals: " + Count);
  }

  if(i_FileContainer.HasNext)
  {
    var SecondLine = i_FileContainer.GetNextLine();
    if(SecondLine[0] != "a:")
    {
      Debug.Trace("Normals not formatted correctly");
      return null;
    }
    
    for(var i = 1; i < SecondLine.length; i++)
    {
      var Value = parseFloat(SecondLine[i]);
      if(isNaN(Value))
      {
        Debug.Trace("A Normal was " + Value);
        return null;
      }
      Normals.push(Value);
    }
  }
  
  // Parse lines until we reach and end bracket
  while(i_FileContainer.HasNext)
  {
  	var CurrentLine = i_FileContainer.GetNextLine();
    if(CurrentLine[0] == "}")
    {
    	if(Normals.length != Count)
    	{
    		Debug.Trace("Expected " + Count + " Normals but found " + Normals.length);
    		return null;
    	}
    	else
    	{
      	 // The Normals was correctly formatted
 				return Normals;
 			}
    }
  
    for(var i = 0; i < CurrentLine.length; i++)
    {
      var Value = parseFloat(CurrentLine[i]);
      if(isNaN(Value))
      {
        Debug.Trace("A Normals was " + Value);
        return null;
      }
      Normals.push(Value);
    }
  }
  
   Debug.Trace("Never saw the end bracket for Normals:");
   return null;
}
