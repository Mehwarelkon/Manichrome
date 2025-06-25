import {Color,Vec2} from './DataTypes.js';
export class Grid{
    constructor({main,px=50,py=50,d=0,axisColor=Color(0,0,0,1),axisThick=2,color=Color(0,0,0,1),thick=1,dThick=0.3}){
        this.main=main;
        this.px=px;
        this.py=py;
        this.d=d;//devidor
        this.axisColor=axisColor;
        this.axisThick=axisThick;
        this.color=color;
        this.thick=thick;
        this.dThick=dThick;
    }
    draw(){
        //axis
        this.main.ctx.beginPath();
        this.main.ctx.moveTo(0,window.innerHeight/2);
        this.main.ctx.lineTo(window.innerWidth,window.innerHeight/2);
        this.main.ctx.moveTo(window.innerWidth/2,0);
        this.main.ctx.lineTo(window.innerWidth/2,window.innerHeight);
        this.main.ctx.strokeStyle=this.axisColor.getColor();
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
        this.main.ctx.strokeStyle=this.color.getColor();
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
        this.main.ctx.strokeStyle=this.color.getColor();
        this.main.ctx.lineWidth=this.dThick;
        this.main.ctx.stroke();
    }
}

