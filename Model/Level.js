// JavaScript Document
LoadjsFile("Model/Layout.js");
LoadjsFile("Model/Model.js");

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
	this.Name = i_num;
	this.Objects = new Array();
	
	if(this.Name == "1")
	{
		this.Objects.push(new Object(new Model("W300"), [150, 0, 0],[0,0,0])); //0
		this.Objects.push(new Object(new Model("W300"), [300, 0, -150],[0,90,0])); //0
		this.Objects.push(new Object(new Model("W300"), [0, 0, -150],[0,90,0])); //0
		this.Objects.push(new Object(new Model("W200"), [200, 0, -300],[0,0,0])); //0
	
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
		this.Model.Draw();
		mvPopMatrix();
	
}
