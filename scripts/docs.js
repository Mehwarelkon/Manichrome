import * as Man from './manichrome.js';
/*
// section one static rendring 
//we will start by making static images how to render and other 
const main = new Man.Main()//this is the rendrer / canavs 
//Main should be created in an e.pty html body 
const line1 = new Man.Line(main,[0,0,100,100]);//we make a line with x1 0,y1 0,x2 100,y2 100
line1.draw();//we render the line
*/
/*
 //section 2 animatig 
const main = new Man.Main();
const line1 = new Man.Line(main,[0,0,100,100]);
function anim(){
    line1.draw();
    line1.point[3] -=30/60 ;// the line x decrease 10 px every second
}
main.addProcess([anim,0,10000/3])//we here ad the function to the process to get process every frame 
//[function,start ms,end ms] note that functions shouldnt have parameters 
main.refresh();// note that refresh clear the canvas so draw calls should be inside proccessed functions
*/
/*
//section 3 other objects
const main = new Man.Main();
const line1 = new Man.Line(main,[0,0,60,80]);
const cir = new Man.Circle(main,[0,0],100,2*Math.PI);//(main,center,raduis,angle{end angle})
line1.draw();
cir.draw();
var i=0
// we will make line1 move in a circle by using update which will update x2,y2 by r,angle,x1,y1
function anim(){
    line1.update(100,i);
    line1.draw();
    cir.draw();
    i+=Math.PI/30;
    //line is one of the uniqe object that has an update method 
    //update(r,angle)
}
main.addProcess([anim,0,3000]);
main.refresh();
*/
/*
//section 4 
const main = new Man.Main();
const line = new Man.Line(main,[200,0,100,0]);
const cir = new Man.Circle(main,[0,0],100,Math.PI*2);
const rect = new Man.Rect(main,80*2,60*2,[0,0]);//(main,width,height,center)
const dot = new Man.Dot(main,[100,0]);//(main,point)
var i =0;
var j =0;
var dir=true;
rect.isFilled=true;
rect.fillColor=[0,0,0,0];//transparent
line.color=[255,0,255,1];//[r,g,b,a]
cir.isFilled=true;
cir.fillColor=[255,0,0,0.1];
cir.lineColor=[0,0,255,1];
function anim(){
    line.draw();
    rect.draw();
    cir.draw();
    dot.draw();
    if(dir){
        j++;
    }
    else{j--}
    if(j>=255 || j<=0){
        dir=!dir;
    }
    i+=Math.PI/120;
    line.point[2]=Math.cos(i)*100;//x2 =100cos(theta)
    line.point[3]=Math.sin(i)*100;
    rect.theta=i;// theta just rotate an object arround the center 
    dot.point=[Math.cos(i)*100,Math.sin(i)*100];
    rect.fillColor=[0,j,0,j/255];//becoms fully colored when its fully green
}
main.addProcess([anim,0,10000]);
main.refresh();

*/

// note in the [func ,start, finish]
// you can make finish = undifined for infinit loop 
// triangles and vectors is being worked on 
// there is an intention for event listeners
const main = new Man.Main();
const Pi = new Man.PixelMod(main,100,200,[0,0]);
function P(x,y){
    Pi.currentPixelColor=[x+y,0,255-x-y,255];
}
Pi.loop=P;
Pi.draw()
