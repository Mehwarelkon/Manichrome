import {Color,Vec2} from './DataTypes.js';
export class LinearPath{
    constructor({main,points=[],thick=2,color=[]}){//points =[[x1,y1],[x2,y2].....]
        this.points=points;//[list of Vec2]
        this.main=main;
        this.color=color;//list of Color
        this.thick=thick;
    }
    draw(){/*
        this.main.ctx.beginPath();
        this.main.ctx.moveTo(this.points[0],this.points[1]);
        this.main.ctx.lineTo(this.points[2],this.points[3]);
        this.main.ctx.strokeStyle=`rgba(`+this.color[0][0]+`,`+this.color[0][1]+`,`+this.color[0][2]+`,`+this.color[0][3]+`)`;
        this.main.lineWidth=this.thick; 
        this.main.ctx.stroke();*/

        for(let i=0;i<this.points.length-1;i++){
            this.main.ctx.beginPath();
            this.main.ctx.moveTo(this.points[i][0]+window.innerWidth/2,-this.points[i][1]+window.innerHeight/2);
            this.main.ctx.lineTo(this.points[i+1][0]+window.innerWidth/2,-this.points[i+1][1]+window.innerHeight/2);
            this.main.ctx.strokeStyle=this.color[i].getColor();
            this.main.ctx.lineWidth=this.thick; 
            this.main.ctx.stroke();
        }
        
    }
    makeAnimation({startTime,endTime,type="linear"}){
        const bool={con:true};
        let p;
        let rs=[];
        let opoints=[...this.points];
        let rTotal=0;
        let rSum;
        let othick;
        let t=0;
        let duration =endTime-startTime;
        for(let i=0;i<this.points.length-1;i++){
            //console.log(this.points[i+1].sub(this.points[i]).getLength())
            rTotal+= this.points[i+1].sub(this.points[i]).getLength();  //Math.sqrt((this.points[i+1][0]-this.points[i][0])**2+(this.points[i+1][1]-this.points[i][1])**2);
        }
        
        for(let j=0;j<this.points.length;j++){
            let r=0
            for(let i=0;i<j;i++){
                //console.log(r);
                r+= this.points[i+1].sub(this.points[i]).getLength();//  Math.sqrt((this.points[i+1][0]-this.points[i][0])**2+(this.points[i+1][1]-this.points[i][1])**2)
            }
            //console.log(r);
            rs.push(r);
            
        }
        switch (type){
           case "linear":p=()=>{return t/duration;};break;
           case "easeIn":p=()=>{return (t/duration)**2;};break;
           case "easeOut":p=()=>{return (1-(1-t/duration)**2);};break;
           case "easeInOut":p=()=>{return 3*(t/duration)**2-2*(t/duration)**3;};break;
           case "easeInSin":p=()=>{return -Math.cos((Math.PI/2)*(t/duration))+1;};break;
           case "easeOutSin":p=()=>{return Math.sin((Math.PI/2)*(t/duration));};break;
           case "easeInOutSin":p=()=>{return Math.sin((Math.PI)*(t/duration -0.5))/2+ 0.5;};break;
       }
         let f=(delta)=>{//
            
            rSum=rTotal*p();
            this.points=[]
            for(let i=0;i<opoints.length;i++){
                if(rs[i]<=rSum){this.points.push(Vec2(...opoints[i]))}
                else{break}
            }
             t+=delta;
            if(t>=duration){this.points=[...opoints]; /*bool.con=true*/}
            bool.con=false;
        }//
        this.main.addProcess([f,startTime,endTime+100,bool]);
    }
    
    
}

