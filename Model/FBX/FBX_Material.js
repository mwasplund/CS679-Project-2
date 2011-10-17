function FBX_Material()
{
	this.Number = 0;
	this.Name = "";
	this.Type = "";
	this.Version = 0;
	this.Shading = "";
	this.MultiLayer = null;
	this.Properties = null;
}

function FBX_Parser_ParseMaterial(i_FileContainer)
{
	var NewMaterial = new FBX_Material();
 	if(i_FileContainer.HasNext)
  {
    var FirstLine = i_FileContainer.GetNextLine();
    if(FirstLine.length != 5 || FirstLine[0] != "Material:" || FirstLine[4] != "{")
    {
      Debug.Trace("Material: not formatted correctly");
      return null;
    }
    
    NewMaterial.Number = parseInt(FirstLine[1],10);
    if(isNaN(NewMaterial.Number))
    {
    	Debug.Trace("The Material's number was NaN");
    	return null;
    }
    
    // Parse the Texture Name
    if(FirstLine[2][0] == "\"" && FirstLine[2][FirstLine[2].length -1] == "\"")
    {
      NewMaterial.Name = FirstLine[2].substring(1, FirstLine[2].length - 1);
      Debug.Trace("Material Name = " + NewMaterial.Name);
    }
    else
    {
      Debug.Trace("Material Name was formatted incorrectly");
      return null;
    }
    
    // Parse the Texture Type
    if(FirstLine[3][0] == "\"" && FirstLine[3][FirstLine[3].length - 1] == "\"")
    {
      NewMaterial.Type = FirstLine[3].substring(1, FirstLine[3].length - 1);
      Debug.Trace("Material Type = " + NewMaterial.Type);
    }
    else
    {
    	Debug.Trace("Material Type was formatted incorrectly");
      return null;
    }
  }

  while(i_FileContainer.HasNext)
  {
    var CurrentLine = i_FileContainer.GetNextLine();
    if(CurrentLine[0] == "}")
    {
      // We found the end of the Material
      return NewMaterial;
    }
    else if(CurrentLine[0] == "Properties70:")
    {
    	// Parse the properties
    	i_FileContainer.StepBack();
      NewMaterial.Properties = FBX_Parser_ParseProperties70(i_FileContainer);
    }
		else if(CurrentLine[0] == "Version:")
    {
    	NewMaterial.Version = parseInt(CurrentLine[1], 10);
      if(isNaN(NewMaterial.Version ))
      {
      	Debug.Trace("The Material's Version was NaN");
      	return null;
      }
    }
    else if(CurrentLine[0] == "ShadingModel:")
    {
    	if(CurrentLine[1][0] == "\"" && CurrentLine[1][CurrentLine[1].length - 1] == "\"")
      {
        NewMaterial.ShadingModel = CurrentLine[1].substring(1, CurrentLine[1].length - 1);
        Debug.Trace("Material ShadingModel = " + NewMaterial.ShadingModel);
      }
      else
      {
      	Debug.Trace("Material ShadingModel was formatted incorrectly");
        return null;
      }
    }
		else if(CurrentLine[0] == "MultiLayer:")
    {
    }
    else
    {
      Debug.Trace("Found Unknown Token in Material: " + CurrentLine[0]);
      return null;
    }
  }
  
  Debug.Trace("Never saw the end bracket for Material:");
  return null;
}
