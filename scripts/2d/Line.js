import {Color,Vec2} from './DataTypes.js';
export class Line {//point =[x1,y1,x2,y2] other non important member variables get called after initializing 
    constructor({main,point1=Vec2(0,0),point2=Vec2(100,100),color=Color(0,0,0,1),thick=2}){//color is an array 
        this.point1=point1;//Vec2
        this.point2=point2;//Vec2
        this.Main=main;
        this.ctx=main.ctx;
        this.thick=thick;
        this.color=color;//Color 
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.strokeStyle=this.color.getColor();
        this.ctx.lineWidth=this.thick
        this.ctx.moveTo(this.point1[0]+(this.Main.canv.width)/2,-this.point1[1] +(this.Main.canv.height)/2);
        this.ctx.lineTo(this.point2[0]+(this.Main.canv.width)/2,-this.point2[1] +(this.Main.canv.height)/2);
        this.ctx.stroke();
    }
    
    
    update(r,theta){
            this.point2=Vec2(r*Math.cos(theta),r*Math.sin(theta));
             }
    getLength(){
        return this.point1.sub(this.point2).getLength();
    }
    
makeAnimation({point1,point2,thick,color,startTime,endTime,type="linear"}){
        let p;
	let opoint1;
	let opoint2;
	let othick;
	let ocolor;
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
            funcs.push(()=>this.point1=Vec2(opoint1[0]+(point1[0]-opoint1[0])*p(),opoint1[1]+(point1[1]-opoint1[1])*p()));
            tfunc.push(()=>this.point1=Vec2(point1[0],point1[1]));
            opoint1=Vec2(this.point1[0],this.point1[1]);
        }
        if(point2){
            funcs.push(()=>this.point2=Vec2(opoint2[0]+(point2[0]-opoint2[0])*p(),opoint2[1]+(point2[1]-opoint2[1])*p()));
            tfunc.push(()=>this.point2=Vec2(point2[0],point2[1]));
            opoint2=Vec2(this.point2[0],this.point2[1]);
        }
        if(thick){
            funcs.push(()=>this.thick=othick+(thick-othick)*p());
            tfunc.push(()=>this.thick=thick);
            othick=this.thick;
        }
        if(color){
            funcs.push(()=>this.color=Color(ocolor[0]+(color[0]-ocolor[0])*p(),ocolor[1]+(color[1]-ocolor[1])*p(),ocolor[2]+(color[2]-ocolor[2])*p(),ocolor[3]+(color[3]-ocolor[3])*p()));
            tfunc.push(()=>this.color=Color(color[0],color[1],color[2],color[3]));
            ocolor=Color(this.color[0],this.color[1],this.color[2],this.color[3]);
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
        this.Main.addProcess([f,startTime,endTime]);
    } 
    bind(obj,t){
        this.point1=obj.point1?obj.point1(t):this.point1;
        this.point2=obj.point2?obj.point2(t):this.point2;
        this.thick=obj.thick?obj.thick(t):this.thick;
        this.color=obj.color?obj.color(t):this.color;
    }
}


