import {Color,Vec2} from "./DataTypes.js";
export class Rect{
    constructor({main,width,height,center,lineColor=Color(0,0,0,1),fillColor=Color(0,0,0,1),thick=2,isLine=true,isFilled=false,theta=0}){//center is like [x1,y1]
        this.main=main;
        this.width=width;
        this.height=height;
        this.center=center;
        this.lineColor=lineColor;
        this.fillColor=fillColor;
        this.thick=thick;
        this.isLine=isLine;
        this.isFilled=isFilled;
        //this.scale=[1,1];
        this.theta=theta;
    }
    draw(){
        let r=Math.hypot((this.width/2),(this.height/2));
        let phi = Math.atan2(this.height,this.width);
        
        this.main.ctx.beginPath();
        this.main.ctx.moveTo(this.center[0]+r*Math.cos(-Math.PI+phi+this.theta)+window.innerWidth/2,-this.center[1] -r*Math.sin(-Math.PI+phi+this.theta)+window.innerHeight/2);
        this.main.ctx.lineTo(this.center[0]+r*Math.cos(Math.PI-phi+this.theta) +window.innerWidth/2,-this.center[1] -r*Math.sin(Math.PI-phi+this.theta) +window.innerHeight/2);
        this.main.ctx.lineTo(this.center[0]+r*Math.cos(phi+this.theta) +window.innerWidth/2,-this.center[1] -r*Math.sin(phi+this.theta) +window.innerHeight/2);
        this.main.ctx.lineTo(this.center[0]+r*Math.cos(-phi+this.theta) +window.innerWidth/2,-this.center[1] -r*Math.sin(-phi+this.theta) +window.innerHeight/2);
        this.main.ctx.closePath();
        //this.main.ctx.lineTo(this.center[0]-this.width/2 +window.innerWidth/2,-this.center[1] +this.height/2 +window.innerHeight);
        if(this.isLine){
            this.main.ctx.strokeStyle=this.lineColor.getColor();
            this.main.ctx.stroke();
        }
        if(this.isFilled){
            this.main.ctx.fillStyle=this.fillColor.getColor();
            this.main.ctx.fill();
        }
    }
    makeAnimation({width,height,center,lineColor,fillColor,thick,theta,startTime,endTime,type="linear"}){
        let p;
        let owidth;
        let oheight;
        let ocenter;
        let olineColor;
        let ofillColor;
        let othick;
        let otheta;
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
        if(width){
            funcs.push(()=>this.width=owidth+(width-owidth)*p());
            tfunc.push(()=>this.width=width);
            owidth=this.width;
        }
        if(height){
            funcs.push(()=>this.height=oheight+(height-oheight)*p());
            tfunc.push(()=>this.height=height);
            oheight=this.height;
        }
        if(center){
            funcs.push(()=>this.center= ocenter.add(center.sub(ocenter).mul(p()))  )//[ocenter[0]+(center[0]-ocenter[0])*p(),ocenter[1]+(center[1]-ocenter[1])*p()]);
            tfunc.push(()=>this.center=center.clone());
            ocenter=this.center.clone();
        }
        if(thick){
            funcs.push(()=>this.thick=othick+(thick-othick)*p());
            tfunc.push(()=>this.thick=thick);
            othick=this.thick;
        }
        if(lineColor){
            funcs.push(()=>this.lineColor=Color(olineColor[0]+(lineColor[0]-olineColor[0])*p(),olineColor[1]+(lineColor[1]-olineColor[1])*p(),olineColor[2]+(lineColor[2]-olineColor[2])*p(),olineColor[3]+(lineColor[3]-olineColor[3])*p()));
            tfunc.push(()=>this.lineColor=Color(...lineColor));
            olineColor=Color(...this.lineColor);
        }
        if(fillColor){
            funcs.push(()=>this.fillColor=Color(ofillColor[0]+(fillColor[0]-ofillColor[0])*p(),ofillColor[1]+(fillColor[1]-ofillColor[1])*p(),ofillColor[2]+(fillColor[2]-ofillColor[2])*p(),ofillColor[3]+(fillColor[3]-ofillColor[3])*p()));
            tfunc.push(()=>this.fillColor=Color(...fillColor));
            ofillColor=Color(...this.fillColor);
        }
	if(theta){
	funcs.push(()=>this.theta=otheta+(theta-otheta)*p());
	tfunc.push(()=>this.theta=theta);
	otheta=this.theta;
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

