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
    
}

