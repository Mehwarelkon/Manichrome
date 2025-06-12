export class LinearPath{
    constructor(main,points){//points =[x1,y1,x2,y2.....]
        this.points=points;
        this.main=main;
        this.color=[];
        this.thick=2;
    }
    draw(){/*
        this.main.ctx.beginPath();
        this.main.ctx.moveTo(this.points[0],this.points[1]);
        this.main.ctx.lineTo(this.points[2],this.points[3]);
        this.main.ctx.strokeStyle=`rgba(`+this.color[0][0]+`,`+this.color[0][1]+`,`+this.color[0][2]+`,`+this.color[0][3]+`)`;
        this.main.lineWidth=this.thick; 
        this.main.ctx.stroke();*/
        for(let i=0;i<this.points.length-2;i+=2){
            this.main.ctx.beginPath();
            this.main.ctx.moveTo(this.points[i]+window.innerWidth/2,-this.points[i+1]+window.innerHeight/2);
            this.main.ctx.lineTo(this.points[i+2]+window.innerWidth/2,-this.points[i+3]+window.innerHeight/2);
            this.main.ctx.strokeStyle=`rgba(`+this.color[i/2][0]+`,`+this.color[i/2][1]+`,`+this.color[i/2][2]+`,`+this.color[i/2][3]+`)`;
            this.main.lineWidth=this.thick; 
            this.main.ctx.stroke();
        }
    }
}

