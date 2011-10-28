function SwitchPad(i_Object, i_BoundingSphere, i_Door){
	this.object = i_Object;
	this.boundingSphere = i_BoundingSphere;
	this.door = i_Door;
	this.pressed = false;

	this.stepOn = function(){
		this.pressed = true;
		this.door.open();
	}
	
	this.stepOff = function(){
		this.pressed = false;
		this.door.close();
	}	
	
	this.Draw = function()
	{
	  this.object.Draw();
	  this.door.Draw();
	}
}
