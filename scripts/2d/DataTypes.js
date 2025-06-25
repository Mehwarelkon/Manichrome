//vector data type
export function Vec2(x,y){
    const vec=[x,y];
    vec.add=function(v){
       return Vec2(vec[0]+v[0],vec[1]+v[1]);
        
    }
    vec.dot=function(v){
        return vec[0]*v[0]+vec[1]*v[1];
    }
    vec.cross=function(v){
        return vec[0]*v[1]-vec[1]*v[0];
    }
    vec.mul=function(scalar){
         return Vec2(vec[0]*scalar,vec[1]*scalar);
        
    }
    vec.getLength=function(){
        return Math.hypot(vec[0],vec[1]);
    }
    vec.normalize=function(){
        const r=vec.getLength();
        return Vec2(vec[0]/r,vec[1]/r);
        
    }
    vec.equal=function(v){
        return vec[0]===v[0] && vec[1]===v[1];
    }
    vec.getAngle=function(){
        return Math.atan2(vec[1],vec[0]);
    }
    vec.getAngleTo=function(v){
        return Math.atan2(v[1],v[0])-Math.atan2(vec[1],vec[0]);
    }
    vec.sub=function(v){
        return Vec2(vec[0]-v[0],vec[1]-v[1]);
        
    }
    vec.rot=function(v,theta){
        const r = vec.sub(v).getLength();
        const phi = vec.sub(v).getAngle();
        return Vec2(v[0]+r*Math.cos(phi+theta),v[1]+r*Math.sin(phi+theta))
        
    }
    Vec2.isVec2=function(v){
        return Array.isArray(v)&&v.length==2;
    }
    vec.clone=function(){
        return Vec2(vec[0],vec[1]);
    }
   vec.devFix=function(){
      return Vec2(vec[0]+window.innerWidth/2,-vec[1]+window.innerHeight/2);
   }
   vec.type="Vec2";
    return vec;
}

export function Color(r,g,b,a){
    const color =[r,g,b,a];
    color.getColor=function(){
        return `rgba(`+color[0]+`,`+color[1]+`,`+color[2]+`,`+color[3]+`)`;
    }
    
    return color;
}
export const devOrigin =Vec2(window.innerWidth/2,window.innerHeight/2)
export const origin =Vec2(0,0);

/*
function Vec2(x, y) {
  const obj = [x, y];

  // Add methods directly to the array object
  obj.add = function(v) {
    return Vec2(this[0] + v[0], this[1] + v[1]);
  };

  obj.scale = function(s) {
    return Vec2(this[0] * s, this[1] * s);
  };

  obj.toString = function() {
    return `[${this[0]}, ${this[1]}]`;
  };

  return obj; // <- it's an array with extra powers!
}
*/