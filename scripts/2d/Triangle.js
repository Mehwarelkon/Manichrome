
import {Color,Vec2,devOrigin} from './DataTypes.js';
export class Triangle{
    constructor({main,point1=Vec2(-50,-50),point2=Vec2(50,-50),point3=Vec2(0,50),lineColor=Color(0,0,0,1),fillColor=Color(0,0,0,1),thick=2,isLine=true,isFilled=false,theta=0}){//points =[x1,y1,x2,y2,x3,y3]
        this.point1=point1;
        this.point2=point2;
        this.point3=point3;
        this.lineColor=lineColor;
        this.fillColor=fillColor;
        this.thick=thick;
        this.isLine=isLine;
        this.isFilled=isFilled;
        this.main=main;
        this.theta=theta;
    }
    draw(cent){
        let center,r1,phi1,r2,phi2,r3,phi3;
        if(cent==undefined){
         center=Vec2((Math.min(this.point1[0],this.point2[0],this.point3[0])+Math.max(this.point1[0],this.point2[0],this.point3[0]))/2,(Math.min(this.point1[1],this.point2[1],this.point3[1])+Math.max(this.point1[1],this.point2[1],this.point3[1]))/2);
          }
        else{
            center = cent
        }
        ;
       // console.log(JSON.stringify(center.type))
        r1 =center.sub(this.point1).getLength();// Math.sqrt((center[0]-this.point1[0])**2+(center[1]-this.point1[1])**2);
        phi1=this.point1.sub(center).getAngle();//Math.atan2(this.point1[1]-center[1],this.point1[0]-center[0]);
         r2 = center.sub(this.point2).getLength() // Math.sqrt((center[0]-this.point2[0])**2+(center[1]-this.point2[1])**2);
         phi2=this.point2.sub(center).getAngle()//Math.atan2(this.point2[1]-center[1],this.point2[0]-center[0]);
         r3 = center.sub(this.point3).getLength()//Math.sqrt((center[0]-this.point3[0])**2+(center[1]-this.point3[1])**2);
         phi3=this.point3.sub(center).getAngle()//Math.atan2(this.point3[1]-center[1],this.point3[0]-center[0]);
       
        
        
        //console.log(center);
        this.main.ctx.beginPath();
        this.main.ctx.moveTo(...(Vec2(center[0]+r1*Math.cos(phi1+this.theta),-center[1]-r1*Math.sin(phi1+this.theta)).add(this.main.d.mul(0.5))));//(center[0]+r1*Math.cos(phi1+this.theta))+window.innerWidth/2,-(center[1]+r1*Math.sin(phi1+this.theta))+window.innerHeight/2);
        this.main.ctx.lineTo(...(Vec2(center[0]+r2*Math.cos(phi2+this.theta),-center[1]-r2*Math.sin(phi2+this.theta)).add(this.main.d.mul(0.5))));//(center[0]+r2*Math.cos(phi2+this.theta))+window.innerWidth/2,-(center[1]+r2*Math.sin(phi2+this.theta))+window.innerHeight/2);
        this.main.ctx.lineTo(...(Vec2(center[0]+r3*Math.cos(phi3+this.theta),-center[1]-r3*Math.sin(phi3+this.theta)).add(this.main.d.mul(0.5))));//(center[0]+r3*Math.cos(phi3+this.theta))+window.innerWidth/2,-(center[1]+r3*Math.sin(phi3+this.theta))+window.innerHeight/2);
        this.main.ctx.closePath();
        if(this.isLine){
            this.main.ctx.lineWidth=this.thick;
            this.main.ctx.strokeStyle=this.lineColor.getColor();
            this.main.ctx.stroke();
        }
        if(this.isFilled){
            this.main.ctx.fillStyle=this.fillColor.getColor();
            this.main.ctx.fill();
        }
    }
    makeAnimation({point1,point2,point3,lineColor,fillColor,thick,theta,startTime,endTime,type='linear'}){
        let p;
        let opoint1;
        let opoint2;
        let opoint3;
        let ofillColor;
        let olineColor;
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
        if(point1){
            funcs.push(()=>this.point1=opoint1.add(point1.sub(opoint1).mul(p()))  )//[ocenter[0]+(center[0]-ocenter[0])*p(),ocenter[1]+(center[1]-ocenter[1])*p()]);
            tfunc.push(()=>this.point1=point1.clone());
            opoint1=this.point1.clone();
        }
        if(point2){
            funcs.push(()=>this.point2= opoint2.add(point2.sub(opoint1).mul(p()))  )//[ocenter[0]+(center[0]-ocenter[0])*p(),ocenter[1]+(center[1]-ocenter[1])*p()]);
            tfunc.push(()=>this.point2=point2.clone());
            opoint2=this.point2.clone();
        }
        if(point3){
            funcs.push(()=>this.point3= opoint3.add(point3.sub(opoint3).mul(p()))  )//[ocenter[0]+(center[0]-ocenter[0])*p(),ocenter[1]+(center[1]-ocenter[1])*p()]);
            tfunc.push(()=>this.point3=point3.clone());
            opoint3=this.point3.clone();
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
    bind(obj,t){
        this.thick=obj.thick?obj.thick(t):this.thick;
        this.lineColor=obj.lineColor?obj.lineColor(t):this.lineColor;
        this.fillColor=obj.fillColor?obj.fillColor(t):this.fillColor;
        this.theta=obj.theta?obj.theta(t):this.theta;
        this.point1=obj.point1?obj.point1(t):this.point1;
        this.point2=obj.point2?obj.point2(t):this.point2;
        this.point3=obj.point3?obj.point3(t):this.point3;
    }
}

