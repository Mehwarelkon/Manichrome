
export class Dot{
    constructor(main,point){
        this.point=point;
        this.color=[0,0,0,1];
        this.size=2;
        this.main=main;
        this.drag=false;
        //this.event=new EventListener(this.main);
    }
    draw(){
        this.main.ctx.beginPath();
        this.main.ctx.arc(this.point[0]+window.innerWidth/2,-this.point[1]+window.innerHeight/2,this.size,0,-2*Math.PI,true);
        this.main.ctx.fillStyle=`rgba(`+this.color[0]+`,`+this.color[1]+`,`+this.color[2]+`,`+this.color[3]+`)`;
        this.main.ctx.fill();
        }
}
