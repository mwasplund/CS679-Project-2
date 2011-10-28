// Constants
var Player_MoveSpeed = 10;
var Player_RotateSpeed = 10;

function Player(){
	this.pos = vec3.create([0,0,0]);
	this.lookat = vec3.create([0,0,1]);
	this.dir = vec3.create([0, 0, 1]);
	this.dir_Up = vec3.create([0,1,0]);
	this.pos_Up = vec3.create([0,1,0]);
	this.yaw = 0;
	this.pitch = 0;
	this.rRight = false;
	this.rLeft = false;
	this.rUp = false;
	this.rDown = false;
	this.mForward = false;
	this.mBackward = false;
	this.mLeft = false;
	this.mRight = false;
	this.jump = false;
	this.dead = false;

	this.duplicate = function(){
		var dup = new Player();
		dup.pos = vec3.create([this.pos[0], this.pos[1], this.pos[2]]);
		dup.lookat = vec3.create([this.lookat[0], this.lookat[1], this.lookat[2]]);
		dup.dir = vec3.create([this.dir[0], this.dir[1], this.dir[2]]);
		dup.dir_Up = vec3.create([this.dir_Up[0], this.dir_Up[1], this.dir_Up[2]]);
		dup.pos_Up =vec3.create([this.pos_Up[0], this.pos_Up[1], this.pos_Up[2]]);
		dup.yaw = this.yaw;
		dup.pitch = this.pitch; 
		dup.rRight = this.rRight;
		dup.rLeft = this.rLeft;
		dup.rUp = this.rUp;
		dup.rDown = this.rDown;
		dup.mForward = this.mForward;
		dup.mBackward = this.mBackward;
		dup.mLeft = this.mLeft;
		dup.mRight = this.mRight;
		dup.jump = this.jump;
		dup.dead = this.dead;
		return dup;
	}
	
	this.Update = function(){
	  var Changed = false;
	  if(this.mLeft)     
	  {
	    // Caluculate Direction forward
	    vec3.direction(this.pos, this.lookat, this.dir);
	    
	    // Calculate the Direction Up
	    vec3.add(this.pos, [0,1,0], this.pos_Up);
	    vec3.direction(this.pos_Up, this.pos, this.dir_Up)
	    
	    // Calculate direction right
	    vec3.cross(this.dir_Up, this.dir, this.dir);
	    
	    // Move in direction
	    vec3.scale(this.dir, Player_MoveSpeed);
	    vec3.subtract(this.pos, this.dir)
	    Changed = true;
	  }
 		if(this.mRight)     
	  {
	    // Caluculate Direction forward
	    vec3.direction(this.pos, this.lookat, this.dir);
	    
	    // Calculate the Direction Up
	    vec3.add(this.pos, [0,1,0], this.pos_Up);
	    vec3.direction(this.pos_Up, this.pos, this.dir_Up)
	    
	    // Calculate direction right
	    vec3.cross(this.dir_Up, this.dir, this.dir);
	    
	    // Move in direction
	    vec3.scale(this.dir, Player_MoveSpeed);
	    vec3.add(this.pos, this.dir)
	    Changed = true;
	  }
    if(this.mForward)     
	  {
	    vec3.direction(this.lookat, this.pos, this.dir);
	    vec3.scale(this.dir, Player_MoveSpeed);
	    vec3.add(this.pos, this.dir)
	    Changed = true;
	  }
    if(this.mBackward)     
	  {
	    vec3.direction(this.lookat, this.pos, this.dir);
	    vec3.scale(this.dir, Player_MoveSpeed);
	    vec3.subtract(this.pos, this.dir)
	    Changed = true;
	  }
 		
 		if(this.rRight) 
 		{
 		  this.yaw += Player_RotateSpeed;
 		  Changed = true;
 		  if(this.yaw > 360.0)
 		    this.yaw -= 360.0;
 		}
 		if(this.rLeft) 
 		{
 		  this.yaw -= Player_RotateSpeed;
 		  Changed = true;
 		  if(this.yaw < 0.0)
 		    this.yaw += 360.0;
 		}

 		
 		// Set the Lookat to right in front of the player's eyes
 		if(Changed)
 		{
 		  var Percent_Yaw =  -degToRad(this.yaw);
 		  vec3.add(this.pos, [Math.sin(Percent_Yaw), 0, Math.cos(Percent_Yaw)], this.lookat);
 		}
	}

	this.updateStateWith = function(p)
	{
		this.rRight = p.rRight;
		this.rLeft = p.rLeft;
		this.rUp = p.rUp;
		this.rDown = p.rDown;
		this.mForward = p.mForward;
		this.mBackward = p.mBackward;
		this.mLeft = p.mLeft;
		this.mRight = p.mRight;
		this.jump = p.jump;
		this.dead = p.dead;
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
		if(this.p > this.ts.length){
			this.p = this.ts.length;
			this.p.dead = true;
		}
		return this.ts[this.p-1];
	}
}
