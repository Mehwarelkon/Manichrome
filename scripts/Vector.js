
/*export */ class Vector{
    constructor(main,points){
        this.point=points;
        this.color=[0,0,0,1];
        this.thick=2;
        this.tipSiz=1;
        this.main=main;
    }
    draw(){
        let phi=Math.atan2(this.point[3]-this.point[1],this.point[2]-this.point[0])
        this.main.ctx.beginPath();
        this.main.ctx.moveTo(this.point[0],this.point[1]);
        this.main.ctx.lineTo(this.point[2],this.point[3]);
        this.main.ctx.lineTo(this.point[2]+,this.point[3]);
    }
    
}

