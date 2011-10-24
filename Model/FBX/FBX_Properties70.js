function FBX_Property()
{
  this.Name = null;
  this.Type = null;
  this.Type = null;
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
      if(CurrentLine.length < 5)
      {
      	Debug.Trace("Properties70: P: must be at least 5 values");
      	return null;
      }
      
      var NewProperty = new FBX_Property();
       
      // Parse the Property Name
      if(CurrentLine[1][0] == "\"" && CurrentLine[1][CurrentLine[1].length -1] == "\"")
      {
        NewProperty.Name = CurrentLine[1].substring(1, CurrentLine[1].length - 1);
        //Debug.Trace("Property Name = " + NewProperty.Name);
      }
      else
      {
        Debug.Trace("Property Name was formated incorrectly");
        return null;
      }
			// Parse the Property Type
      if(CurrentLine[2][0] == "\"" && CurrentLine[2][CurrentLine[2].length -1] == "\"")
      {
        NewProperty.Type = CurrentLine[2].substring(1, CurrentLine[2].length - 1);
        //Debug.Trace("Property Type = " + NewProperty.Type);
      }
      else
      {
        Debug.Trace("Property Type was formated incorrectly");
        return null;
      }
			// Parse the Property More1
      if(CurrentLine[3][0] == "\"" && CurrentLine[3][CurrentLine[3].length -1] == "\"")
      {
        NewProperty.More1 = CurrentLine[3].substring(1, CurrentLine[3].length - 1);
        //Debug.Trace("Property More1 = " + NewProperty.More1);
      }
      else
      {
        Debug.Trace("Property More1 was formated incorrectly");
        return null;
      }
			// Parse the Property More2
      if(CurrentLine[4][0] == "\"" && CurrentLine[4][CurrentLine[4].length -1] == "\"")
      {
        NewProperty.More2 = CurrentLine[4].substring(1, CurrentLine[4].length - 1);
        //Debug.Trace("Property More2 = " + NewProperty.More2);
      }
      else
      {
        Debug.Trace("Property More2 was formated incorrectly");
        return null;
      }

			switch(NewProperty.Type)
			{
				case "Vector3D":
				{
					NewProperty.Value = FBX_Parser_ParsePropertyAsVector3D(CurrentLine);
					break;
				}
				case "Lcl Translation":
				{
					NewProperty.Value = FBX_Parser_ParsePropertyAsVector3D(CurrentLine);
					break;
				}
				case "Lcl Rotation":
				{
					NewProperty.Value = FBX_Parser_ParsePropertyAsVector3D(CurrentLine);
					break;
				}
				case "Lcl Scaling":
				{
					NewProperty.Value = FBX_Parser_ParsePropertyAsVector3D(CurrentLine);
					break;
				}
				default:
				{
					//Debug.Trace("We do not know how to parse this type of property");
					break;
				}
			}
			
			Properties.push(NewProperty);
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

function FBX_Parser_ParsePropertyAsVector3D(i_Line)
{
	if(i_Line.length != 8)
	{
		Debug.Trace("The vector 3D property was formated incorrectly");
		return null;
	}

	var X = parseFloat(i_Line[5]);
	var Y = parseFloat(i_Line[6]);
	var Z = parseFloat(i_Line[7]);
	if(isNaN(X) || isNaN(Y) || isNaN(Z))
	{
		Debug.Trace("The Vector 3D property was (" + X + ", " + Y + ", " + Z + ")");
		return null;
	}
	
	return vec3.create([X, Y, Z]);
}


