// Constants
var Player_MoveSpeed = 5;
var Player_RotateSpeed = 5;

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
        this.boundingSphere = new Sphere(this.pos, 10.0);
  

	this.duplicate = function(){
		var dup = new Player();
		vec3.set(this.pos, dup.pos);
		vec3.set(this.lookat, dup.lookat);
		vec3.set(this.dir, dup.dir);
		vec3.set(this.dir_Up, dup.dir_Up);
		vec3.set(this.pos_Up, dup.pos_Up);
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
                var PreviousPos = vec3.create(this.pos);
		if(this.mLeft)     
		{
			// Caluculate Direction forward
			vec3.direction(PreviousPos, this.lookat, this.dir);
	    
			// Calculate the Direction Up
			vec3.add(PreviousPos, [0,1,0], this.pos_Up);
			vec3.direction(this.pos_Up, PreviousPos, this.dir_Up)
	    
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
			vec3.direction(PreviousPos, this.lookat, this.dir);
		    
			// Calculate the Direction Up
			vec3.add(PreviousPos, [0,1,0], this.pos_Up);
			vec3.direction(this.pos_Up, PreviousPos, this.dir_Up)
	    
			// Calculate direction right
			vec3.cross(this.dir_Up, this.dir, this.dir);
	    
			// Move in direction
			vec3.scale(this.dir, Player_MoveSpeed);
			vec3.add(this.pos, this.dir)
			Changed = true;
		}
		if(this.mForward)     
		{
			vec3.direction(this.lookat, PreviousPos, this.dir);
			vec3.scale(this.dir, Player_MoveSpeed);
			vec3.add(this.pos, this.dir)
			Changed = true;
		}
		if(this.mBackward)     
		{
			vec3.direction(this.lookat, PreviousPos, this.dir);
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
		
		if(Changed)
		{	
		  // Check if this player has hit a wall
		  for(var k = 0; k < CurrentLevel.CollisionPlanes.length; k++)
		  {
		    if(CurrentLevel.CollisionPlanes[k].enabled)
		    {
      		var CollisionDirection = checkSpherePlaneCollision(this.boundingSphere, CurrentLevel.CollisionPlanes[k]);
      		
      		if(CollisionDirection != null)
      		{
            // recalculate the movement
            vec3.direction(PreviousPos, this.pos, this.dir)
            
            var Parallel = vec3.cross(CollisionDirection, [0,1,0], vec3.create());
            vec3.normalize(Parallel);
            var Amount = -vec3.dot(Parallel, this.dir);
            $("#Collision").val("HIT: Wall - " + k);
            // Move in new direction
            vec3.scale(Parallel, Amount);
            vec3.add(PreviousPos, Parallel, this.pos);
          }	
        }	
      }
            
      this.UpdateLookAt();
    }
	}

	
	this.UpdateLookAt = function()
	{
	// Set the Lookat to right in front of the player's eyes
 		  var Rad_Yaw =  -degToRad(this.yaw);
 			vec3.add(this.pos, [Math.sin(Rad_Yaw), 0, Math.cos(Rad_Yaw)], this.lookat);
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
