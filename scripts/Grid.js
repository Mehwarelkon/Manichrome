export class Grid{
    constructor(main,pX,pY,deviders){
        this.main=main;
        this.px=pX;
        this.py=pY;
        this.d=deviders;
        this.axisColor=[0,0,0,1];
        this.axisThick=2;
        this.color=[0,0,0,1];
        this.thick=1;
        this.dThick=0.3;
    }
    draw(){
        //axis
        this.main.ctx.beginPath();
        this.main.ctx.moveTo(0,window.innerHeight/2);
        this.main.ctx.lineTo(window.innerWidth,window.innerHeight/2);
        this.main.ctx.moveTo(window.innerWidth/2,0);
        this.main.ctx.lineTo(window.innerWidth/2,window.innerHeight);
        this.main.ctx.strokeStyle=`rgba(`+this.axisColor[0]+`,`+this.axisColor[1]+`,`+this.axisColor[2]+`,`+this.axisColor[3]+`)`;
        this.main.ctx.lineWidth=this.axisThick;
        this.main.ctx.stroke();
        //main grid
        //horizontal
        this.main.ctx.beginPath();
        for(let i=this.py;i<=window.innerHeight/2;i+=this.py){
            this.main.ctx.moveTo(0,window.innerHeight/2+i);
            this.main.ctx.lineTo(window.innerWidth,window.innerHeight/2+i);
            this.main.ctx.moveTo(0,window.innerHeight/2-i);
            this.main.ctx.lineTo(window.innerWidth,window.innerHeight/2-i);
        }
        //vertical
        for(let i=this.px;i<=window.innerWidth/2;i+=this.px){
            this.main.ctx.moveTo(window.innerWidth/2+i,0);
            this.main.ctx.lineTo(window.innerWidth/2+i,window.innerHeight);
            this.main.ctx.moveTo(window.innerWidth/2-i,0);
            this.main.ctx.lineTo(window.innerWidth/2-i,window.innerHeight);
        }
        this.main.ctx.strokeStyle=`rgba(`+this.color[0]+`,`+this.color[1]+`,`+this.color[2]+`,`+this.color[3]+`)`;
        this.main.ctx.lineWidth=this.thick;
        this.main.ctx.stroke();
        //deviders
        this.main.ctx.beginPath();
        for(let i=this.py/(this.d+1);i<=window.innerHeight/2;i+=this.py/(this.d+1)){
            if(i%this.py==0){continue;}
            this.main.ctx.moveTo(0,window.innerHeight/2+i);
            this.main.ctx.lineTo(window.innerWidth,window.innerHeight/2+i);
            this.main.ctx.moveTo(0,window.innerHeight/2-i);
            this.main.ctx.lineTo(window.innerWidth,window.innerHeight/2-i);
        }
        for(let i=this.px/(this.d+1);i<=window.innerWidth/2;i+=this.px/(this.d+1)){
            if(i%this.px==0){continue;}
            this.main.ctx.moveTo(window.innerWidth/2+i,0);
            this.main.ctx.lineTo(window.innerWidth/2+i,window.innerHeight);
            this.main.ctx.moveTo(window.innerWidth/2-i,0);
            this.main.ctx.lineTo(window.innerWidth/2-i,window.innerHeight);
        }
        this.main.ctx.strokeStyle=`rgba(`+this.color[0]+`,`+this.color[1]+`,`+this.color[2]+`,`+this.color[3]+`)`;
        this.main.ctx.lineWidth=this.dThick;
        this.main.ctx.stroke();
    }
}

