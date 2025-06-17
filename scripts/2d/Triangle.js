export class Triangle{
    constructor({main,point1,point2,point3,lineColor=[0,0,0,1],fillColor=[0,0,0,1],thick=2,isLine=true,isFilled=false,theta=0}){//points =[x1,y1,x2,y2,x3,y3]
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
         center=[(Math.min(this.point1[0],this.point2[0],this.point3[0])+Math.max(this.point1[0],this.point2[0],this.point3[0]))/2,(Math.min(this.point1[1],this.point2[1],this.point3[1])+Math.max(this.point1[1],this.point2[1],this.point3[1]))/2];
          }
        else{
            center = cent
        }
        ;
        r1 = Math.sqrt((center[0]-this.point1[0])**2+(center[1]-this.point1[1])**2);
        phi1=Math.atan2(this.point1[1]-center[1],this.point1[0]-center[0]);
         r2 = Math.sqrt((center[0]-this.point2[0])**2+(center[1]-this.point2[1])**2);
         phi2=Math.atan2(this.point2[1]-center[1],this.point2[0]-center[0]);
         r3 = Math.sqrt((center[0]-this.point3[0])**2+(center[1]-this.point3[1])**2);
         phi3=Math.atan2(this.point3[1]-center[1],this.point3[0]-center[0]);
       
        
        
        //console.log(center);
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

