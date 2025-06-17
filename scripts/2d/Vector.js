import {Triangle} from './Triangle.js'
export class Vector{
    constructor({main,point1,point2,color=[0,0,0,1],thick=2,tipSize=3}){
        this.point1=point1;
	this.point2=point2;
        this.color=color;
        this.thick=thick;
        this.tipSize=tipSize;
        this.main=main;
        this.tip=new Triangle({main:main,point1:[0,0],point2:[0,0],point3:[0,0]});
    }
    draw(){
        let phi=Math.atan2(this.point2[1]-this.point1[1],this.point2[0]-this.point1[0]);
        let r =Math.sqrt((this.point2[1]-this.point1[1])**2+(this.point2[0]-this.point1[0])**2)
        this.tip.point1=[r+this.point1[0],this.point1[1]];
        this.tip.point2=[r-1*this.tipSize+this.point1[0],this.tipSize+this.point1[1]];
        this.tip.point3=[r-1*this.tipSize+this.point1[0],-this.tipSize+this.point1[1]]
        this.main.ctx.beginPath();
        this.main.ctx.moveTo(this.point1[0]+window.innerWidth/2,-this.point1[1]+window.innerHeight/2);
        this.main.ctx.lineTo(this.point2[0]+window.innerWidth/2,-this.point2[1]+window.innerHeight/2);
        this.main.ctx.strokeStyle=`rgba(`+this.color[0]+`,`+this.color[1]+`,`+this.color[2]+`,`+this.color[3]+`)`;
        this.main.ctx.lineWidth=this.thick;
        this.main.ctx.stroke();
        this.tip.theta=phi;
        this.tip.isFilled=true;
        this.tip.fillColor=this.color;
        this.tip.lineColor=this.color
        this.tip.draw([this.point1[0],this.point1[1]]);
    }
    update(r,angle){
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
            funcs.push(()=>this.point1=[opoint1[0]+(point1[0]-opoint1[0])*p(),opoint1[1]+(point1[1]-opoint1[1])*p()]);
            tfunc.push(()=>this.point1=[...point1]);
            opoint1=[...this.point1];
        }
        if(point2){
            funcs.push(()=>this.point2=[opoint2[0]+(point2[0]-opoint2[0])*p(),opoint2[1]+(point2[1]-opoint2[1])*p()]);
            tfunc.push(()=>this.point2=[...point2]);
            opoint2=[...this.point2];
        }
        if(thick){
            funcs.push(()=>this.thick=othick+(thick-othick)*p());
            tfunc.push(()=>this.thick=thick);
            othick=this.thick;
        }
        if(color){
            funcs.push(()=>this.color=[ocolor[0]+(color[0]-ocolor[0])*p(),ocolor[1]+(color[1]-ocolor[1])*p(),ocolor[2]+(color[2]-ocolor[2])*p(),ocolor[3]+(color[3]-ocolor[3])*p()]);
            tfunc.push(()=>this.color=[...color]);
            ocolor=[...this.color];
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

}

