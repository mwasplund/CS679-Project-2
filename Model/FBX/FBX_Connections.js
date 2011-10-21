
function FBX_Connection(i_Line)
{
	if(i_Line[0] != "C:" || i_Line.length < 4)
		throw "The Connection was not formated correctly.";
		
	if(i_Line[1][0] == "\"" && i_Line[1][i_Line[1].length - 1] == "\"")
    this.Type = i_Line[1].substring(1, i_Line[1].length - 1);
  else
   	throw "There was an error parsing the Connection type.";
   	
	this.Destination = parseInt(i_Line[2], 10);
	this.Origin = parseInt(i_Line[3], 10);
	if(i_Line.length > 4)
	{
  	if(i_Line[4][0] == "\"" && i_Line[4][i_Line[4].length - 1] == "\"")
      this.Property = i_Line[4].substring(1, i_Line[4].length - 1);
    else
     	throw "There was an error parsing the Connection value.";
	}
	else
	{
		this.Property = null;
	}
	
	//Debug.Trace("Found Connection");
}

function FBX_Parser_ParseConnections(i_FileContainer)
{
	var Connections = new Array();
 	if(i_FileContainer.HasNext)
  {
    var FirstLine = i_FileContainer.GetNextLine();
    if(FirstLine.length != 2 || FirstLine[0] != "Connections:" || FirstLine[1] != "{")
      throw "Connections: not formatted correctly";
  }

  while(i_FileContainer.HasNext)
  {
    var CurrentLine = i_FileContainer.GetNextLine();
    if(CurrentLine[0] == "}")
    {
      // We found the end of the Connections
      return Connections;
    }
    else if(CurrentLine[0] == "C:")
    {
    	// Parse the Connection
    	Connections.push(new FBX_Connection(CurrentLine));
    }
    else
    {
      Debug.Trace("Found Unknown Token in Connections: " + CurrentLine[0]);
      return null;
    }
  }
  
  Debug.Trace("Never saw the end bracket for Connections:");
  return null;
}
