import  {Color,Vec2,origin} from './DataTypes.js';
import {Triangle} from './Triangle.js';
export class Vector{
    constructor({main,point1=Vec2(0,0),point2=Vec2(100,100),color=Color(0,0,0,1),thick=2,tipSize=4}){
        this.temp;
        this.point1=point1;
	        this.point2=point2;  
        this.color=color;
        this.thick=thick;
        this.tipSize=tipSize;
        this.main=main;
        this.tip=new Triangle({main:main/*,point1:origin,point2:origin,point3:origin*/});
        this.tip.isFilled=true;
        this.tip.fillColor=this.color;
        this.tip.isLine=false;
    }
    draw(){
        let phi=Math.atan2(this.point2[1]-this.point1[1],this.point2[0]-this.point1[0]);
        let r =this.point2.sub(this.point1).getLength();// Math.sqrt((this.point2[1]-this.point1[1])**2+(this.point2[0]-this.point1[0])**2)
       // console.log(this.main.canv.height-window.innerHeight);
        this.tip.point1=Vec2(r+this.point1[0],this.point1[1]);
        this.tip.point2=Vec2(r-this.tipSize+this.point1[0],this.tipSize+this.point1[1]);
        this.tip.point3=Vec2(r-this.tipSize+this.point1[0],-this.tipSize+this.point1[1]);
        this.tip.fillColor=this.color;
        this.main.ctx.beginPath();
        this.main.ctx.moveTo(this.point1[0]+this.main.canv.width/2,-this.point1[1]+this.main.canv.height/2)//this.point1[0]+window.innerWidth/2,-this.point1[1]+window.innerHeight/2);
       // this.main.ctx.lineTo(this.point2[0]+window.innerWidth/2,-this.point2[1]+window.innerHeight/2);
        this.main.ctx.lineTo(this.point1[0]+(r-this.tipSize)*Math.cos(phi)+this.main.canv.width/2,-this.point1[1]-(r-this.tipSize)*Math.sin(phi)+this.main.canv.height/2);
        this.main.ctx.strokeStyle=this.color.getColor();
        this.main.ctx.lineWidth=this.thick;
        this.main.ctx.stroke();
        this.tip.theta=phi;
        this.tip.draw(Vec2(this.point1[0],this.point1[1]));
        this.temp=Vec2(this.point1[0]+(r)*Math.cos(phi)+this.main.canv.width/2,-this.point1[1]-(r)*Math.sin(phi)+this.main.canv.height/2)
    }
    update(r,angle){
        //this.point2=this.point2.rot(this.point1,);
        this.point2[0]=this.point1[0]+r*Math.cos(angle);
        this.point2[1]=this.point1[1]+r*Math.sin(angle);
    }
    makeAnimation({tipSize,point1,point2,thick,color,startTime,endTime,type="linear"}){
        let p;
	let opoint1;
	let opoint2;
	let othick;
	let ocolor;
	let otipSize;
        let funcs=[];
        let tfunc=[];
        let t=0;
        let duration=endTime-startTime;
       switch (type){
           case "linear":p=()=>{return t/duration;};break;
           case "easeIn":p=()=>{return (t/duration)**2;};break;
           case "easeOut":p=()=>{return (1-(1-t/duration)**2);};break;
           case "easeInOut":p=()=>{return 3*(t/duration)**2-2*(t/duration)**3;};break;
           case "easeInSin":p=()=>{return -Math.cos((Math.PI/2)*(t/duration))+1;};break;
           case "easeOutSin":p=()=>{return Math.sin((Math.PI/2)*(t/duration));};break;
           case "easeInOutSin":p=()=>{return Math.sin((Math.PI)*(t/duration -0.5))/2+ 0.5;};break;
       }
        
        
        if(point1){
            funcs.push(()=>this.point1=opoint1.add(point1.sub(opoint1).mul(p())));// [opoint1[0]+(point1[0]-opoint1[0])*p(),opoint1[1]+(point1[1]-opoint1[1])*p()]);
            tfunc.push(()=>this.point1=point1.clone());
            opoint1=this.point1.clone();
        }
        if(point2){
            funcs.push(()=>this.point2=opoint2.add(point2.sub(opoint2).mul(p())))//[opoint2[0]+(point2[0]-opoint2[0])*p(),opoint2[1]+(point2[1]-opoint2[1])*p()]);
            tfunc.push(()=>this.point2=point2.clone());
            opoint2=this.point2.clone();
        }
        if(thick){
            funcs.push(()=>this.thick=othick+(thick-othick)*p());
            tfunc.push(()=>this.thick=thick);
            othick=this.thick;
        }
        if(color){
            funcs.push(()=>this.color=Color(ocolor[0]+(color[0]-ocolor[0])*p(),ocolor[1]+(color[1]-ocolor[1])*p(),ocolor[2]+(color[2]-ocolor[2])*p(),ocolor[3]+(color[3]-ocolor[3])*p()));
            tfunc.push(()=>this.color=Color(...color));
            ocolor=Color(...this.color);
        }
	if(tipSize){
	funcs.push(()=>this.tipSize=otipSize+(tipSize-otipSize)*p());
	tfunc.push(()=>this.tipSize=tipSize);
	otipSize=this.tipSize;
	}

         const f=(delta)=>{//
          for(const fun of funcs){
              fun();
          }
             t+=delta
            if(t>duration){
                for(const fun of tfunc){
                    fun();
                }
            }
        }//
        this.main.addProcess([f,startTime,endTime]);
    }
    bind(obj,t){
        this.point1=obj.point1?obj.point1(t):this.point1;
        this.point2=obj.point2?obj.point2(t):this.point2;
        this.color=obj.color?obj.color(t):this.color;
        this.tipSize=obj.tipSize?obj.tipSize(t):this.tipSize;
        this.thick=obj.thick?obj.thick(t):this.thick;
    }
}

