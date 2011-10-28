LoadjsFile("Model/FBX/FBX_Parser.js");
LoadjsFile("Model/Mesh.js");

function Model(i_FileName)
{
  // Functions
  this.ParseFile = Model_ParseFile;
  this.Draw = Model_Draw;
  
  // Variables
  this.Name = i_FileName;
  var NewModel      = this;
  NewModel.Ready    = false;
  
  // Load the file
  NewModel.FilePath = "sceneassets/models/" + i_FileName + ".FBX";
  $.get(NewModel.FilePath,
      function(returned_data)
      {
          Debug.Trace("Model ("+ NewModel.Name +") Loaded: " + NewModel.FilePath);
          NewModel.ParseFile(returned_data);
      });

  Debug.Trace("Loading Model: " + this.FilePath);
}

function Model_ParseFile(i_File)
{
  Debug.Trace("Parsing Model ("+ this.Name +"): " + this.FilePath);

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
  for(var i = 0; i < Parser.Models.length; i++)
  {
    var CurrentModel = Parser.Models[i];

	// Ignore Models that failed to load and models that do not have geometry, i.e. Cameras
	if(CurrentModel != null && CurrentModel.Geometry != null)
	{
    	this.Meshes.push(new Mesh(CurrentModel));
		
	}
  }

 
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