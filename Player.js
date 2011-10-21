function Vector3(a,b,c) = {
	this.x;
	this.y;
	this.z;

	this.setVect3 = function(a,b,c) = {
		this.x = a;
		this.y = b;
		this.z = c;
	}
	
	setVect3(a,b,c);
}

function Player() = {
	this.pos = new Vector3(0,0,0);
}

//Pass in position, velocity, and time shot
function Shot(px, py, pz, vx, vy, vz, t) = {
	this.time = t;
	this.pos = new Vector(px, py, pz);
	this.org = new Vector(px, py, pz); //Origin of shot- DOES NOT CHANGE
	this.vel = new Vector(vx, vy, vz);
	this.go = false;

	this.updatePos = function() {
		this.pos.setVect3(this.pos.x+this.vel.x, this.pos.y+this.vel.y, this.pos.z+this.vel.z);
	}

	this.resetShot = function() {
		this.pos.setVect3(this.org.x, this.org.y, this.org.z);
		this.stop = false;
	}
}

function Record() = {
	this.recordDead = false;
	this.ts = new Array(); //ts = 'timeSlice'. An array of 'Vector3's.
	this.shots = new Array(); //an array of 'Shot's
	this.p = 0; //Current playback location. Think playhead.

	//Pass in a player, this adds the players pos vector to its timeslice array
	this.addSlice = function(p) {
		this.ts[this.ts.length]=p.pos;
	}

	//Pass in a shot
	this.addShot = function(s) {
		this.shots[this.shots.length] = s;
	}

	//Gets next frame to play. If no frames left, returns last available
	this.playNextSlice = function() {
		this.updateShots();
		if(p > this.ts.length) p = this.ts.length;
		return this.ts[p++];
	}

	this.updateShots = function() {
		for(var x = 0; x < this.shots.length; x++){
			if((!playerDead && this.shots[x].t == p) || (this.shots[x].go && this.shots[x].t>p)){
				this.shots[x].go = true;
				this.shots[x].updatePos();
			}
		}
	}
}
