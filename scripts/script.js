
import * as Man from './Manichrome.js';
let i={line:100};


const main =new Man.Main2d(200,200,[0,50]);
const line =new Man.Line({main:main});
line.point2[0]=i.line;
function a(){
    line.draw();
    line.point2[0]=i.line;
}
main.addEvent([()=>{console.log(i.line)},5000])
const edit= new Man.Editor([0,-100],i);
main.addProcess([a,0,undefined]);
main.refresh();
/*const main =new Man.Main2d();
function first(delta){
   console.log(1);
}
function sec(delta){
   console.log(2);
}
function third(delta){
   console.log(3);
}
function fourth(delta){
   console.log(4);
}
main.addProcess([first,0,1000]);
main.addProcess([sec,1000,2000]);
main.addProcess([third,2000,3000]);
main.addProcess([fourth,3000,4000]);
main.refresh();*/
/*
const main =new Man.Main2d();
let Vec2=Man.Vec2;
let Color=Man.Color;
const dot =new Man.Dot({main:main,point:Man.Vec2(100,100)})
const sp =new Man.Vector({main:main,point1:Vec2(0,0),point2:Man.Vec2(100,100),color:Man.Color(255,0,0,1),thick:4,tipSize:6});
sp.makeAnimation({startTime:0,endTime:2000,type:'easeInOutSin',point1:Man.Vec2(-100,-100),point2:Vec2(-100,-100),color:Color(0,0,255,1),thick:20,tipSize:30});
function anim(delta){
   sp.draw();
   dot.point=sp.point1.clone();
   dot.draw();
   console.log(dot.temp.sub(sp.temp))
  // sp.point1[0]-=2
   // console.log(JSON.stringify(sp.tip))
}
main.addProcess([anim,0,5000]);
main.refresh();
*/
/*let tip=0;
let th=10;
const main =new Man.Main2d();
const grid= new Man.Grid({main:main,px:25,py:25});
//grid.draw();
const vecL=new Man.Vector({main:main,point1:[-100,-100],point2:[100,-100],thick:th,tipSize:tip});
const vecL1 = new Man.Vector({main:main,point1:[-100,-100],point2:[100,-100],thick:th,tipSize:tip});
const vecL2 = new Man.Vector({main:main,point1:[-100,-100],point2:[100,-100],thick:th,tipSize:tip});
 const vecL3 = new Man.Vector({main:main,point1:[-100,-100],point2:[100,-100],thick:th,tipSize:tip});
 //const vecL4 = new Man.Vector({main:main,point1:[-100,-100],point2:[100,-100],thick:th,tipSize:tip});
vecL1.makeAnimation({point1:[-100,0],point2:[-100,200],type:"easeInOutSin",startTime:0,endTime:1000});
vecL2.makeAnimation({point1:[-100,200],point2:[0,0],type:"easeInOutSin",startTime:1000,endTime:2000});
vecL3.makeAnimation({point1:[0,0],point2:[100,200],type:"easeInOutSin",startTime:2000,endTime:3000});
vecL.makeAnimation({point1:[100,200],point2:[100,0],type:"easeInOutSin",startTime:3000,endTime:4000});

function anim(){
    vecL.draw();
    vecL1.draw()
    vecL2.draw()
    vecL3.draw()
   // vecL4.draw()
}
main.addProcess([anim,0,undefined]);
main.refresh();*/

/*

*/
/*var i=0;
function f(x){
    return (x**2)*i;
}

const main = new Man.Main();

const dot =new Man.Dot(main,[100,100]);
const event =new Man.TouchEventListener(main);
event.dots.push(dot);
event.call();

const grid =new Man.Grid(main,50,50,1);
grid.axisColor=[255,0,0,1];
grid.color=[0,0,255,1];
const graph =new Man.LinearGraph(main,f,[-5,5],50,50);
graph.color=[0,255,0,1];
graph.inc=0.01;
const vec=new Man.Vector(main,[0,0,0,0]);
vec.color=[0,0,255,1];
function anim(delta){
    i=dot.point[0]/20;
    dot.point[1]=0;
  //  i+=0.01;
    vec.point[2]=1*50;
    vec.point[3]=f(1)*50;
    grid.draw();
    graph.draw();
    vec.draw();
    dot.draw();
    
}
main.addProcess([anim,0,undefined]);
main.refresh();
*/
/*
const main =new Man.Main();
const dot =new Man.Dot(main,[0,0]);//we create two dots 
const dot2 =new Man.Dot(main,[30,30]);
const event =new Man.TouchEventListener(main);//we create an event listener 
event.dots.push(dot);
event.dots.push(dot2);//we push the two dot to be draggable
dot.size=10;
dot2.size=10;
event.call();//we call to start
//the toch will snap to the nearest dot 
//event listners only works with dots
function anim(delta){
    dot.draw();
    dot2.draw();//here we show then
}
main.addProcess([anim,0,undefined]);
main.refresh();
*/
/*
const main =new Man.Main();
const dot =new Man.Dot(main,[100,100]);//we create a dot
const line =new Man.Line(main,[0,0,100,100])
const event =new Man.TouchEventListener(main);
event.dots.push(dot);
line.thick=2;
event.fun=(e)=>{//this function apply when the touch is moving (one finger only like when the dot moves)
    line.point[2]=dot.point[0];//we can update line in anim but this is better for delays
    line.point[3]=dot.point[1];
};
event.call();
function anim(delta){
    dot.draw();
    line.draw();
}
main.addProcess([anim,0,undefined]);
main.refresh();
*/
/*
const main =new Man.Main();
const dot =new Man.Dot(main,[100,0]);
dot.size=4;
const vec =new Man.Vector(main,[0,0,0,0]);
vec.tipSize=3;
var V=0;
var F=0;
function anim(delta){
    F=-dot.point[0]/300;
    V+=F;
    dot.point[0]+=V;
    dot.draw();
    vec.point[2]=dot.point[0];
    vec.draw();
}
main.addProcess([anim,0,undefined]);
main.refresh();
*/
/*
const main=new Man.Main();
const g=new Man.Grid({main:main,thick:3,dThick:30})
const p=new Man.LinearPath({main:main,thick:2});
for(let i=0;i<=(2)*Math.PI;i+=Math.PI/120){
    p.points.push([100*Math.cos(i),Math.sin(i)*100]);
    p.color.push([0,0,0,1]);
}
p.points.push([100*Math.cos(0),Math.sin(0)*100]);
p.color.push([0,0,0,1]);
const l= new Man.Line({main:main,point1:[0,0],point2:[100,100]})
l.makeAnimation({startTime:1000,endTime:3000,point1:[100,0],point2:[0,100]});
//console.log(p.points[p.points.length-1]);
p.makeAnimation({startTime:1000,endTime:3000,type:"linear"});
function anim(delta){
    g.draw()
  p.draw();
l.draw();
    console.log(delta)
 }
main.addProcess([anim,1000,6000,{con:false}]);
main.refresh();
*/
/*
x1D544;  𝕄 
&#x1D4DC;  𝓜 
&#x2133;  /* ℳ 
&#x1D578; /* 𝕸 
*/ 
