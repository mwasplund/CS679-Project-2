function FBX_Texture()
{
	this.Number = 0;
	this.Type = null;
	this.Version = null;
	this.TextureName = null;
	this.Properties = null;
	this.Media = null;
	this.FileName = null;
	this.RelativeFilename = null;
	this.ModelUVTranslation = null;
	this.ModelUVScaling = null;
	this.Texture_Alpha_Source = null;
	this.Cropping = null;
}

function FBX_Parser_ParseTexture(i_FileContainer)
{
	var NewTexture = new FBX_Texture();
 	if(i_FileContainer.HasNext)
  {
    var FirstLine = i_FileContainer.GetNextLine();
    if(FirstLine.length != 5 || FirstLine[0] != "Texture:" || FirstLine[4] != "{")
    {
      Debug.Trace("Texture: not formatted correctly");
      return null;
    }
    
    NewTexture.Number = parseInt(FirstLine[1],10);
    if(isNaN(NewTexture.Number))
    {
    	Debug.Trace("The Texture's number was NaN");
    	return null;
    }
    
    // Parse the Texture Name
    if(FirstLine[2][0] == "\"" && FirstLine[2][FirstLine[2].length -1] == "\"")
    {
      NewTexture.Name = FirstLine[2].substring(1, FirstLine[2].length - 1);
      Debug.Trace("Texture Name = " + NewTexture.Name);
    }
    else
    {
      Debug.Trace("Texture Name was formatted incorrectly");
      return null;
    }
    
    // Parse the Texture Type
    if(FirstLine[3][0] == "\"" && FirstLine[3][FirstLine[3].length - 1] == "\"")
    {
      NewTexture.Type = FirstLine[3].substring(1, FirstLine[3].length - 1);
      Debug.Trace("Texture Type = " + NewTexture.Type);
    }
    else
    {
    	Debug.Trace("Texture Type was formatted incorrectly");
      return null;
    }
  }

  while(i_FileContainer.HasNext)
  {
    var CurrentLine = i_FileContainer.GetNextLine();
    if(CurrentLine[0] == "}")
    {
      // We found the end of the Model
      return NewTexture;
    }
    else if(CurrentLine[0] == "Properties70:")
    {
    	// Parse the properties
    	i_FileContainer.StepBack();
      NewTexture.Properties = FBX_Parser_ParseProperties70(i_FileContainer);
    }
    else if(CurrentLine[0] == "Type:")
    {
    	if(CurrentLine[1][0] == "\"" && CurrentLine[1][CurrentLine[1].length - 1] == "\"")
      {
        NewTexture.Type = CurrentLine[1].substring(1, CurrentLine[1].length - 1);
        Debug.Trace("Texture Type = " + NewTexture.Type);
      }
      else
      {
      	Debug.Trace("Texture Type was formatted incorrectly");
        return null;
      }
    }
		else if(CurrentLine[0] == "Version:")
    {
    	NewTexture.Version = parseInt(CurrentLine[1], 10);
      if(isNaN(NewTexture.Version ))
      {
      	Debug.Trace("The Texture's Version was NaN");
      	return null;
      }
    }
    else if(CurrentLine[0] == "TextureName:")
    {
    	if(CurrentLine[1][0] == "\"" && CurrentLine[1][CurrentLine[1].length - 1] == "\"")
      {
        NewTexture.TextureName = CurrentLine[1].substring(1, CurrentLine[1].length - 1);
        Debug.Trace("Texture TextureName = " + NewTexture.TextureName);
      }
      else
      {
      	Debug.Trace("Texture TextureName was formatted incorrectly");
        return null;
      }
    }
    else if(CurrentLine[0] == "Media:")
    {
    	if(CurrentLine[1][0] == "\"" && CurrentLine[1][CurrentLine[1].length - 1] == "\"")
      {
        NewTexture.Media = CurrentLine[1].substring(1, CurrentLine[1].length - 1);
        Debug.Trace("Texture Media = " + NewTexture.Media);
      }
      else
      {
      	Debug.Trace("Texture Media was formatted incorrectly");
        return null;
      }
    }
    else if(CurrentLine[0] == "FileName:")
    {
    	if(CurrentLine[1][0] == "\"" && CurrentLine[1][CurrentLine[1].length - 1] == "\"")
      {
        NewTexture.FileName = CurrentLine[1].substring(1, CurrentLine[1].length - 1);
        Debug.Trace("Texture FileName = " + NewTexture.FileName);
      }
      else
      {
      	Debug.Trace("Texture FileName was formatted incorrectly");
        return null;
      }
    }
		else if(CurrentLine[0] == "RelativeFilename:")
    {
    	if(CurrentLine[1][0] == "\"" && CurrentLine[1][CurrentLine[1].length - 1] == "\"")
      {
        NewTexture.RelativeFilename = CurrentLine[1].substring(1, CurrentLine[1].length - 1);
        Debug.Trace("Texture RelativeFilename = " + NewTexture.RelativeFilename);
      }
      else
      {
      	Debug.Trace("Texture RelativeFilename was formatted incorrectly");
        return null;
      }
    }
    else if(CurrentLine[0] == "ModelUVTranslation:")
    {
    }
		else if(CurrentLine[0] == "ModelUVScaling:")
    {
    }
		else if(CurrentLine[0] == "Texture_Alpha_Source:")
    {
    }
		else if(CurrentLine[0] == "Cropping:")
    {
    }
    else
    {
      Debug.Trace("Found Unknown Token in Texture: " + CurrentLine[0]);
      return null;
    }
  }
  
  Debug.Trace("Never saw the end bracket for Texture:");
  return null;
}
