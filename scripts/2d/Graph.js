import {Color,Vec2} from './DataTypes.js'
export class LinearGraph{
    constructor({main,func,dom,px=50,py=50,inc=0.1,color=Color(0,0,0,1),thick=2}){
        this.func=func;//function f(x){return}
        this.dom=dom;//[0,20]
        this.px=px;//the grid's px'
        this.py=py;
        this.main=main;
        this.inc=inc;//increment
        this.color=color;
        this.thick=thick;}
    
    draw(){
        this.main.ctx.beginPath();
        this.main.ctx.moveTo(this.dom[0]*this.px+window.innerWidth/2,-this.func(this.dom[0])*this.px+window.innerHeight/2);
        for(let i =this.dom[0]+this.inc;i<=this.dom[1];i+=this.inc){
            this.main.ctx.lineTo(i*this.px+window.innerWidth/2,-this.func(i)*this.py+window.innerHeight/2);
    }
        this.main.ctx.strokeStyle=this.color.getColor();
        this.main.ctx.lineWidth=this.thick;
        this.main.ctx.stroke();
    }
    makeAnimation(){}
}

