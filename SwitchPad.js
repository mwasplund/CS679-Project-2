function SwitchPad(){
	this.pos = vec3.create([0,0,0]);
	this.door = new Door();
	this.pressed = false;

	this.stepOn = function(){
		this.pressed = true;
		this.door.open();
	}
	
	this.stepOff = function(){
		this.pressed = false;
		this.door.close();
	}

	this.setDoor = function(vec3 pos, vec3 dir){
		this.door.setPos(pos, dir);	
	}
}
