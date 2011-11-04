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
	this.numAlottedClones = 1;


	if(this.Number == 1)
	{
	  // Set number of available clones
	  this.numAlottedClones = 1;

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
	     // Set number of available clones
       	     this.numAlottedClones = 1;


		// Player start 
		//  this.PlayerStart_Pos = [15, 50, -15];
		  this.PlayerStart_Pos = [15, 80, -685];
		  this.PlayerStart_Rotate = 270;
		
		  // Define the exit plane
		  //this.ExitPlane = new Plane([0, 0, -302], [100, 0, -302], [100, 100, -302], [0, 100, -302]);
		//  this.ExitPlane = new Plane([0, 0, -302], [0, 100, -302], [100, 100, -302], [100, 100, -302]);
		 // this.Objects.push(new Object(GetModel("W300_Bricks"), [0, 0, -350], [0,0,0]));
		  
		//Entrance
		  
		this.Objects.push(new Object(GetModel("W100_Bricks"), [50, 0, -700],[0,0,0])); //0
		this.CollisionPlanes.push(new Plane([0, 0, -700], [0, 100,-700], [100, 100, -700], [100, 0, -700]));
		//Exit
		this.Objects.push(new Object(GetModel("W100_Bricks_Exit"), [650, 0, 0],[0,0,0])); //0
		this.ExitPlane = new Plane([600, 0, 0], [600, 100, 0], [700, 100, 0], [700, 100, 0]);
		
		this.Objects.push(new Object(GetModel("W600_Bricks"), [300, 0, 0],[0,0,0])); //0
		this.CollisionPlanes.push(new Plane([0, 0, 0], [0, 100, 0], [600, 100, 0], [600, 0, 0]));
		
		this.Objects.push(new Object(GetModel("W700_Bricks"), [0, 0, -350],[0,90,0])); // 1
		this.CollisionPlanes.push(new Plane([0, 0, -700], [0, 100, -700], [0, 100, 0], [0, 0, 0]));
		
		this.Objects.push(new Object(GetModel("W700_Bricks"), [700, 0, -350],[0,90,0])); //2
		this.CollisionPlanes.push(new Plane([700, 0, -700], [700, 100, -700], [700, 100, 0], [700, 0, 0]));
		
		this.Objects.push(new Object(GetModel("W300_Bricks"), [350, 0, -150],[0,90,0])); //3
		this.CollisionPlanes.push(new Plane([350, 0, -300], [350, 100, -300], [350, 100, 0], [350, 0, 0]));
		
		this.Objects.push(new Object(GetModel("W150_Bricks"), [625, 0, -90],[0,0,0])); //4
		this.CollisionPlanes.push(new Plane([550, 0, -90], [550, 100, -90], [700, 100, -90], [700, 0, -90]));
		
		this.Objects.push(new Object(GetModel("W150_Bricks"), [500, 0, -180],[0,0,0]));//5
		this.CollisionPlanes.push(new Plane([575, 0, -180], [575, 100, -180], [425, 100, -180], [425, 0, -180]));
		
		this.Objects.push(new Object(GetModel("W70_Bricks"), [425, 0, -215],[0,90,0])); //6
		this.CollisionPlanes.push(new Plane([425, 0, -250], [425, 100, -250], [425, 100, -180], [425, 0, -180]));
		
		this.Objects.push(new Object(GetModel("W150_Bricks"), [625, 0, -280],[0,0,0]));  //7
		this.CollisionPlanes.push(new Plane([550, 0, -280], [550, 100, -280], [700, 100, -280], [700, 0, -280]));
		
		this.Objects.push(new Object(GetModel("W300_Bricks"), [500, 0, -350],[0,90,0]));  //8
		this.CollisionPlanes.push(new Plane([500, 0, -200], [500, 100, -200], [500, 100, -500], [500, 0, -500]));
		
		this.Objects.push(new Object(GetModel("W300_Bricks"), [350, 0, -400],[0,0,0]));  //9
		this.CollisionPlanes.push(new Plane([200, 0, -400], [200, 100, -400], [500, 100, -400], [500, 0, -400]));
		
		this.Objects.push(new Object(GetModel("W70_Bricks"), [200, 0, -365],[0,90,0]));  //10
		this.CollisionPlanes.push(new Plane([200, 0, -330], [200, 100, -330], [200, 100, -400], [200, 0, -400]));
		
		this.Objects.push(new Object(GetModel("W200_Bricks"), [100, 0, -330],[0,0,0]));  //11
		this.CollisionPlanes.push(new Plane([200, 0, -330], [200, 100, -330], [0, 100, -330], [0, 0, -330]));
		
		this.Objects.push(new Object(GetModel("W150_Bricks"), [200, 0, -180],[0,0,0]));  //12
		this.CollisionPlanes.push(new Plane([275, 0, -180], [275, 100, -180], [125, 100, -180], [125, 0, -180]));
		
		this.Objects.push(new Object(GetModel("W70_Bricks"), [275, 0, -215],[0,90,0]));  //13
		this.CollisionPlanes.push(new Plane([275, 0, -250], [275, 100, -250], [275, 100, -180], [275, 0, -180]));
		
		this.Objects.push(new Object(GetModel("W150_Bricks"), [75, 0, -90],[0,0,0]));  //14
		this.CollisionPlanes.push(new Plane([0, 0, -90], [0, 100, -90], [150, 100, -90], [150, 0, -90]));
		
		this.Objects.push(new Object(GetModel("W70_Bricks"), [100, 0, -400],[0,0,0]));  //15
		this.CollisionPlanes.push(new Plane([135, 0, -400], [135, 100, -400], [65, 100, -400], [65, 0, -400]));
		
		this.Objects.push(new Object(GetModel("W150_Bricks"), [135, 0, -475],[0,90,0]));  //16
		this.CollisionPlanes.push(new Plane([135, 0, -550], [135, 100, -550], [135, 100, -400], [135, 0, -400]));
		
		this.Objects.push(new Object(GetModel("W150_Bricks"), [65, 0, -550],[0,90,0]));  //17
		this.CollisionPlanes.push(new Plane([65, 0, -475], [65, 100, -475], [65, 100, -625], [65, 0, -625]));
		
		this.Objects.push(new Object(GetModel("W200_Bricks"), [165, 0, -625],[0,0,0]));  //18
		this.CollisionPlanes.push(new Plane([265, 0, -625], [265, 100, -625], [65, 100, -625], [65, 0, -625]));
		
		this.Objects.push(new Object(GetModel("W70_Bricks"), [265, 0, -590],[0,90,0]));  //19
		this.CollisionPlanes.push(new Plane([265, 0, -555], [265, 100, -555], [265, 100, -625], [265, 0, -625]));
		
		this.Objects.push(new Object(GetModel("W70_Bricks"), [230, 0, -555],[0,0,0]));  //20
		this.CollisionPlanes.push(new Plane([195, 0, -555], [195, 100, -555], [265, 100, -555], [265, 0, -555]));
		
		this.Objects.push(new Object(GetModel("W200_Bricks"), [400, 0, -500],[0,0,0]));  //21
		this.CollisionPlanes.push(new Plane([300, 0, -500], [300, 100, -500], [500, 100, -500], [500, 0, -500]));
		
		this.Objects.push(new Object(GetModel("W50_Bricks"), [525, 0, -500],[0,0,0]));  //22
		this.CollisionPlanes.push(new Plane([500, 0, -500], [500, 100, -500], [550, 100, -500], [550, 0, -500]));
		
		this.Objects.push(new Object(GetModel("W70_Bricks"), [550, 0, -535],[0,90,0]));  //23
		this.CollisionPlanes.push(new Plane([550, 0, -500], [550, 100, -500], [550, 100, -570], [550, 0, -570]));
		
		this.Objects.push(new Object(GetModel("W300_Bricks"), [640, 0, -550],[0,90,0]));  //24
		this.CollisionPlanes.push(new Plane([640, 0, -400], [640, 100, -400], [640, 100, -600], [640, 0, -600]));
		
		this.Objects.push(new Object(GetModel("W70_Bricks"), [605, 0, -400],[0,0,0]));  //25
		this.CollisionPlanes.push(new Plane([640, 0, -400], [640, 100, -400], [570, 100, -400], [570, 0, -400]));
		
		this.Objects.push(new Object(GetModel("W70_Bricks"), [310, 0, -665],[0,90,0]));  //26
		this.CollisionPlanes.push(new Plane([310, 0, -630], [310, 100, -630], [310, 100, -700], [310, 0, -700]));
		
		this.Objects.push(new Object(GetModel("W70_Bricks"), [400, 0, -665],[0,90,0]));  //27
		this.CollisionPlanes.push(new Plane([400, 0, -630], [400, 100, -630], [400, 100, -700], [400, 0, -700]));
		
		this.Objects.push(new Object(GetModel("W150_Bricks"), [470, 0, -630],[0,0,0]));  //28
		this.CollisionPlanes.push(new Plane([395, 0, -630], [395, 100, -630], [545, 100, -630], [545, 0, -630]));
		
		this.Objects.push(new Object(GetModel("W600_Bricks"), [400, 0, -700],[0,0,0]));  //28
		this.CollisionPlanes.push(new Plane([700, 0, -700], [700, 100, -700], [100, 100, -700], [100, 0, -700]));
		
		
	}
	else if(this.Number == 3)
	{
	  // Set number of available clones
	  this.numAlottedClones = 1;

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
    this.Objects.push(new Object(GetModel("Lamp"), [15,50,-5], [0,0,0]));
    this.Objects.push(new Object(GetModel("Lamp"), [300-5,50,-5], [0,0,0]));
	
	this.Objects.push(new Object(GetModel("Lamp"), [15,50,+5], [0,0,0]));
    this.Objects.push(new Object(GetModel("Lamp"), [300-5,50,+5], [0,0,0]));
	
    this.Objects.push(new Object(GetModel("Lamp"), [15,50,-200+5], [0,0,0]));
    this.Objects.push(new Object(GetModel("Lamp"), [300-5,50,-200+5], [0,0,0]));

	this.Objects.push(new Object(GetModel("Lamp"), [15,50,-200-5], [0,0,0]));
    this.Objects.push(new Object(GetModel("Lamp"), [300-5,50,-200-5], [0,0,0]));
	
	this.Objects.push(new Object(GetModel("Lamp"), [15,50,-400+5], [0,0,0]));
    this.Objects.push(new Object(GetModel("Lamp"), [300-5,50,-400+5], [0,0,0]));
	
	this.Objects.push(new Object(GetModel("Lamp"), [-200-5,50,0], [0,0,0]));
	this.Objects.push(new Object(GetModel("Lamp"), [-200+5,50,0], [0,0,0]));
	this.Objects.push(new Object(GetModel("Lamp"), [-400-5,50,0], [0,0,0]));
	this.Objects.push(new Object(GetModel("Lamp"), [-400+5,50,0], [0,0,0]));
	
	this.Objects.push(new Object(GetModel("Lamp"), [-200,50,400-5], [0,0,0]));
	
	this.Objects.push(new Object(GetModel("Lamp"), [-800,50,0+5], [0,0,0]));
	this.Objects.push(new Object(GetModel("Lamp"), [-800,50,200-5], [0,0,0]));
	
    // Door 1 Switch
    this.Switches.push(new SwitchPad(
      new Object(GetModel("SwitchPad"), [500, 0, 100], [0,0,0]),
      new Sphere([500, this.PlayerStart_Pos[1], 100], 15.0),
      new Door(
        new Object(GetModel("W200_Bricks"), [500, 0, -200], [0,0,0]),
        new Plane([400, 0, -200], [600, 0, -200], [600, 100, -200], [400, 100, -200])
      )
    ));

    // Exit Switch
    this.Switches.push(new SwitchPad(
      new Object(GetModel("SwitchPad"), [-900, 0, 100], [0,0,0]),
      new Sphere([-900, this.PlayerStart_Pos[1], 100], 15.0),
      new Door(
        new Object(GetModel("W100_Bricks_Exit"), [50, 0, 200], [0,180,0]),
        new Plane([0, 0, 200], [100, 0, 200], [100, 100, 200], [0, 100, 200])
      )
    ));
    
	
		// Add all the doors to the collision Planes
		for(var i = 0; i < this.Switches.length; i++)
    		this.CollisionPlanes.push(this.Switches[i].door.collisionPlane);
	}
	else if(this.Number == 4) //CURRENTLY A COPY OF LEVEL ONE. FEEL FREE TO USE AS BASE CODE FOR YOUR LEVEL
	{
		// Set number of available clones
		this.numAlottedClones = 1;

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
	

		this.Switches.push(
			new SwitchPad(
				new Object(GetModel("SwitchPad"), [200, 0, -200], [0,0,0]),
				new Sphere([200, this.PlayerStart_Pos[1], -200], 15.0),
				new Door(
					new Object(GetModel("W100_Bricks_Exit"), [50, 0, -300], [0,0,0]),
					new Plane([0, 0, -300], [100, 0, -300], [100, 100, -300], [0, 100, -300])
				)
			)
		);
    
	
		// Add all the doors to the collision Planes
		for(var i = 0; i < this.Switches.length; i++)
			this.CollisionPlanes.push(this.Switches[i].door.collisionPlane);

	}
	else if(this.Number == 5)//CURRENTLY A COPY OF LEVEL ONE. FEEL FREE TO USE AS BASE CODE FOR YOUR LEVEL
	{
		// Set number of available clones
		this.numAlottedClones = 1;

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
	

		this.Switches.push(
			new SwitchPad(
				new Object(GetModel("SwitchPad"), [200, 0, -200], [0,0,0]),
				new Sphere([200, this.PlayerStart_Pos[1], -200], 15.0),
				new Door(
					new Object(GetModel("W100_Bricks_Exit"), [50, 0, -300], [0,0,0]),
					new Plane([0, 0, -300], [100, 0, -300], [100, 100, -300], [0, 100, -300])
				)
			)
		);
    
	
		// Add all the doors to the collision Planes
		for(var i = 0; i < this.Switches.length; i++)
			this.CollisionPlanes.push(this.Switches[i].door.collisionPlane);

	}
	else if(this.Number == 6)//CURRENTLY A COPY OF LEVEL ONE. FEEL FREE TO USE AS BASE CODE FOR YOUR LEVEL
	{
		// Set number of available clones
		this.numAlottedClones = 1;

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
	

		this.Switches.push(
			new SwitchPad(
				new Object(GetModel("SwitchPad"), [200, 0, -200], [0,0,0]),
				new Sphere([200, this.PlayerStart_Pos[1], -200], 15.0),
				new Door(
					new Object(GetModel("W100_Bricks_Exit"), [50, 0, -300], [0,0,0]),
					new Plane([0, 0, -300], [100, 0, -300], [100, 100, -300], [0, 100, -300])
				)
			)
		);
    
	
		// Add all the doors to the collision Planes
		for(var i = 0; i < this.Switches.length; i++)
			this.CollisionPlanes.push(this.Switches[i].door.collisionPlane);

	}
	else if(this.Number == 7)
	{
	//PUT LEVEL 5 CODE HERE
	}
	else if(this.Number == 8)
	{
		//ETC...
	}
		else if(this.Number == 4)
	{
	  // Player start
	  this.PlayerStart_Pos = [-15, 50, -15];
	  this.PlayerStart_Rotate = 120;
	
	  // Define the exit plane
	  this.ExitPlane = new Plane([-200, 0, -702], [-200, 100, -702], [-400, 100, -702], [-400, 0, -702])
	  
	  	
	  // Wall 0
		this.Objects.push(new Object(GetModel("W500_Bricks"), [-250, 0, 0],[0,0,0]));
		this.CollisionPlanes.push(new Plane([0, 0, 0], [0, 100, 0], [-505, 100, 0], [-505, 0, 0]));
    // Wall 1
		this.Objects.push(new Object(GetModel("W200_Bricks"), [0, 0, -100],[0,90,0]));
		this.CollisionPlanes.push(new Plane([0, 0, 0], [0, 100, 0], [0, 100, -200], [0, 0, -200]));
    // Wall 2
		this.Objects.push(new Object(GetModel("W300_Bricks"), [-500, 0, 150],[0,90,0]));
    this.CollisionPlanes.push(new Plane([-500, 0, -5], [-500, 100, -5], [-500, 100, 300], [-500, 0, 300]));
    // Wall 3
		this.Objects.push(new Object(GetModel("W200_Bricks"), [-600, 0, 300],[0,0,0]));
    this.CollisionPlanes.push(new Plane([-500, 0, 300], [-500, 100, 300], [-700, 100, 300], [-700, 0, 300]));
    // Wall 4
		this.Objects.push(new Object(GetModel("W500_Bricks"), [-700, 0, 50],[0,90,0]));
    this.CollisionPlanes.push(new Plane([-700, 0, 300], [-700, 100, 300], [-700, 100, -205], [-700, 0, -205]));
    // Wall 5
		this.Objects.push(new Object(GetModel("W200_Bricks"), [-500, 0, -300],[0,90,0]));
    this.CollisionPlanes.push(new Plane([-500, 0, -195], [-500, 100, -195], [-500, 100, -400], [-500, 0, -400]));
    // Wall 6
		this.Objects.push(new Object(GetModel("W400_Bricks"), [-700, 0, -400],[0,0,0]));
    this.CollisionPlanes.push(new Plane([-500, 0, -400], [-500, 100, -400], [-905, 100, -400], [-905, 0, -400]));
    // Wall 7
		this.Objects.push(new Object(GetModel("W100_Bricks"), [-900, 0, -450],[0,90,0]));
    this.CollisionPlanes.push(new Plane([-900, 0, -395], [-900, 100, -395], [-900, 100, -505], [-900, 0, -505]));
    // Wall 8
		this.Objects.push(new Object(GetModel("W300_Bricks"), [-1100, 0, -350],[0,90,0]));
    this.CollisionPlanes.push(new Plane([-1100, 0, -200], [-1100, 100, -200], [-1100, 100, -505], [-1100, 0, -505]));
    // Wall 9
		this.Objects.push(new Object(GetModel("W400_Bricks"), [-900, 0, -200],[0,0,0]));
    this.CollisionPlanes.push(new Plane([-695, 0, -200], [-695, 100, -200], [-1100, 100, -200], [-1100, 0, -200]));
    // Wall 10
		this.Objects.push(new Object(GetModel("W200_Bricks"), [-1200, 0, -500],[0,0,0]));
    this.CollisionPlanes.push(new Plane([-1095, 0, -500], [-1095, 100, -500], [-1300, 100, -500], [-1300, 0, -500]));
    // Wall 11
		this.Objects.push(new Object(GetModel("W200_Bricks"), [-1300, 0, -600],[0,90,0]));
    this.CollisionPlanes.push(new Plane([-1300, 0, -500], [-1300, 100, -500], [-1300, 100, -700], [-1300, 0, -700]));
    // Wall 12
		this.Objects.push(new Object(GetModel("W900_Bricks"), [-850, 0, -700],[0,0,0]));
    this.CollisionPlanes.push(new Plane([-1300, 0, -700], [-1300, 100, -700], [-400, 100, -700], [-400, 0, -700]));
    // Wall 13
		this.Objects.push(new Object(GetModel("W500_Bricks"), [-650, 0, -500],[0,0,0]));
    this.CollisionPlanes.push(new Plane([-400, 0, -500], [-400, 100, -500], [-905, 100, -500], [-905, 0, -500]));
    // Wall 14
		this.Objects.push(new Object(GetModel("W200_Bricks_Window"), [-400, 0, -600],[0,90,0]));
    this.CollisionPlanes.push(new Plane([-400, 0, -500], [-400, 100, -500], [-400, 100, -700], [-400, 0, -700]));
    // Wall 15
		this.Objects.push(new Object(GetModel("W200_Bricks"), [-100, 0, -200],[0,0,0]));
    this.CollisionPlanes.push(new Plane([0, 0, -200], [0, 100, -200], [-205, 100, -200], [-205, 0, -200]));
    // Wall 16
		this.Objects.push(new Object(GetModel("W100_Bricks"), [-450, 0, -200],[0,0,0]));
    this.CollisionPlanes.push(new Plane([-395, 0, -200], [-395, 100, -200], [-505, 100, -200], [-505, 0, -200]));
    // Wall 17
		this.Objects.push(new Object(GetModel("W300_Bricks"), [-200, 0, -350],[0,90,0]));
    this.CollisionPlanes.push(new Plane([-200, 0, -195], [-200, 100, -195], [-200, 100, -505], [-200, 0, -505]));
    // Wall 18
		this.Objects.push(new Object(GetModel("W300_Bricks"), [-400, 0, -350],[0,90,0]));
    this.CollisionPlanes.push(new Plane([-400, 0, -195], [-400, 100, -195], [-400, 100, -505], [-400, 0, -505]));
    // Wall 19
		this.Objects.push(new Object(GetModel("W300_Bricks"), [-50, 0, -500],[0,0,0]));
    this.CollisionPlanes.push(new Plane([-205, 0, -500], [-205, 100, -500], [100, 100, -500], [100, 0, -500]));
    // Wall 20
		this.Objects.push(new Object(GetModel("W200_Bricks"), [100, 0, -600],[0,90,0]));
    this.CollisionPlanes.push(new Plane([100, 0, -500], [100, 100, -500], [100, 100, -700], [100, 0, -700]));
    // Wall 21
		this.Objects.push(new Object(GetModel("W300_Bricks"), [-50, 0, -700],[0,0,0]));
    this.CollisionPlanes.push(new Plane([100, 0, -700], [100, 100, -700], [-200, 100, -700], [-200, 0, -700]));


    // Wall 22
    this.Objects.push(new Object(GetModel("W1000_Bricks"), [-400, 0, -900],[0,0,0]));


    // Add the floor and roof
    this.Objects.push(new Object(GetModel("F1600_1000_Bricks"), [-600,0,-200], [0,0,0]));
    this.Objects.push(new Object(GetModel("F1600_1000_Bricks"), [-600,100,-200], [0,0,0]));
    this.Objects.push(new Object(GetModel("F1600_1000_Bricks"), [-600,0,-1200], [0,0,0]));
    this.Objects.push(new Object(GetModel("F1600_1000_Bricks"), [-600,100,-1200], [0,0,0]));


    // Add some pretty lamps
    this.Objects.push(new Object(GetModel("Lamp"), [5,50,-5], [0,0,0]));
    this.Objects.push(new Object(GetModel("Lamp"), [300-5,50,-5], [0,0,0]));
    this.Objects.push(new Object(GetModel("Lamp"), [5,50,-300+5], [0,0,0]));
    this.Objects.push(new Object(GetModel("Lamp"), [300-5,50,-300+5], [0,0,0]));

    // Door 1 Switch
    this.Switches.push(new SwitchPad(
      new Object(GetModel("SwitchPad"), [-600, 0, 200], [0,0,0]),
      new Sphere([-600, this.PlayerStart_Pos[1], 200], 15.0),
      new Door(
        new Object(GetModel("W200_Bricks"), [-600, 0, -200], [0,0,0]),
        new Plane([-500, 0, -200], [-700, 0, -200], [-700, 100, -200], [-500, 100, -200])
      )
    ));

    // Door 2 Switch
    this.Switches.push(new SwitchPad(
      new Object(GetModel("SwitchPad"), [-1200, 0, -600], [0,0,0]),
      new Sphere([-1200, this.PlayerStart_Pos[1], -600], 15.0),
      new Door(
        new Object(GetModel("W200_Bricks"), [-300, 0, -200], [0,0,0]),
        new Plane([-200, 0, -200], [-400, 0, -200], [-400, 100, -200], [-200, 100, -200])
      )
    ));

    // Door 3 Switch
    this.Switches.push(new SwitchPad(
      new Object(GetModel("SwitchPad"), [0, 0, -600], [0,0,0]),
      new Sphere([0, this.PlayerStart_Pos[1], -600], 15.0),
      new Door(
        new Object(GetModel("W200_Bricks"), [-900, 0, -600], [0,90,0]),
        new Plane([-900, 0, -500], [-900, 100, -500], [-900, 100, -700], [-900, 0, -700])
      )
    ));


    // Exit Sitch
    this.Switches.push(new SwitchPad(
      new Object(GetModel("SwitchPad"), [-600, 0, -600], [0,0,0]),
      new Sphere([-600, this.PlayerStart_Pos[1], -600], 15.0),
      new Door(
        new Object(GetModel("W200_Bricks_Exit"), [-300, 0, -700], [0,0,0]),
        new Plane([-200, 0, -700], [-200, 100, -700], [-400, 100, -700], [-400, 0, -700])
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
