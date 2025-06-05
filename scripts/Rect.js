export class Rect{
    constructor(main,width,height,center){//center is like [x1,y1]
        this.main=main;
        this.width=width;
        this.height=height;
        this.center=center;
        this.lineColor=[0,0,0,1];
        this.fillColor=[0,0,0,1];
        this.thick=2;
        this.isLine=true;
        this.isFilled=false;
        this.scale=[1,1];
        this.theta=0;
    }
    /*
    draw(){
        this.main.ctx.beginPath();
        this.main.ctx.moveTo(this.center[0]-this.width*this.scale[0]/2 +window.innerWidth/2,-this.center[1] +this.height*this.scale[1]/2 +window.innerHeight/2);
        this.main.ctx.lineTo(this.center[0]-this.width*this.scale[0]/2 +window.innerWidth/2,-this.center[1] -this.height*this.scale[1]/2 +window.innerHeight/2);
        this.main.ctx.lineTo(this.center[0]+this.width*this.scale[0]/2 +window.innerWidth/2,-this.center[1] -this.height*this.scale[1]/2 +window.innerHeight/2);
        this.main.ctx.lineTo(this.center[0]+this.width*this.scale[0]/2 +window.innerWidth/2,-this.center[1] +this.height*this.scale[1]/2 +window.innerHeight/2);
        this.main.ctx.closePath();
        //this.main.ctx.lineTo(this.center[0]-this.width/2 +window.innerWidth/2,-this.center[1] +this.height/2 +window.innerHeight);
        if(this.isLine){
            this.main.ctx.strokeStyle=`rgba(`+this.lineColor[0]+`,`+this.lineColor[1]+`,`+this.lineColor[2]+`,`+this.lineColor[3]+`)`;
            this.main.ctx.stroke();
        }
        if(this.isFilled){
            this.main.ctx.fillStyle=`rgba(`+this.fillColor[0]+`,`+this.fillColor[1]+`,`+this.fillColor[2]+`,`+this.fillColor[3]+`)`;
            this.main.ctx.fill();
        }
    }*/
    draw(){
        let r=Math.sqrt((this.width/2)**2+(this.height/2)**2);
        let phi = Math.atan2(this.height,this.width);
        
        this.main.ctx.beginPath();
        this.main.ctx.moveTo(this.center[0]+r*Math.cos(-Math.PI+phi+this.theta)*this.scale[0] +window.innerWidth/2,-this.center[1] -r*Math.sin(-Math.PI+phi+this.theta)*this.scale[1] +window.innerHeight/2);
        this.main.ctx.lineTo(this.center[0]+r*Math.cos(Math.PI-phi+this.theta)*this.scale[0] +window.innerWidth/2,-this.center[1] -r*Math.sin(Math.PI-phi+this.theta)*this.scale[1] +window.innerHeight/2);
        this.main.ctx.lineTo(this.center[0]+r*Math.cos(phi+this.theta)*this.scale[0] +window.innerWidth/2,-this.center[1] -r*Math.sin(phi+this.theta)*this.scale[1] +window.innerHeight/2);
        this.main.ctx.lineTo(this.center[0]+r*Math.cos(-phi+this.theta)*this.scale[0] +window.innerWidth/2,-this.center[1] -r*Math.sin(-phi+this.theta)*this.scale[1] +window.innerHeight/2);
        this.main.ctx.closePath();
        //this.main.ctx.lineTo(this.center[0]-this.width/2 +window.innerWidth/2,-this.center[1] +this.height/2 +window.innerHeight);
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

