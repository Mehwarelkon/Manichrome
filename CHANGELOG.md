v2.2.0
# added a dataType Vec2 that is a vector (mathmatically) having properties like add dot cross getLength mul normalize getAngle getAngleTo 
#added Datatype Color 
v2.2.1
updated some of the readme
v2.2.2
## added the bind method to 
line 
vector 
circle 
triangle
rect
dot
which update/animate the object 
### ex
```js
import * as Man from './Manichrome.js';
const main =new Man.Main2d();
const cir =new Man.Vector({main:main});
let t=0;
const animation={
    thick:t=>t*1.5+1,
    point1:t=>Man.Vec2(-t*50,-t*50),
    point2:t=>Man.Vec2(t*50,t*50),
    color:t=>Man.Color(t*255/2,0,t+255/2,1),
    tipSize:t=>t*1.5+1
}
function anim(delta){
    cir.draw(Man.Vec2(0,0));
    cir.bind(animation,t);
    t+=delta/1000;
}
main.addProcess([anim,0,2000,{con:false}]);
main.refresh();

```
## also added makeAnimation to triangles
## 
