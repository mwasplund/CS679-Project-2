function FBX_LayerElementUV()
{
  this.Number = -1;
  this.Version = -1;
  this.Name = "";
  this.MappingInformationType = "";
  this.ReferenceInformationType = "";
  this.UV = null;
  this.UVIndex = null;
}

function FBX_Parser_ParseLayerElementUV(i_FileContainer)
{
  var LayerElementUV = new FBX_LayerElementUV();
  if(i_FileContainer.HasNext)
  {
    var FirstLine = i_FileContainer.GetNextLine();
    if(FirstLine.length != 3 || FirstLine[0] != "LayerElementUV:" || FirstLine[2] != "{")
    {
      Debug.Trace("LayerElementUV: not formatted correctly");
      return null;
    }
    
    LayerElementUV.Number = parseInt(FirstLine[1]);
    if(isNaN(LayerElementUV.Number))
    {
      Debug.Trace("The LayerElementUV: number was NaN");
      return null;
    }
  }

  while(i_FileContainer.HasNext)
  {
    var CurrentLine = i_FileContainer.GetNextLine();
    if(CurrentLine[0] == "}")
    {
      // We found the end of the LayerElementUV
      return LayerElementUV;
    }
		else if(CurrentLine[0] == "Version:")
    {
    	LayerElementUV.Version = parseInt(CurrentLine[1], 10);
      if(isNaN(LayerElementUV.Version ))
      {
      	Debug.Trace("The LayerElementUV's Version was NaN");
      	return null;
      }
    }
    else if(CurrentLine[0] == "Name:")
    {
    	if(CurrentLine[1][0] == "\"" && CurrentLine[1][CurrentLine[1].length - 1] == "\"")
      {
        LayerElementUV.Name = CurrentLine[1].substring(1, CurrentLine[1].length - 1);
        Debug.Trace("LayerElementUV Nmae = " + LayerElementUV.Name);
      }
      else
      {
      	Debug.Trace("LayerElementUV Name was formatted incorrectly");
        return null;
      }
    }
    else if(CurrentLine[0] == "MappingInformationType:")
    {
    	if(CurrentLine[1][0] == "\"" && CurrentLine[1][CurrentLine[1].length - 1] == "\"")
      {
        LayerElementUV.MappingInformationType = CurrentLine[1].substring(1, CurrentLine[1].length - 1);
        Debug.Trace("LayerElementUV MappingInformationType = " + LayerElementUV.MappingInformationType);
      }
      else
      {
      	Debug.Trace("LayerElementUV MappingInformationType was formatted incorrectly");
        return null;
      }
    }
    else if(CurrentLine[0] == "ReferenceInformationType:")
    {
    	if(CurrentLine[1][0] == "\"" && CurrentLine[1][CurrentLine[1].length - 1] == "\"")
      {
        LayerElementUV.ReferenceInformationType = CurrentLine[1].substring(1, CurrentLine[1].length - 1);
        Debug.Trace("LayerElementUV ReferenceInformationType = " + LayerElementUV.ReferenceInformationType);
      }
      else
      {
      	Debug.Trace("LayerElementUV ReferenceInformationType was formatted incorrectly");
        return null;
      }
    }
    else if(CurrentLine[0] == "UV:")
    {
      i_FileContainer.StepBack();
      LayerElementUV.UV = FBX_Parser_ParseUV(i_FileContainer);
    }
		else if(CurrentLine[0] == "UVIndex:")
    {
      i_FileContainer.StepBack();
      LayerElementUV.UVIndex = FBX_Parser_ParseUVIndex(i_FileContainer);
    }
    else
    {
      Debug.Trace("Found Unknown Token in LayerElementUV: " + CurrentLine[0]);
      return null;
    }
  }
  
  Debug.Trace("Never saw the end bracket for LayerElementUV:");
  return null;
}

function  FBX_Parser_ParseUVIndex(i_FileContainer)
{
  var UVIndex = new Array();
  var Count;
  if(i_FileContainer.HasNext)
  {
    var FirstLine = i_FileContainer.GetNextLine();
    if(FirstLine.length != 3 || FirstLine[0] != "UVIndex:" || FirstLine[1][0] != "*" || FirstLine[2] != "{")
    {
      Debug.Trace("UVIndex: not formatted correctly");
      return null;
    }
    
    Count = parseInt(FirstLine[1].substring(1));
    if(isNaN(Count))
    {
      Debug.Trace("The UVIndex: count was NaN");
      return null;
    }
    
    Debug.Trace("UVIndex: " + Count);
  }

  if(i_FileContainer.HasNext)
  {
    var SecondLine = i_FileContainer.GetNextLine();
    if(SecondLine[0] != "a:")
    {
      Debug.Trace("UVIndex not formatted correctly");
      return null;
    }
    
    for(var i = 1; i < SecondLine.length; i++)
    {
      var Value = parseInt(SecondLine[i]);
      if(isNaN(Value))
      {
        Debug.Trace("A UVIndex was " + Value);
        return null;
      }
      UVIndex.push(Value);
    }
  }
  
  // Parse lines until we reach and end bracket
  while(i_FileContainer.HasNext)
  {
  	var CurrentLine = i_FileContainer.GetNextLine();
    if(CurrentLine[0] == "}")
    {
    	if(UVIndex.length != Count)
    	{
    		Debug.Trace("Expected " + Count + " UVIndex's but found " + UVIndex.length);
    		return null;
    	}
    	else
    	{
      	 // The UVIndex was correctly formatted
 				return UVIndex;
 			}
    }
  
    for(var i = 0; i < CurrentLine.length; i++)
    {
      var Value = parseInt(CurrentLine[i]);
      if(isNaN(Value))
      {
        Debug.Trace("A UVIndex was " + Value);
        return null;
      }
      UVIndex.push(Value);
    }
  }
  
   Debug.Trace("Never saw the end bracket for UV:");
   return null;
}


function  FBX_Parser_ParseUV(i_FileContainer)
{
  var UV = new Array();
  var Count;
  if(i_FileContainer.HasNext)
  {
    var FirstLine = i_FileContainer.GetNextLine();
    if(FirstLine.length != 3 || FirstLine[0] != "UV:" || FirstLine[1][0] != "*" || FirstLine[2] != "{")
    {
      Debug.Trace("UV: not formatted correctly");
      return null;
    }
    
    Count = parseInt(FirstLine[1].substring(1));
    if(isNaN(Count))
    {
      Debug.Trace("The UV: count was NaN");
      return null;
    }
    if((Count % 2) != 0)
    {
      // There was an invalid number of numbers
      Debug.Trace("The UV: count was not a multiple of two.");
      return null;
    }
    
    Debug.Trace("UV: " + Count);
  }

  if(i_FileContainer.HasNext)
  {
    var SecondLine = i_FileContainer.GetNextLine();
    if(SecondLine[0] != "a:")
    {
      Debug.Trace("UV not formatted correctly");
      return null;
    }
    
    for(var i = 1; i < SecondLine.length; i++)
    {
      var Value = parseFloat(SecondLine[i]);
      if(isNaN(Value))
      {
        Debug.Trace("A UV was " + Value);
        return null;
      }
      UV.push(Value);
    }
  }
  
  // Parse lines until we reach and end bracket
  while(i_FileContainer.HasNext)
  {
  	var CurrentLine = i_FileContainer.GetNextLine();
    if(CurrentLine[0] == "}")
    {
    	if(UV.length != Count)
    	{
    		Debug.Trace("Expected " + Count + " UV's but found " + UV.length);
    		return null;
    	}
    	else
    	{
      	 // The UV was correctly formatted
 				return UV;
 			}
    }
  
    for(var i = 0; i < CurrentLine.length; i++)
    {
      var Value = parseFloat(CurrentLine[i]);
      if(isNaN(Value))
      {
        Debug.Trace("A UV was " + Value);
        return null;
      }
      UV.push(Value);
    }
  }
  
   Debug.Trace("Never saw the end bracket for UV:");
   return null;
}
