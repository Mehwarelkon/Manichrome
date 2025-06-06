import * as Man from './Manichrome.js';

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
function circle(){
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
function Vect(){
     
    cir.draw();
}
main.addProcess([Vect,2000,10000]);
main.addProcess([circle,0,2000]);

main.refresh();

