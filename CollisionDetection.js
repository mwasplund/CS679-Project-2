var Spheres = new Array();
var Planes = new Array();

function Sphere(pos, radius){
	this.pos = pos;
	this.radius = radius;
	return Spheres.push(this)
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
	
	vec3.cross(pv1, pv2, normal);
	vec3.normalize(normal);
	this.d = -vec3.dot(p1,normal);
	
{

function checkSphereCollision(index){
	var center = Spheres[index].pos;
	var point = vec3.create();
	var point2;
	var centerLoc;
	var pointLoc;
	var ray = vec3.create();
	
	for(i=0;i<Planes.length;i++){
		vec3.scale(Planes[i].normal,Spheres[index].radius,point); 
		vec3.subtract(center,point,point2); //point2 set
		vec3.add(point,center,point); //point set
		centerLoc = vec3.dot(center, Planes[i].normal) + Planes[i].d;
		pointLoc = vec3.dot(point, Planes[i].normal) + Planes[i].d;
		point2Loc = vec3.dot(point2, Planes[i].normal) + Planes[i].d;
		centerPos = fbc(centerLoc);
		pointPos = fbc(pointLoc);
		point2Pos = fbc(point2Loc);
		if (pointPos != centerPos){
			//For a hyperplane, return true;
			ray = Planes[i].normal; //this part may be completely ass backward
			var t = - (Planes[i].d + vec3.dot(Planes[i].normal, center)) / vec3.dot(Planes[i].normal, ray);
			var intersect = vec3.add(center,vec3.scale(ray, t));
			
			var v1 = vec3.create();
			var v2 = vec3.create();
			var v3 = vec3.create();
			var v4 = vec3.create();
			
			vec3.subtract(intersect, Planes[i].p1, v1);
			vec3.subtract(intersect, Planes[i].p2, v2);
			vec3.subtract(intersect, Planes[i].p3, v3);
			vec3.subtract(intersect, Planes[i].p4, v4);
			
			vec3.normalize(v1);
			vec3.normalize(v2);
			vec3.normalize(v3);
			vec3.normalize(v4);
			
			var theta = Math.acos(vec3.dot(v1,v2))
					+ Math.acos(vec3.dot(v2,v3))
					+ Math.acos(vec3.dot(v3,v4))
					+ Math.acos(vec3.dot(v4,v1));
					
			if (Math.abs(theta - (2 * Math.PI) < .1){
				return true;
			}
			
		}
		if (point2Pos != centerPos){
			vec3.negate(Planes[i].normal, ray); //Might be fucked
			var t = - (Planes[i].d + vec3.dot(Planes[i].normal, center)) / vec3.dot(Planes[i].normal, ray);
			var intersect = center + (vec3.scale(ray, t));
			
						
			var v1 = vec3.create();
			var v2 = vec3.create();
			var v3 = vec3.create();
			var v4 = vec3.create();
			
			vec3.subtract(intersect, Planes[i].p1, v1);
			vec3.subtract(intersect, Planes[i].p2, v2);
			vec3.subtract(intersect, Planes[i].p3, v3);
			vec3.subtract(intersect, Planes[i].p4, v4);
			
			vec3.normalize(v1);
			vec3.normalize(v2);
			vec3.normalize(v3);
			vec3.normalize(v4);
			
			var theta = Math.acos(vec3.dot(v1,v2))
					+ Math.acos(vec3.dot(v2,v3))
					+ Math.acos(vec3.dot(v3,v4))
					+ Math.acos(vec3.dot(v4,v1));
					
			if (Math.abs(theta - (2 * Math.PI) < .1){
				return true;
			}
		}
		
	}
	return false;
}

function fbc(val){
	if (val > 0){
		val = 1;
	}
	if (val < 0){
		val = -1;
	}
}