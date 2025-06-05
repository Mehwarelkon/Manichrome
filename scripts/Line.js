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
}


