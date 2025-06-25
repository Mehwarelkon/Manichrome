
import {Color,Vec2,devOrigin} from './DataTypes.js';
export class Triangle{
    constructor({main,point1,point2,point3,lineColor=Color(0,0,0,1),fillColor=Color(0,0,0,1),thick=2,isLine=true,isFilled=false,theta=0}){//points =[x1,y1,x2,y2,x3,y3]
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
        console.log(JSON.stringify(center.type))
        r1 =center.sub(this.point1).getLength();// Math.sqrt((center[0]-this.point1[0])**2+(center[1]-this.point1[1])**2);
        phi1=this.point1.sub(center).getAngle();//Math.atan2(this.point1[1]-center[1],this.point1[0]-center[0]);
         r2 = center.sub(this.point2).getLength() // Math.sqrt((center[0]-this.point2[0])**2+(center[1]-this.point2[1])**2);
         phi2=this.point2.sub(center).getAngle()//Math.atan2(this.point2[1]-center[1],this.point2[0]-center[0]);
         r3 = center.sub(this.point3).getLength()//Math.sqrt((center[0]-this.point3[0])**2+(center[1]-this.point3[1])**2);
         phi3=this.point3.sub(center).getAngle()//Math.atan2(this.point3[1]-center[1],this.point3[0]-center[0]);
       
        
        
        //console.log(center);
        this.main.ctx.beginPath();
        this.main.ctx.moveTo(...Vec2(center[0]+r1*Math.cos(phi1+this.theta),center[1]+r1*Math.sin(phi1+this.theta)).devFix());//(center[0]+r1*Math.cos(phi1+this.theta))+window.innerWidth/2,-(center[1]+r1*Math.sin(phi1+this.theta))+window.innerHeight/2);
        this.main.ctx.lineTo(...Vec2(center[0]+r2*Math.cos(phi2+this.theta),center[1]+r2*Math.sin(phi2+this.theta)).devFix());//(center[0]+r2*Math.cos(phi2+this.theta))+window.innerWidth/2,-(center[1]+r2*Math.sin(phi2+this.theta))+window.innerHeight/2);
        this.main.ctx.lineTo(...Vec2(center[0]+r3*Math.cos(phi3+this.theta),center[1]+r3*Math.sin(phi3+this.theta)).devFix());//(center[0]+r3*Math.cos(phi3+this.theta))+window.innerWidth/2,-(center[1]+r3*Math.sin(phi3+this.theta))+window.innerHeight/2);
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
}

