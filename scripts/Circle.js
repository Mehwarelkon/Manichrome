
export class Circle{//circle 🙂
    constructor(main,center,raduis,angle){
        this.center=center;//[x,y]
        this.r=raduis;
        this.endAngle=angle;//Math.PI
        this.startAngle=0;
        this.deltaAngle=this.endAngle-this.startAngle;
        this.thick=1;
        this.lineColor=[0,0,0,1];
        this.isLine=true;
        this.isClosed=false;//if the circle is full please make isclosed false cuz its already is 
        this.isFilled=false;
        this.fillColor=[255,0,0,1];
        this.main=main;
    }
    draw(){
        this.main.ctx.beginPath();
        this.main.ctx.arc(this.center[0]+window.innerWidth/2,-this.center[1]+window.innerHeight/2,this.r,-this.startAngle,-this.endAngle,true);
        //arc angles cant be negative so i need to revert it ,but since -180 to 180 is a full circle the normal method(this.angle(endAngle)) will make it 180 to 180 so nothing will draw thats why i added the deltaAngle
        if(this.isLine){
            this.main.ctx.strokeStyle=`rgba(`+this.lineColor[0]+`,`+this.lineColor[1]+`,`+this.lineColor[2]+`,`+this.lineColor[3]+`)`;
            this.main.ctx.lineWidth=this.thick;
            if(this.isClosed){this.main.ctx.closePath();}
            this.main.ctx.stroke()}
        if(this.isFilled){
            this.main.ctx.fillStyle=`rgba(`+this.fillColor[0]+`,`+this.fillColor[1]+`,`+this.fillColor[2]+`,`+this.fillColor[3]+`)`;
            this.main.ctx.fill();
        }
        
    }
    /*angle(angle){if(angle<0){//arc doesnt work with negative angles so i fixed it 
        return (angle/(2*Math.PI)-Math.floor(angle/(2*Math.PI)))*2*Math.PI;
    }
    else {return angle}}*/
}

