import * as Man from './Manichrome.js';
/*
const main=new Man.Main();

const cir=new Man.Circle(main,[0,0],100,Math.PI*2);
//cir.isClosed=true;
//cir.startAngle=Math.PI;
const X = new Man.Line(main,[-200,0,200,0]);
const Y =new Man.Line(main,[100,200,100,-200]);
const lineA =new Man.Line(main,[0,0,200,200])
const dot = new Man.Dot(main,[0,100]);
const rect =new Man.Rect(main,80*2,60*2,[0,0]);
const RDot=new Man.Dot(main,[50,0]);
//const tri = new Man.Triangle(main,[-60,-60,60,-60,0,60])
var i =0;
const tri = new Man.Triangle(main,[-80,-60,80,-60,0,100]);
//tri.theta=Math.PI/4
function circle(delta){
    cir.draw();
    X.draw();
    Y.draw();
    dot.draw();
    lineA.draw();
    i+=Math.PI/120;
    //X.x2=Math.cos(i)*100;
    
    X.point[3]=Math.sin(i)*100;
    X.point[1]=X.point[3];
    Y.point[2]=Math.cos(i)*100;
    //Y.y2=Math.sin(i)*100;
    Y.point[0]=Y.point[2];
    lineA.update(100,i);
    rect.scale=[1,1];
    rect.theta=i;
    rect.draw();
    dot.point=[Math.cos(i)*100,Math.sin(i)*100];
    //RDot.draw()
    //tri.draw()
    tri.theta=i;
    tri.draw([0,0])
}
const vec= new Man.Vector(main,[0,0,100,0])
vec.tipSize=5;
function Vect(delta){
     vec.update(100,i);
    vec.draw();
    cir.draw();
    i+=Math.PI/120;
}
main.addProcess([Vect,2000,10000]);
main.addProcess([circle,0,2000]);

main.refresh();
*/
/*
const main =new Man.Main();
const line1 =new Man.Line(main,[0,0,0,0]);
const line2 =new Man.Line(main,[0,0,50,-10]);
function anim(delta){
    line1.point[2]+=delta/100;
    line1.draw();
    
}
function anim2(delta){
    line1.draw();
    line2.draw();
    console.log(line1.point[2]-line2.point[2])
}
main.addProcess([anim,0,5000]);
main.addProcess([anim2,5000,undefined]);
main.refresh();
*/
/*
const main = new Man.Main();
const path = new Man.LinearPath(main,[]);
for(let i=0;i<100;i++){
    path.points.push(i);
    path.points.push(2*i);
    path.color.push([i*2.55,0,0,1]);
}
const vec =new Man.Vector(main,[0,0,100,100]);
vec.color=[255,0,0,1]
function anim(delta){
path.draw();
    vec.draw()
    console.log(delta);
}
main.addProcess([anim,0,10000]);
main.refresh();
*/

const main =new Man.Main();
const vec= new Man.Vector(main,[0,0,0,0]);
const vec2 =new Man.Vector(main,[0,0,0,0]);
const vec3 = new Man.Vector(main,[0,0,0,0]);
const vec4 = new Man.Vector(main,[0,0,0,0]);
const path =new Man.LinearPath(main,[]);
var i=0;
var j=-1;
function anim(delta){
    vec.update(50,i);
    vec2.point[0]=vec.point[2];
    vec2.point[1]=vec.point[3];
    vec2.update(40,i*2);
    vec3.point[0]=vec2.point[2];
    vec3.point[1]=vec2.point[3];
    vec3.update(25,-i);
    vec4.point[0]=vec3.point[2];
    vec4.point[1]=vec3.point[3];
    vec4.update(40,-2*i);
    path.points.push(vec4.point[2]);
    path.points.push(vec4.point[3]);
    path.color.push(main.hsla(i*20,1,0.5,1));
    for(let k=0;k<j;k++){
    path.color[k][3]-=1/255;
    }
    vec.draw();
    vec2.draw();
    vec3.draw();
    vec4.draw();
    path.draw();
    i+=delta*Math.PI/3000;
    j++;
    if(path.color[0][3]<=0){
        path.color.shift();
        path.points.shift();
        path.points.shift();
        j--;
    }
    console.log(delta);
}
main.addProcess([anim,0,undefined]);
main.refresh();

/*
const main=new Man.Main();
const vis = new Man.PixelMod(main,200,260,[0,0]);
var i=0
function loop(x,y){
    //vis.color=
    vis.currentPixelColor=main.hsla((y+2*x)*360/460+i,1,1,255);
}
vis.loop=loop;
function anim(delta){
    i+=60*delta/1000;
    vis.draw();
    console.log(delta);
}
main.addProcess([anim,0,10000]);
main.refresh();
*/
/*
const main=new Man.Main();
const vis = new Man.PixelMod(main,200,200,[0,0]);
function loop(x,y){
    vis.currentPixelColor=main.hsla(360-y*360/200*Math.cos(x*y),1,1,255);
    }
vis.loop=loop;
vis.draw();
*/