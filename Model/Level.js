// JavaScript Document
LoadjsFile("Model/Layout.js");
LoadjsFile("Model/Model.js");

function Level(i_num)
{
	//Debug.Trace(i_num);
	this.Draw = Level_Draw;
	this.Name = i_num;
}

function Level_Draw()
{
	//Debug.Trace("LevelDraw");
	if (this.Name == "0")
	{
		mvPushMatrix();
		mat4.translate(mvMatrix,  [1, 1, 1]);
		TestModel.Draw();
		mvPopMatrix();
	}
	
	if (this.Name == "1")
	{
		var WallModel = new Model("Wall");
		mvPushMatrix();
		mat4.translate(mvMatrix,  [1, 1, 1]);
		WallModel.Draw();
		mvPopMatrix();
		
	}
	
}
