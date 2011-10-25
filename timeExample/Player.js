function Vector3(a,b,c){
	this.x;
	this.y;
	this.z;

	this.setVect3 = function(a,b,c){
		this.x = a;
		this.y = b;
		this.z = c;
	}
	
	this.duplicate = function(){
		var dup = new Vector3(this.x, this.y, this.z);
		return dup;
	}

	this.setVect3(a,b,c);
}

function Player(){
	this.pos = new Vector3(0,0,0);
	this.mForward = false;
	this.mBackward = false;
	this.mLeft = false;
	this.mRight = false;
	this.jump = false;
	this.dead = false;

	this.duplicate = function(){
		var dup = new Player();
		dup.pos = this.pos.duplicate();
		dup.mForward = this.mForward;
		dup.mBackward = this.mBackward;
		dup.mLeft = this.mLeft;
		dup.mRight = this.mRight;
		dup.jump = this.jump;
		dup.dead = this.dead;
		return dup;
	}
}

//Pass in position, velocity, and time shot
function Shot(px, py, pz, vx, vy, vz, t){
	this.pos = new Vector(px, py, pz);
	this.vel = new Vector(vx, vy, vz);

	this.updatePos = function() {
		this.pos.setVect3(this.pos.x+this.vel.x, this.pos.y+this.vel.y, this.pos.z+this.vel.z);
	}
}

function Record(){
	this.ts = new Array(); //ts = 'timeSlice'. An array of 'Vector3's.
	this.p = 0; //Current playback location. Think playhead.

	//Pass in a player, this adds the players pos vector to its timeslice array
	this.addSlice = function(pl) {
		this.ts[this.p]=pl.duplicate();
		this.p++;
	}

	//Resets playhead to 0
	this.resetP = function(){
		this.p = 0;
	}

	//Gets next frame to play. If no frames left, returns last available
	this.playNextSlice = function() {
		this.p++;
		if(this.p > this.ts.length) this.p = this.ts.length;
		return this.ts[this.p-1];
	}
}
