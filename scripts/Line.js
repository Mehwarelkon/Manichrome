export class Line {//point =[x1,y1,x2,y2] other non important member variables get called after initializing 
    constructor(main,point){//color is an array 
        this.point=point;
        this.Main=main;
        this.ctx=main.ctx;
        this.thick=1
        this.color=[0,0,0,1]//array of [r,g,b,a]
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.strokeStyle=`rgba(`+this.color[0]+`,`+this.color[1]+`,`+this.color[2]+`,`+this.color[3]+`)`;
        this.ctx.lineWidth=this.thick
        this.ctx.moveTo(this.point[0]+(window.innerWidth)/2,-this.point[1] +(window.innerHeight)/2);
        this.ctx.lineTo(this.point[2]+(window.innerWidth)/2,-this.point[3] +(window.innerHeight)/2);
        this.ctx.stroke();
    }
    update(r,theta){
            this.point[2]=this.point[0]+r*Math.cos(theta);
            this.point[3]=this.point[1]+r*Math.sin(theta);
        }
    makeLinearAnimation(point,color,thick,startTime,endTime){
        let dPoint=[point[0]-this.point[0],point[1]-this.point[1],point[2]-this.point[2],point[3]-this.point[3]];
        let dColor=[color[0]-this.color[0],color[1]-this.color[1],color[2]-this.color[2],color[3]-this.color[3]];
        let dThick=thick-this.thick;
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
        };
        this.Main.addProcess([f,startTime,endTime]);
    }
    makeEaseInAnimation(point,color,thick,startTime,endTime){
        let opoint=[...this.point];
        let ocolor=[...this.color];
        let othick=this.thick;
        let t=0;
        
        let dPoint=[point[0]-this.point[0],point[1]-this.point[1],point[2]-this.point[2],point[3]-this.point[3]];
        let dColor=[color[0]-this.color[0],color[1]-this.color[1],color[2]-this.color[2],color[3]-this.color[3]];
        let dThick=thick-this.thick;
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
            }
        };
        this.Main.addProcess([f,startTime,endTime]);
    }
    makeEaseOutAnimation(point,color,thick,startTime,endTime){
        let opoint=[...this.point];
        let ocolor=[...this.color];
        let othick=this.thick;
        let t=0;
        
        let dPoint=[point[0]-this.point[0],point[1]-this.point[1],point[2]-this.point[2],point[3]-this.point[3]];
        let dColor=[color[0]-this.color[0],color[1]-this.color[1],color[2]-this.color[2],color[3]-this.color[3]];
        let dThick=thick-this.thick;
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
            }
        };
        this.Main.addProcess([f,startTime,endTime]);
    }
    /*makeEaseInOutAnimation(point,color,thick,startTime,endTime){
        let opoint=[...this.point];
        let ocolor=[...this.color];
        let othick=this.thick;
        let t=0;
        
        let dPoint=[point[0]-this.point[0],point[1]-this.point[1],point[2]-this.point[2],point[3]-this.point[3]];
        let dColor=[color[0]-this.color[0],color[1]-this.color[1],color[2]-this.color[2],color[3]-this.color[3]];
        let dThick=thick-this.thick;
        let duration=endTime-startTime;
        const f=(delta)=>{
            (0.62996052495*Math.cbrt(t/duration-0.5)+0.5)
            this.point[0]=opoint[0]+dPoint[0]*(0.62996052495*Math.cbrt(t/duration-0.5)+0.5);
            this.point[1]=opoint[1]+dPoint[1]*(0.62996052495*Math.cbrt(t/duration-0.5)+0.5);
            this.point[2]=opoint[2]+dPoint[2]*(0.62996052495*Math.cbrt(t/duration-0.5)+0.5);
            this.point[3]=opoint[3]+dPoint[3]*(0.62996052495*Math.cbrt(t/duration-0.5)+0.5);
            this.color[0]=ocolor[0]+dColor[0]*(0.62996052495*Math.cbrt(t/duration-0.5)+0.5);
            this.color[1]=ocolor[1]+dColor[1]*(0.62996052495*Math.cbrt(t/duration-0.5)+0.5);
            this.color[2]=ocolor[2]+dColor[2]*(0.62996052495*Math.cbrt(t/duration-0.5)+0.5);
            this.color[3]=ocolor[3]+dColor[3]*(0.62996052495*Math.cbrt(t/duration-0.5)+0.5);
            this.thick=othick+dThick*(0.62996052495*Math.cbrt(t/duration-0.5)+0.5);
            t+=delta;
        }
        this.Main.addProcess([f,startTime,endTime]);
    }*/
    makeEaseInOutAnimation(point,color,thick,startTime,endTime){
        let opoint=[...this.point];
        let ocolor=[...this.color];
        let othick=this.thick;
        let t=0;
        
        let dPoint=[point[0]-this.point[0],point[1]-this.point[1],point[2]-this.point[2],point[3]-this.point[3]];
        let dColor=[color[0]-this.color[0],color[1]-this.color[1],color[2]-this.color[2],color[3]-this.color[3]];
        let dThick=thick-this.thick;
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
            }
        }
        this.Main.addProcess([f,startTime,endTime]);
    }
    
}


