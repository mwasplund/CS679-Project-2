function Door(i_Object, i_CollisionPlane){
	this.object = i_Object;
	this.collisionPlane = i_CollisionPlane;
	this.isOpen = false;

	this.open = function(){
		this.isOpen = true;
		this.collisionPlane.enabled = false;
	}
	
	this.close = function(){
		this.isOpen = false;
		this.collisionPlane.enabled = true;
	}

	this.Draw = function(){
	  if(this.isOpen)
	  {
		  gl.enable(gl.BLEND);
		  //gl.disable(gl.DEPTH_TEST);
		}
		  
		this.object.Draw();
		
		gl.disable(gl.BLEND);
		//gl.enable(gl.DEPTH_TEST);

	}
}
