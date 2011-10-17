
function FBX_Objects()
{
  this.GeometryList = new Array();
  this.ModelList = new Array();
  this.TextureList = new Array();
  this.MaterialList = new Array();
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
      if(Model != null)
      {
        Objects.ModelList.push(Model);
      }
      else
      {
        Debug.Trace("There was an error parsing a Model in the Objects:");
        return null;
      }
    }
    else if(CurrentLine[0] == "Texture:")
    {
      Debug.Trace("Found Texture");
      i_FileContainer.StepBack();
      var Texture = FBX_Parser_ParseTexture(i_FileContainer);
      if(Texture != null)
      {
        Objects.TextureList.push(Texture);
      }
      else
      {
        Debug.Trace("There was an error parsing a Texture in the Objects:");
        return null;
      }
    }
    else if(CurrentLine[0] == "Material:")
    {
      Debug.Trace("Found Material");
      i_FileContainer.StepBack();
      var Material = FBX_Parser_ParseMaterial(i_FileContainer);
      if(Material != null)
      {
        Objects.MaterialList.push(Material);
      }
      else
      {
        Debug.Trace("There was an error parsing a Texture in the Objects:");
        return null;
      }
    }
    else
    {
      Debug.Trace("Found Unknown Token in Objects: " + CurrentLine[0]);
      FBX_Parser_HandleUnknownToken(i_FileContainer);
    }
  }
  
  Debug.Trace("Never saw the end bracket for Objects:");
  return null;
}
