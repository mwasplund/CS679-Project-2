// JavaScript Document
LoadjsFile("Model/Layout.js");
LoadjsFile("Model/Model.js");
LoadjsFile("Door.js");
LoadjsFile("SwitchPad.js");


function Object(i_Model,i_Position,i_Orientation)
{
	this.Model = i_Model;
	this.Position = i_Position;
	this.Orientation = i_Orientation;
	//this.Shader = i_Shader;
	this.Draw = Obj_Draw;
}

function Level(i_num)
{
	//Debug.Trace(i_num);
	this.Draw = Level_Draw;
	this.CheckSwitches = Level_CheckSwitches;
	this.ClearSwitches = Level_ClearSwitches;
	this.Number = i_num;
	this.Objects = new Array();
	this.CollisionPlanes = new Array();
	this.Switches = new Array();
	if(this.Number == 1)
	{
	  // Player start 
	  this.PlayerStart_Pos = [15, 50, -15];
	  this.PlayerStart_Rotate = 270;
	
	  // Define the exit plane
	  this.ExitPlane = new Plane([0, 0, -302], [100, 0, -302], [100, 100, -302], [0, 100, -302])
	  this.Objects.push(new Object(GetModel("W300_Bricks"), [0, 0, -350], [0,0,0]));
	
		this.Objects.push(new Object(GetModel("W300_Bricks"), [150, 0, 0],[0,0,0])); //0
		this.CollisionPlanes.push(new Plane([0, 0, 0], [300, 0, 0], [300, 100, 0], [0, 100, 0]));
		this.Objects.push(new Object(GetModel("W300_Bricks"), [300, 0, -150],[0,90,0])); //0
		this.CollisionPlanes.push(new Plane([300, 0, 0], [300, 0, -300], [300, 100, -300], [300, 100, 0]));
		this.Objects.push(new Object(GetModel("W300_Bricks"), [0, 0, -150],[0,90,0])); //0
		this.CollisionPlanes.push(new Plane([0, 0, 0], [0, 0, -300], [0, 100, -300], [0, 100, 0]));
		this.Objects.push(new Object(GetModel("W200_Bricks"), [200, 0, -300],[0,0,0])); //0
	  this.CollisionPlanes.push(new Plane([100, 0, -300], [300, 0, -300], [300, 100, -300], [100, 100, -300]));
   
    // Add the floor and roof
    this.Objects.push(new Object(GetModel("F300_300_Bricks"), [150,0,-150], [0,0,0]));
    this.Objects.push(new Object(GetModel("F300_300_Bricks"), [150,100,-150], [0,0,0]));


    // Add some pretty lamps
    this.Objects.push(new Object(GetModel("Lamp"), [5,50,-5], [0,0,0]));
    this.Objects.push(new Object(GetModel("Lamp"), [300-5,50,-5], [0,0,0]));
    this.Objects.push(new Object(GetModel("Lamp"), [5,50,-300+5], [0,0,0]));
    this.Objects.push(new Object(GetModel("Lamp"), [300-5,50,-300+5], [0,0,0]));


    this.Switches.push(new SwitchPad(
      new Object(GetModel("SwitchPad"), [200, 0, -200], [0,0,0]),
      new Sphere([200, this.PlayerStart_Pos[1], -200], 15.0),
      new Door(
        new Object(GetModel("W100_Bricks_Exit"), [50, 0, -300], [0,0,0]),
        new Plane([0, 0, -300], [100, 0, -300], [100, 100, -300], [0, 100, -300])
      )
    ));
    
	
	  // Add all the doors to the collision Planes
	  for(var i = 0; i < this.Switches.length; i++)
    	this.CollisionPlanes.push(this.Switches[i].door.collisionPlane);
	}
	else if(this.Number == 2)
	{
		// Player start 
		  this.PlayerStart_Pos = [15, 50, -15];
		  this.PlayerStart_Rotate = 270;
		
		  // Define the exit plane
		  this.ExitPlane = new Plane([0, 0, -302], [100, 0, -302], [100, 100, -302], [0, 100, -302])
		  this.Objects.push(new Object(GetModel("W300_Bricks"), [0, 0, -350], [0,0,0]));
		
		this.Objects.push(new Object(GetModel("W600"), [300, 0, 0],[0,0,0])); //0
		this.Objects.push(new Object(GetModel("W700"), [0, 0, -350],[0,90,0])); // 1
		this.Objects.push(new Object(GetModel("W700"), [700, 0, -350],[0,90,0])); //2
		
		this.Objects.push(new Object(GetModel("W300"), [350, 0, -150],[0,90,0])); //3
		
		this.Objects.push(new Object(GetModel("W150"), [625, 0, -90],[0,0,0])); //4
		this.Objects.push(new Object(GetModel("W150"), [500, 0, -180],[0,0,0]));//5
		this.Objects.push(new Object(GetModel("W70"), [425, 0, -215],[0,90,0])); //6
		
		this.Objects.push(new Object(GetModel("W150"), [625, 0, -280],[0,0,0]));  //7
		this.Objects.push(new Object(GetModel("W300"), [500, 0, -350],[0,90,0]));  //8
		this.Objects.push(new Object(GetModel("W300"), [350, 0, -400],[0,0,0]));  //9
		
		this.Objects.push(new Object(GetModel("W70"), [200, 0, -365],[0,90,0]));  //10
		this.Objects.push(new Object(GetModel("W200"), [100, 0, -330],[0,0,0]));  //11
		this.Objects.push(new Object(GetModel("W150"), [200, 0, -180],[0,0,0]));  //12
		this.Objects.push(new Object(GetModel("W70"), [275, 0, -215],[0,90,0]));  //13
		this.Objects.push(new Object(GetModel("W150"), [75, 0, -90],[0,0,0]));  //14
		
		this.Objects.push(new Object(GetModel("W70"), [100, 0, -400],[0,0,0]));  //15
		this.Objects.push(new Object(GetModel("W150"), [135, 0, -475],[0,90,0]));  //16
		this.Objects.push(new Object(GetModel("W150"), [65, 0, -550],[0,90,0]));  //17
		this.Objects.push(new Object(GetModel("W200"), [165, 0, -625],[0,0,0]));  //18
		
		this.Objects.push(new Object(GetModel("W70"), [265, 0, -590],[0,90,0]));  //19
		this.Objects.push(new Object(GetModel("W70"), [230, 0, -555],[0,0,0]));  //20
		this.Objects.push(new Object(GetModel("W200"), [400, 0, -500],[0,0,0]));  //21
		
		this.Objects.push(new Object(GetModel("W50"), [525, 0, -500],[0,0,0]));  //22
		this.Objects.push(new Object(GetModel("W70"), [550, 0, -535],[0,90,0]));  //23
		this.Objects.push(new Object(GetModel("W300"), [640, 0, -550],[0,90,0]));  //24
		this.Objects.push(new Object(GetModel("W70"), [605, 0, -400],[0,0,0]));  //25
		
		this.Objects.push(new Object(GetModel("W70"), [310, 0, -665],[0,90,0]));  //26
		this.Objects.push(new Object(GetModel("W70"), [400, 0, -665],[0,90,0]));  //27
		this.Objects.push(new Object(GetModel("W150"), [470, 0, -630],[0,0,0]));  //28
		
		this.Objects.push(new Object(GetModel("W600"), [400, 0, -700],[0,0,0]));  //28
		
		
	}
	else if(this.Number == 3)
	{
	  // Player start
	  this.PlayerStart_Pos = [15, 50, 15];
	  this.PlayerStart_Rotate = 315;
	
	  // Define the exit plane
	  this.ExitPlane = new Plane([0, 0, 202], [100, 0, 202], [100, 100, 202], [0, 100, 202])
	  	
	  // Wall 0
		this.Objects.push(new Object(GetModel("W500_Bricks"), [0, 0, 250],[0,90,0]));
		this.CollisionPlanes.push(new Plane([0, 0, 0], [0, 0, 500], [0, 100, 500], [0, 100, 0]));
    // Wall 1
    this.Objects.push(new Object(GetModel("W500_Bricks"), [350, 0, 200],[0,0,0]));
		this.CollisionPlanes.push(new Plane([100, 0, 200], [600, 0, 200], [600, 100, 200], [100, 100, 200]));
    // Wall 2
    this.Objects.push(new Object(GetModel("W600_Bricks"), [600, 0, -100],[0,90,0]));
		this.CollisionPlanes.push(new Plane([600, 0, 200], [600, 0, -400], [600, 100, -400], [600, 100, 200]));
    // Wall 3
    this.Objects.push(new Object(GetModel("W400_Bricks"), [200, 0, 0],[0,0,0]));
		this.CollisionPlanes.push(new Plane([-5, 0, 0], [405, 0, 0], [405, 100, 0], [-5, 100, 0]));
    // Wall 4
    this.Objects.push(new Object(GetModel("W200_Bricks"), [400, 0, -100],[0,90,0]));
		this.CollisionPlanes.push(new Plane([400, 0, 5], [400, 0, -205], [400, 100, -205], [400, 100, 5]));
    // Wall 5
    this.Objects.push(new Object(GetModel("W800_Bricks"), [200, 0, -400],[0,0,0]));
		this.CollisionPlanes.push(new Plane([600, 0, -400], [600, 100, -400], [-200, 100, -400], [-200, 0, -400]));
    // Wall 6
    this.Objects.push(new Object(GetModel("W400_Bricks"), [200, 0, -200],[0,0,0]));
		this.CollisionPlanes.push(new Plane([0, 0, -200], [405, 0, -200], [405, 100, -200], [0, 100, -200]));
    // Wall 7
    this.Objects.push(new Object(GetModel("W600_Bricks"), [-200, 0, -100],[0,90,0]));
		this.CollisionPlanes.push(new Plane([-200, 0, 200], [-200, 100, 200], [-200, 100, -400], [-200, 0, -400]));
    // Wall 8
    this.Objects.push(new Object(GetModel("W1000_Bricks"), [100, 0, 400],[0,0,0]));
		this.CollisionPlanes.push(new Plane([-400, 0, 400], [-400, 100, 400], [600, 100, 400], [600, 0, 400]));
    // Wall 9
    this.Objects.push(new Object(GetModel("W700_Bricks"), [-400, 0, 50],[0,90,0]));
		this.CollisionPlanes.push(new Plane([-400, 0, 400], [-400, 100, 400], [-400, 100, -300], [-400, 0, -300]));
    // Wall 10
    this.Objects.push(new Object(GetModel("W282_Bricks"), [-300, 0, -500],[0,-45,0]));
		this.CollisionPlanes.push(new Plane([-200, 0, -400], [-200, 100, -400], [-400, 100, -600], [-400, 0, -600]));
    // Wall 11
    this.Objects.push(new Object(GetModel("W282_Bricks"), [-500, 0, -500],[0,45,0]));
		this.CollisionPlanes.push(new Plane([-600, 0, -400], [-600, 100, -400], [-400, 100, -600], [-400, 0, -600]));
    // Wall 12
    this.Objects.push(new Object(GetModel("W400_Bricks"), [-600, 0, -200],[0,90,0]));
		this.CollisionPlanes.push(new Plane([-600, 0, 5], [-600, 100, 5], [-600, 100, -400], [-600, 0, -400]));
    // Wall 13
    this.Objects.push(new Object(GetModel("W400_Bricks"), [-800, 0, 0],[0,0,0]));
		this.CollisionPlanes.push(new Plane([-595, 0, 0], [-595, 100, 0], [-1000, 100, 0], [-1000, 0, 0]));
    // Wall 14
    this.Objects.push(new Object(GetModel("W200_Bricks"), [-1000, 0, 100],[0,90,0]));
		this.CollisionPlanes.push(new Plane([-1000, 0, 0], [-1000, 100, 0], [-1000, 100, 200], [-1000, 0, 200]));
    // Wall 15
    this.Objects.push(new Object(GetModel("W600_Bricks"), [-700, 0, 200],[0,0,0]));
		this.CollisionPlanes.push(new Plane([-400, 0, 200], [-400, 100, 200], [-1000, 100, 200], [-1000, 0, 200]));


    // Add the floor and roof
    this.Objects.push(new Object(GetModel("F1600_1000_Bricks"), [-200,0,-100], [0,0,0]));
    this.Objects.push(new Object(GetModel("F1600_1000_Bricks"), [-200,100,-100], [0,0,0]));


    // Add some pretty lamps
    this.Objects.push(new Object(GetModel("Lamp"), [5,50,-5], [0,0,0]));
    this.Objects.push(new Object(GetModel("Lamp"), [300-5,50,-5], [0,0,0]));
    this.Objects.push(new Object(GetModel("Lamp"), [5,50,-300+5], [0,0,0]));
    this.Objects.push(new Object(GetModel("Lamp"), [300-5,50,-300+5], [0,0,0]));

    // Door 1 Sitch
    this.Switches.push(new SwitchPad(
      new Object(GetModel("SwitchPad"), [500, 0, 100], [0,0,0]),
      new Sphere([500, this.PlayerStart_Pos[1], 100], 15.0),
      new Door(
        new Object(GetModel("W200_Bricks"), [500, 0, -200], [0,0,0]),
        new Plane([400, 0, -200], [600, 0, -200], [600, 100, -200], [400, 100, -200])
      )
    ));

    // Exit Sitch
    this.Switches.push(new SwitchPad(
      new Object(GetModel("SwitchPad"), [-900, 0, 100], [0,0,0]),
      new Sphere([-900, this.PlayerStart_Pos[1], 100], 15.0),
      new Door(
        new Object(GetModel("W100_Bricks_Exit"), [50, 0, 200], [0,0,0]),
        new Plane([0, 0, 200], [100, 0, 200], [100, 100, 200], [0, 100, 200])
      )
    ));
    
	
	// Add all the doors to the collision Planes
	for(var i = 0; i < this.Switches.length; i++)
    	this.CollisionPlanes.push(this.Switches[i].door.collisionPlane);
	}

}

function Level_ClearSwitches()
{
	for(var i = 0; i < this.Switches.length; i++)
  		this.Switches[i].stepOff();
}

function Level_CheckSwitches(i_BoundingSphere)
{
	for(var i = 0; i < this.Switches.length; i++)
	{
		  var CollisionDirection = checkSphereSphereCollision(i_BoundingSphere, this.Switches[i].boundingSphere);
		  if(CollisionDirection != null)
		  {
			$("#Collision").val("HIT: Switch " + i);
			this.Switches[i].stepOn();
		  }
	}
}

function Level_Draw(i_ShaderProgram)
{

	// Draw all the Game Objects
	for(var i = 0; i < this.Objects.length; i++)
		this.Objects[i].Draw();
	
	// Draw all the Switches
	// Draw Doors/Switches last because they might be see through
	for(var i = 0; i < this.Switches.length; i++)
		this.Switches[i].Draw();
}

function Obj_Draw()
{
		mvPushMatrix();
		mat4.translate(mvMatrix,  this.Position);
		mat4.rotate(mvMatrix, degToRad(this.Orientation[0]), [1, 0, 0]);
		mat4.rotate(mvMatrix, degToRad(this.Orientation[1]), [0, 1, 0]);
		mat4.rotate(mvMatrix, degToRad(this.Orientation[2]), [0, 0, 1]);
		this.Model.Draw(CurrentShader.Program);
		mvPopMatrix();
}
