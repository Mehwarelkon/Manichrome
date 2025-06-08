export class LinearGraph{
    constructor(main,func,domain,px,py){
        this.func=func;//function f(x){return}
        this.dom=domain;//[0,20]
        this.px=px;//the grid's px'
        this.py=py;
        this.main=main;
        this.inc=0.5;//increment
        this.color=[0,0,0,1];
        this.thick=2;}
    
    draw(){
        this.main.ctx.beginPath();
        this.main.ctx.moveTo(this.dom[0]*this.px+window.innerWidth/2,-this.func(this.dom[0])*this.px+window.innerHeight/2);
        for(let i =this.dom[0]+this.inc;i<=this.dom[1];i+=this.inc){
            this.main.ctx.lineTo(i*this.px+window.innerWidth/2,-this.func(i)*this.py+window.innerHeight/2);
    }
        this.main.ctx.strokeStyle=`rgba(`+this.color[0]+`,`+this.color[1]+`,`+this.color[2]+`,`+this.color[3]+`)`;
        this.main.ctx.lineWidth=this.thick;
        this.main.ctx.stroke();
    }
}

