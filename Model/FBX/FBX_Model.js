function FBX_Model()
{
  this.Name   = null;
  this.Number = 0;
  this.More   = null;
  
  this.Value = null;
}

function FBX_Parser_ParseModel(i_FileContainer)
{
	var NewModel = new FBX_Model();
 	if(i_FileContainer.HasNext)
  {
    var FirstLine = i_FileContainer.GetNextLine();
    if(FirstLine.length != 5 || FirstLine[0] != "Model:" || FirstLine[4] != "{")
    {
      Debug.Trace("Model: not formatted correctly");
      return null;
    }
    
    NewModel.Number = parseInt(FirstLine[1],10);
    if(isNaN(NewModel.Number))
    {
    	Debug.Trace("The Model's number was NaN");
    	return null;
    }
    
    // Parse the Model Name
    if(FirstLine[2][0] == "\"" && FirstLine[2][FirstLine[2].length -1] == "\"")
    {
      NewModel.Name = FirstLine[2].substring(1, FirstLine[2].length - 1);
      Debug.Trace("Model Name = " + NewModel.Name);
    }
    else
    {
      Debug.Trace("Model Name was formatted incorrectly");
      return null;
    }
    
    // Parse the Model Type
    if(FirstLine[3][0] == "\"" && FirstLine[3][FirstLine[3].length - 1] == "\"")
    {
      NewModel.Type = FirstLine[3].substring(1, FirstLine[3].length - 1);
      Debug.Trace("Model Type = " + NewModel.Type);
    }
    else
    {
    	Debug.Trace("Model Type was formatted incorrectly");
      return null;
    }
  }

  while(i_FileContainer.HasNext)
  {
    var CurrentLine = i_FileContainer.GetNextLine();
    if(CurrentLine[0] == "}")
    {
      // We found the end of the Model
      return NewModel;
    }
    else if(CurrentLine[0] == "Properties70:")
    {
    	// Parse the properties
    	i_FileContainer.StepBack();
      NewModel.Properties = FBX_Parser_ParseProperties70(i_FileContainer);
    }
    else if(CurrentLine[0] == "Version:")
    {
    	NewModel.Version = parseInt(CurrentLine[1], 10);
      if(isNaN(NewModel.Version ))
      {
      	Debug.Trace("The Model's Version was NaN");
      	return null;
      }
    }
		else if(CurrentLine[0] == "MultiLayer:")
    {
    	NewModel.MultiLayer = parseInt(CurrentLine[1], 10);
      if(isNaN(NewModel.MultiLayer))
      {
      	Debug.Trace("The Model's MultiLayer was NaN");
      	return null;
      }
    }
		else if(CurrentLine[0] == "MultiTake:")
    {
    	NewModel.MultiTake = parseInt(CurrentLine[1], 10);
      if(isNaN(NewModel.MultiTake))
      {
      	Debug.Trace("The Model's MultiTake was NaN");
      	return null;
      }
    }
		else if(CurrentLine[0] == "Shading:")
    {
    	NewModel.Shading= CurrentLine[1];
    }
		else if(CurrentLine[0] == "Culling:")
    {
  		if(CurrentLine[1][0] == "\"" && CurrentLine[1][CurrentLine[1].length - 1] == "\"")
      {
        NewModel.Culling = CurrentLine[1].substring(1, CurrentLine[1].length - 1);
        Debug.Trace("Model Culling = " + NewModel.Culling);
      }
      else
      {
      	Debug.Trace("Model Culling was formatted incorrectly");
        return null;
      }
    }
    else
    {
      Debug.Trace("Found Unknown Token in Model: " + CurrentLine[0]);
      return null;
    }
  }
  
  Debug.Trace("Never saw the end bracket for Model:");
  return null;
}
