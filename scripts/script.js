import * as Man from './Manichrome.js';
/*
function f(x){//this will be the graph function
   return x**2;
}
const main=new Man.Main();//make canvas
const grid=new Man.Grid(main,50,50,1)//we create a grid with 50px 50 px margins and divisions of 1
const graph=new Man.LinearGraph(main,f,[-5,5],100,100)//we make a graph we paa main ,f(x),[startX,endX],xMargin,yMargin
graph.inc=0.1;//change increment for smoother approximation 
grid.draw();
graph.draw();
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

const main =new Man.Main3d();
