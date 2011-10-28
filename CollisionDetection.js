
function Sphere(pos, radius){
	this.pos = pos;
	this.radius = radius;
}

function Plane(p1, p2, p3, p4){
	this.p1 = p1;
	this.p2 = p2;
	this.p3 = p3;
	this.p4 = p4;
	var active = new Boolean();
	var pv1 = vec3.create();
	var pv2 = vec3.create();
	this.normal = vec3.create();
	
	vec3.subtract(p2, p1, pv1);
	vec3.subtract(p3, p2, pv2);
	
	vec3.cross(pv1, pv2, this.normal);
	vec3.normalize(this.normal);
	this.d;
	this.d = -vec3.dot(p1,this.normal);
}

function checkSphereCollision(i_Sphere, i_Plane){
	var center = i_Sphere.pos;
	//$("#Collision").val("Pos: " + vec3.str(center));

	var point = vec3.create();
	var point2 = vec3.create();
	var centerLoc;
	var pointLoc;
	var ray = vec3.create();
	
		vec3.scale(i_Plane.normal,i_Sphere.radius,point); 
		vec3.subtract(center,point,point2); //point2 set
		vec3.add(point,center,point); //point set
		centerLoc = vec3.dot(center, i_Plane.normal) + i_Plane.d;
		pointLoc = vec3.dot(point, i_Plane.normal) + i_Plane.d;
		point2Loc = vec3.dot(point2, i_Plane.normal) + i_Plane.d;
		centerPos = fbc(centerLoc);
		pointPos = fbc(pointLoc);
		point2Pos = fbc(point2Loc);
		/*if(pointPos != centerPos || point2Pos != centerPos){
			return true;
		}*/
		if (pointPos != centerPos){
			//For a hyperplane, return true;

			vec3.set(i_Plane.normal, ray); //this part may be completely ass backward
			var t = - (i_Plane.d + vec3.dot(i_Plane.normal, center)) / vec3.dot(i_Plane.normal, ray);
			var intersect = vec3.create();
			vec3.add(center,vec3.scale(ray, t), intersect);
			
			var v1 = vec3.create();
			var v2 = vec3.create();
			var v3 = vec3.create();
			var v4 = vec3.create();
			
			vec3.subtract(intersect, i_Plane.p1, v1);
			vec3.subtract(intersect, i_Plane.p2, v2);
			vec3.subtract(intersect, i_Plane.p3, v3);
			vec3.subtract(intersect, i_Plane.p4, v4);
			
			vec3.normalize(v1);
			vec3.normalize(v2);
			vec3.normalize(v3);
			vec3.normalize(v4);
			
			var theta = Math.acos(vec3.dot(v1,v2))
					+ Math.acos(vec3.dot(v2,v3))
					+ Math.acos(vec3.dot(v3,v4))
					+ Math.acos(vec3.dot(v4,v1));
			var Val = Math.abs(theta - (2 * Math.PI));
			if (Val < .001){
				return i_Plane.normal;
			}
			
		}
		else if (point2Pos != centerPos){

			vec3.negate(i_Plane.normal, ray); //Might be fucked
			var t = - (i_Plane.d + vec3.dot(i_Plane.normal, center)) / vec3.dot(i_Plane.normal, ray);
			var intersect = vec3.create();
			vec3.add(center, vec3.scale(ray, t), intersect);
			
						
			var v1 = vec3.create();
			var v2 = vec3.create();
			var v3 = vec3.create();
			var v4 = vec3.create();
			
			vec3.subtract(intersect, i_Plane.p1, v1);
			vec3.subtract(intersect, i_Plane.p2, v2);
			vec3.subtract(intersect, i_Plane.p3, v3);
			vec3.subtract(intersect, i_Plane.p4, v4);
			
			vec3.normalize(v1);
			vec3.normalize(v2);
			vec3.normalize(v3);
			vec3.normalize(v4);
			
			var theta = Math.acos(vec3.dot(v1,v2))
					+ Math.acos(vec3.dot(v2,v3))
					+ Math.acos(vec3.dot(v3,v4))
					+ Math.acos(vec3.dot(v4,v1));
					
			var Val = Math.abs(theta - (2 * Math.PI));
			if (Val < .001){		  
				return vec3.negate(i_Plane.normal, vec3.create());
			}
		}
	return null;
}

function fbc(val){
	if (val > 0){
		val = 1;
	}
	if (val < 0){
		val = -1;
	}
	return val;
}
