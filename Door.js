function Door(){
	this.pos = vec3.create([0,0,0]);
	this.dir = vec3.create([0, 0, 1]);
	this.open = false;

	this.open = function(){
		this.open = true;
	}
	
	this.close = function(){
		this.open = false;
	}

	this.setPos = function(vec3 pos, vec3 dir){
		this.pos = pos;
		this.dir = dir;
	}

	this.draw = function(){
		gl.enable(gl.BLEND);
	}
}
