
import {Vec2,Color} from './DataTypes.js';
export class Dot{
    constructor({main,point=Vec2(0,0),color=Color(0,0,0,1),size=2}){
        this.temp;
        this.point=point;//Vec2
        this.color=color;//Color
        this.size=size;
        this.main=main;
        this.drag=false;
        //this.event=new EventListener(this.main);
    }
    draw(){
        this.main.ctx.beginPath();
        this.main.ctx.arc(this.point[0]+this.main.canv.width/2,-this.point[1]+this.main.canv.height/2,this.size,0,-2*Math.PI,true);
        this.main.ctx.fillStyle=`rgba(`+this.color[0]+`,`+this.color[1]+`,`+this.color[2]+`,`+this.color[3]+`)`;
        this.main.ctx.fill();
        this.temp=Vec2(this.point[0]+this.main.canv.width/2,-this.point[1]+this.main.canv.height/2)
        }
    makeAnimation({point,color,size,startTime,endTime,type="linear"}){
        let p;
        let opoint;
        let ocolor;
        let osize;
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
        
        
        if(point){
            funcs.push(()=>this.point=Vec2(opoint[0]+(point[0]-opoint[0])*p(),opoint[1]+(point[1]-opoint[1])*p()));
            tfunc.push(()=>this.point=Vec2(...point));
            opoint=Vec2(...this.point);
        }
        
        if(color){
            funcs.push(()=>this.color=Color(ocolor[0]+(color[0]-ocolor[0])*p(),ocolor[1]+(color[1]-ocolor[1])*p(),ocolor[2]+(color[2]-ocolor[2])*p(),ocolor[3]+(color[3]-ocolor[3])*p()))
            tfunc.push(()=>this.color=Color(...color));
            ocolor=Color(...this.color);
        }
        if(size){
            funcs.push(()=>this.size=[osize+(size-osize)*p()]);
            tfunc.push(()=>this.size=size);
            osize=this.size;
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
        this.point=obj.point?obj.point(t):this.point;
        this.color=obj.color?obj.color(t):this.color;
        this.size=obj.size?obj.size(t):this.size;
    }
}
