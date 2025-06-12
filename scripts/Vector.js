import {Triangle} from './Triangle.js'
export class Vector{
    constructor(main,points){
        this.point=points;
        this.color=[0,0,0,1];
        this.thick=2;
        this.tipSize=3;
        this.main=main;
        this.tip=new Triangle(main,[0,0,0,0,0,0]);
    }
    draw(){
        let phi=Math.atan2(this.point[3]-this.point[1],this.point[2]-this.point[0]);
        let r =Math.sqrt((this.point[3]-this.point[1])**2+(this.point[2]-this.point[0])**2)
        this.tip.point=[r+this.point[0],this.point[1],r-1*this.tipSize+this.point[0],this.tipSize+this.point[1],r-1*this.tipSize+this.point[0],-this.tipSize+this.point[1]];
        this.main.ctx.beginPath();
        this.main.ctx.moveTo(this.point[0]+window.innerWidth/2,-this.point[1]+window.innerHeight/2);
        this.main.ctx.lineTo(this.point[2]+window.innerWidth/2,-this.point[3]+window.innerHeight/2);
        this.main.ctx.strokeStyle=`rgba(`+this.color[0]+`,`+this.color[1]+`,`+this.color[2]+`,`+this.color[3]+`)`;
        this.main.ctx.lineWidth=this.thick;
        this.main.ctx.stroke();
        this.tip.theta=phi;
        this.tip.isFilled=true;
        this.tip.fillColor=this.color;
        this.tip.lineColor=this.color
        this.tip.draw([this.point[0],this.point[1]]);
    }
    update(r,angle){
        this.point[2]=this.point[0]+r*Math.cos(angle);
        this.point[3]=this.point[1]+r*Math.sin(angle);
    }
    makeLinearAnimation(point,color,thick,tipSize,startTime,endTime){
        let dPoint=[point[0]-this.point[0],point[1]-this.point[1],point[2]-this.point[2],point[3]-this.point[3]];
        let dColor=[color[0]-this.color[0],color[1]-this.color[1],color[2]-this.color[2],color[3]-this.color[3]];
        let dThick=thick-this.thick;
        let dTipSize=tipSize-this.tipSize;
        let duration=endTime-startTime;
        //let V=x2-x1/duration
        const f=(delta)=>{
            this.point[0]+=dPoint[0]*delta/duration;
            this.point[1]+=dPoint[1]*delta/duration;
            this.point[2]+=dPoint[2]*delta/duration;
            this.point[3]+=dPoint[3]*delta/duration;
            this.color[0]+=dColor[0]*delta/duration;
            this.color[1]+=dColor[1]*delta/duration;
            this.color[2]+=dColor[2]*delta/duration;
            this.color[3]+=dColor[3]*delta/duration;
            this.thick+=dThick*delta/duration;
            this.tipSize+=dTipSize*delta/duration;
        };
        this.main.addProcess([f,startTime,endTime]);
    }
    makeEaseInAnimation(point,color,thick,tipSize,startTime,endTime){
        let opoint=[...this.point];
        let ocolor=[...this.color];
        let othick=this.thick;
        let otipSize=this.tipSize;
        let t=0;
        
        let dPoint=[point[0]-this.point[0],point[1]-this.point[1],point[2]-this.point[2],point[3]-this.point[3]];
        let dColor=[color[0]-this.color[0],color[1]-this.color[1],color[2]-this.color[2],color[3]-this.color[3]];
        let dThick=thick-this.thick;
        let dTipSize=tipSize-this.tipSize;
        let duration=endTime-startTime;
        
        const f=(delta)=>{
            this.point[0]=opoint[0]+dPoint[0]*(t/duration)**2;
            this.point[1]=opoint[1]+dPoint[1]*(t/duration)**2;
            this.point[2]=opoint[2]+dPoint[2]*(t/duration)**2;
            this.point[3]=opoint[3]+dPoint[3]*(t/duration)**2;
            this.color[0]=ocolor[0]+dColor[0]*(t/duration)**2;
            this.color[1]=ocolor[1]+dColor[1]*(t/duration)**2;
            this.color[2]=ocolor[2]+dColor[2]*(t/duration)**2;
            this.color[3]=ocolor[3]+dColor[3]*(t/duration)**2;
            this.thick=othick+dThick*(t/duration)**2;
            this.tipSize=otipSize+dTipSize*(t/duration)**2;
            t+=delta;
            if(t>=duration){
                this.point[0]=point[0];
                this.point[1]=point[1];
                this.point[2]=point[2];
                this.point[3]=point[3];
                this.color[0]=color[0];
                this.color[1]=color[1];
                this.color[2]=color[2];
                this.color[3]=color[3];
                this.thick=thick;
                this.tipSize=tipSize;
            }
        };
        this.main.addProcess([f,startTime,endTime]);
    }
    makeEaseOutAnimation(point,color,thick,tipSize,startTime,endTime){
        let opoint=[...this.point];
        let ocolor=[...this.color];
        let othick=this.thick;
        let otipSize=this.tipSize;
        let t=0;
        
        let dPoint=[point[0]-this.point[0],point[1]-this.point[1],point[2]-this.point[2],point[3]-this.point[3]];
        let dColor=[color[0]-this.color[0],color[1]-this.color[1],color[2]-this.color[2],color[3]-this.color[3]];
        let dThick=thick-this.thick;
        let dTipSize=tipSize-this.tipSize;
        let duration=endTime-startTime;
        
        const f=(delta)=>{
            this.point[0]=opoint[0]+dPoint[0]*(1-(1-t/duration)**2);
            this.point[1]=opoint[1]+dPoint[1]*(1-(1-t/duration)**2);
            this.point[2]=opoint[2]+dPoint[2]*(1-(1-t/duration)**2);
            this.point[3]=opoint[3]+dPoint[3]*(1-(1-t/duration)**2);
            this.color[0]=ocolor[0]+dColor[0]*(1-(1-t/duration)**2);
            this.color[1]=ocolor[1]+dColor[1]*(1-(1-t/duration)**2);
            this.color[2]=ocolor[2]+dColor[2]*(1-(1-t/duration)**2);
            this.color[3]=ocolor[3]+dColor[3]*(1-(1-t/duration)**2);
            this.thick=othick+dThick*(1-(1-t/duration)**2);
            this.tipSize=otipSize+dTipSize*(1-(1-t/duration)**2);
            t+=delta;
            if(t>=duration){
                this.point[0]=point[0];
                this.point[1]=point[1];
                this.point[2]=point[2];
                this.point[3]=point[3];
                this.color[0]=color[0];
                this.color[1]=color[1];
                this.color[2]=color[2];
                this.color[3]=color[3];
                this.thick=thick;
                this.tipSize=tipSize;
            }
        };
        this.main.addProcess([f,startTime,endTime]);
    }
    makeEaseInOutAnimation(point,color,thick,tipSize,startTime,endTime){
        let opoint=[...this.point];
        let ocolor=[...this.color];
        let othick=this.thick;
        let otipSize=this.tipSize;
        let t=0;
        
        let dPoint=[point[0]-this.point[0],point[1]-this.point[1],point[2]-this.point[2],point[3]-this.point[3]];
        let dColor=[color[0]-this.color[0],color[1]-this.color[1],color[2]-this.color[2],color[3]-this.color[3]];
        let dThick=thick-this.thick;
        let dTipSize=tipSize-this.tipSize;
        let duration=endTime-startTime;
        const f=(delta)=>{
            //(3*(t/duration)**2-2*(t/duration)**3)
            this.point[0]=opoint[0]+dPoint[0]*(3*(t/duration)**2-2*(t/duration)**3);
            this.point[1]=opoint[1]+dPoint[1]*(3*(t/duration)**2-2*(t/duration)**3);
            this.point[2]=opoint[2]+dPoint[2]*(3*(t/duration)**2-2*(t/duration)**3);
            this.point[3]=opoint[3]+dPoint[3]*(3*(t/duration)**2-2*(t/duration)**3);
            this.color[0]=ocolor[0]+dColor[0]*(3*(t/duration)**2-2*(t/duration)**3);
            this.color[1]=ocolor[1]+dColor[1]*(3*(t/duration)**2-2*(t/duration)**3);
            this.color[2]=ocolor[2]+dColor[2]*(3*(t/duration)**2-2*(t/duration)**3);
            this.color[3]=ocolor[3]+dColor[3]*(3*(t/duration)**2-2*(t/duration)**3);
            this.thick=othick+dThick*(3*(t/duration)**2-2*(t/duration)**3);
            this.tipSize=otipSize+dTipSize*(3*(t/duration)**2-2*(t/duration)**3);
            t+=delta;
            if(t>=duration){
                this.point[0]=point[0];
                this.point[1]=point[1];
                this.point[2]=point[2];
                this.point[3]=point[3];
                this.color[0]=color[0];
                this.color[1]=color[1];
                this.color[2]=color[2];
                this.color[3]=color[3];
                this.thick=thick;
                this.tipSize=tipSize;
            }
        }
        this.main.addProcess([f,startTime,endTime]);
    }
}

