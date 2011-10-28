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
	this.Name = i_num;
	this.Objects = new Array();
	this.CollisionPlanes = new Array();
	
	if(this.Name == "1")
	{
	  // Player start 
	  this.PlayerStart_Pos = [15, 50, -15];
	  this.PlayerStart_Rotate = 270;
	
		this.Objects.push(new Object(new Model("W300_Bricks"), [150, 0, 0],[0,0,0])); //0
		this.CollisionPlanes.push(new Plane([0, 0, 0], [300, 0, 0], [300, 100, 0], [0, 100, 0]));
		this.Objects.push(new Object(new Model("W300_Bricks"), [300, 0, -150],[0,90,0])); //0
		this.CollisionPlanes.push(new Plane([300, 0, 0], [300, 0, -300], [300, 100, -300], [300, 100, 0]));
		this.Objects.push(new Object(new Model("W300_Bricks"), [0, 0, -150],[0,90,0])); //0
		this.CollisionPlanes.push(new Plane([0, 0, 0], [0, 0, -300], [0, 100, -300], [0, 100, 0]));
		this.Objects.push(new Object(new Model("W200_Bricks"), [200, 0, -300],[0,0,0])); //0
	  this.CollisionPlanes.push(new Plane([100, 0, -300], [300, 0, -300], [300, 100, -300], [100, 100, -300]));

    this.Objects.push(new Object(new Model("W300_Bricks"), [0, 0, -350], [0,0,0]));

    this.SwitchPad = new SwitchPad(
      new Object(new Model("Unit_Radius_Sphere"), [100, 0, -100], [0,0,0]),
      new Sphere([100, this.PlayerStart_Pos[1], -100], 40.0),
      new Door(
        new Object(new Model("W100_Bricks_Exit"), [50, 0, -300], [0,0,0]),
        new Plane([0, 0, -300], [100, 0, -300], [100, 100, -300], [0, 100, -300])
      )
    );
    
    this.CollisionPlanes.push(this.SwitchPad.door.collisionPlane);
	}
	
	if(this.Name == "2")
	{
		this.Objects.push(new Object(new Model("W600"), [300, 0, 0],[0,0,0])); //0
		this.Objects.push(new Object(new Model("W700"), [0, 0, -350],[0,90,0])); // 1
		this.Objects.push(new Object(new Model("W700"), [700, 0, -350],[0,90,0])); //2
		
		this.Objects.push(new Object(new Model("W300"), [350, 0, -150],[0,90,0])); //3
		
		this.Objects.push(new Object(new Model("W150"), [625, 0, -90],[0,0,0])); //4
		this.Objects.push(new Object(new Model("W150"), [500, 0, -180],[0,0,0]));//5
		this.Objects.push(new Object(new Model("W70"), [425, 0, -215],[0,90,0])); //6
		
		this.Objects.push(new Object(new Model("W150"), [625, 0, -280],[0,0,0]));  //7
		this.Objects.push(new Object(new Model("W300"), [500, 0, -350],[0,90,0]));  //8
		this.Objects.push(new Object(new Model("W300"), [350, 0, -400],[0,0,0]));  //9
		
		this.Objects.push(new Object(new Model("W70"), [200, 0, -365],[0,90,0]));  //10
		this.Objects.push(new Object(new Model("W200"), [100, 0, -330],[0,0,0]));  //11
		this.Objects.push(new Object(new Model("W150"), [200, 0, -180],[0,0,0]));  //12
		this.Objects.push(new Object(new Model("W70"), [275, 0, -215],[0,90,0]));  //13
		this.Objects.push(new Object(new Model("W150"), [75, 0, -90],[0,0,0]));  //14
		
		this.Objects.push(new Object(new Model("W70"), [100, 0, -400],[0,0,0]));  //15
		this.Objects.push(new Object(new Model("W150"), [135, 0, -475],[0,90,0]));  //16
		this.Objects.push(new Object(new Model("W150"), [65, 0, -550],[0,90,0]));  //17
		this.Objects.push(new Object(new Model("W200"), [165, 0, -625],[0,0,0]));  //18
		
		this.Objects.push(new Object(new Model("W70"), [265, 0, -590],[0,90,0]));  //19
		this.Objects.push(new Object(new Model("W70"), [230, 0, -555],[0,0,0]));  //20
		this.Objects.push(new Object(new Model("W200"), [400, 0, -500],[0,0,0]));  //21
		
		this.Objects.push(new Object(new Model("W50"), [525, 0, -500],[0,0,0]));  //22
		this.Objects.push(new Object(new Model("W70"), [550, 0, -535],[0,90,0]));  //23
		this.Objects.push(new Object(new Model("W300"), [640, 0, -550],[0,90,0]));  //24
		this.Objects.push(new Object(new Model("W70"), [605, 0, -400],[0,0,0]));  //25
		
		this.Objects.push(new Object(new Model("W70"), [310, 0, -665],[0,90,0]));  //26
		this.Objects.push(new Object(new Model("W70"), [400, 0, -665],[0,90,0]));  //27
		this.Objects.push(new Object(new Model("W150"), [470, 0, -630],[0,0,0]));  //28
		
		this.Objects.push(new Object(new Model("W600"), [400, 0, -700],[0,0,0]));  //28
		
		
	}
	
}

function Level_ClearSwitches()
{
  this.SwitchPad.stepOff();
}

function Level_CheckSwitches(i_BoundingSphere)
{
  var CollisionDirection = checkSphereSphereCollision(i_BoundingSphere, this.SwitchPad.boundingSphere);
  if(CollisionDirection != null)
  {
    $("#Collision").val("HIT: Switch");
    this.SwitchPad.stepOn();
  }
}


function Level_Draw(i_ShaderProgram)
{
	//Debug.Trace("LevelDraw");
	if (this.Name == "0")
	{
		mvPushMatrix();
		mat4.translate(mvMatrix,  [1, 1, 1]);
		TestModel.Draw(i_ShaderProgram);
		mvPopMatrix();
	}
	else
	{

		for(var i = 0; i < this.Objects.length; i++)
		{
			
			this.Objects[i].Draw();
	
		}
		
		this.SwitchPad.Draw();
	}
	
}

function Obj_Draw()
{
		//gl.useProgram(CurrentShader.Program);
		
		mvPushMatrix();
		mat4.translate(mvMatrix,  this.Position);
		mat4.rotate(mvMatrix, degToRad(this.Orientation[0]), [1, 0, 0]);
		mat4.rotate(mvMatrix, degToRad(this.Orientation[1]), [0, 1, 0]);
		mat4.rotate(mvMatrix, degToRad(this.Orientation[2]), [0, 0, 1]);
		this.Model.Draw(CurrentShader.Program);
		mvPopMatrix();
	
}
