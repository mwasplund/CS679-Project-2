LoadjsFile("Model/FBX/FBX_Parser.js");
LoadjsFile("Model/Mesh.js");

function Model(i_FilePath)
{
  // Functions
  this.ParseFile = Model_ParseFile;
  this.Draw = Model_Draw;
  
  // Variables
  var NewModel      = this;
  NewModel.Ready    = false;
  NewModel.FilePath = i_FilePath;
  
  // Load the file
  var XMLHttp = CreateXMLHttpRequest();
  XMLHttp.onreadystatechange = function()
  { 
    if (XMLHttp.readyState == 4 &&
        XMLHttp.status == 200)
    {
      Debug.Trace("Model Loaded: " + NewModel.FilePath);
      NewModel.ParseFile(XMLHttp.responseText);
    }
  };
  XMLHttp.open("GET", this.FilePath, true);
  XMLHttp.send();
  Debug.Trace("Loading Model: " + this.FilePath);
}

function Model_ParseFile(i_File)
{
  Debug.Trace("Parsing Model: " + this.FilePath);

  var Parser = new FBX_Parser(i_File);
  if(Parser == null)
  {
    Debug.Trace("There was an error loading the File");
    return null;
  }
  
  if(Parser.Objects == null)
  {
    Debug.Trace("There were no objects found in the FBX file");
    return null;
  }
    
  if(Parser.Objects.GeometryList == null)
  {
    Debug.Trace("There were no Geometries in the FBX Objects");
    return null;
  }
  
  this.Meshes = new Array();
  for(var i = 0; i < Parser.Objects.GeometryList.length; i++)
  {
    var CurrentGeometry = Parser.Objects.GeometryList[i];
    this.Meshes.push(new Mesh(CurrentGeometry.Vertices, CurrentGeometry.Indices));
  }
  
  
  Debug.Trace("Model Parsed");
  this.Ready = true;
}


function Model_Draw()
{
  if(this.Ready)
  {
    for(var i = 0; i < this.Meshes.length; i++)
    {
      this.Meshes[i].Draw();
    }
  }
}