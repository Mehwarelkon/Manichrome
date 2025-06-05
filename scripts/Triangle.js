export class Triangle{
    constructor(main,point){//points =[x1,y1,x2,y2,x3,y3]
        this.point=point;
        this.lineColor=[0,0,0,1];
        this.fillColor=[0,0,0,1];
        this.thick=2;
        this.isLine=true;
        this.isFilled=false;
        this.main=main;
        this.theta=0;
    }
    draw(cent){
        let center,r1,phi1,r2,phi2,r3,phi3;
        if(cent==undefined){
         center=[(Math.min(this.point[0],this.point[2],this.point[4])+Math.max(this.point[0],this.point[2],this.point[4]))/2,(Math.min(this.point[1],this.point[3],this.point[5])+Math.max(this.point[1],this.point[3],this.point[5]))/2];
          }
        else{
            center = cent
        }
        r1 = Math.sqrt((center[0]-this.point[0])**2+(center[1]-this.point[1])**2);
         phi1=Math.atan2(this.point[1]-center[1],this.point[0]-center[0]);
         r2 = Math.sqrt((center[0]-this.point[2])**2+(center[1]-this.point[3])**2);
         phi2=Math.atan2(this.point[3]-center[1],this.point[2]-center[0]);
         r3 = Math.sqrt((center[0]-this.point[4])**2+(center[1]-this.point[5])**2);
         phi3=Math.atan2(this.point[5]-center[1],this.point[4]-center[0]);
       
        
        
        console.log(center);
        this.main.ctx.beginPath();
        this.main.ctx.moveTo((center[0]+r1*Math.cos(phi1+this.theta))+window.innerWidth/2,-(center[1]+r1*Math.sin(phi1+this.theta))+window.innerHeight/2);
        this.main.ctx.lineTo((center[0]+r2*Math.cos(phi2+this.theta))+window.innerWidth/2,-(center[1]+r2*Math.sin(phi2+this.theta))+window.innerHeight/2);
        this.main.ctx.lineTo((center[0]+r3*Math.cos(phi3+this.theta))+window.innerWidth/2,-(center[1]+r3*Math.sin(phi3+this.theta))+window.innerHeight/2);
        this.main.ctx.closePath();
        if(this.isLine){
            this.main.ctx.strokeStyle=`rgba(`+this.lineColor[0]+`,`+this.lineColor[1]+`,`+this.lineColor[2]+`,`+this.lineColor[3]+`)`;
            this.main.ctx.stroke();
        }
        if(this.isFilled){
            this.main.ctx.fillStyle=`rgba(`+this.fillColor[0]+`,`+this.fillColor[1]+`,`+this.fillColor[2]+`,`+this.fillColor[3]+`)`;
            this.main.ctx.fill();
        }
    }
}

