
export class Circle{//circle 🙂
    constructor({main,center=[0,0],r,startAngle=0,endAngle=2*Math.PI,thick=1,lineColor=[0,0,0,1],isLine=true,isClosed=false,isFilled=false,fillColor=[255,0,0,1]}){
        this.center=center;//[x,y]
        this.r=r;
        this.endAngle=endAngle;//Math.PI
        this.startAngle=0;
        //this.deltaAngle=this.endAngle-this.startAngle;
        this.thick=thick;
        this.lineColor=lineColor;
        this.isLine=isLine;
        this.isClosed=isClosed;
        this.isFilled=isFilled;
        this.fillColor=fillColor;
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
    makeAnimation({center,r,startAngle,endAngle,thick,lineColor,fillColor,startTime,endTime,type="linear"}){
        let p;
        let ocenter;
        let or;
        let ostartAngle;
        let oendAngle;
        let othick;
        let olineColor;
        let ofillColor;
        let funcs=[];
        let tfunc=[];
        let t=0;
        let duration=endTime-startTime;
       switch (type){
           case "linear":p=()=>{return t/duration;};break;
           case "easeIn":p=()=>{return (t/duration)**2;};break;
           case "easeOut":p=()=>{return (1-(1-t/duration)**2);};break;
           case "easeInOut":p=()=>{return 3*(t/duration)**2-2*(t/duration)**3;};break;
           case "easeInSin":p=()=>{return -Math.cos((Math.PI/2)*(t/duration))+1;};break;
           case "easeOutSin":p=()=>{return Math.sin((Math.PI/2)*(t/duration));};break;
           case "easeInOutSin":p=()=>{return Math.sin((Math.PI)*(t/duration -0.5))/2+ 0.5;};break;
       }
        
        
        if(center){
            funcs.push(()=>this.center=[ocenter[0]+(center[0]-ocenter[0])*p(),ocenter[1]+(center[1]-ocenter[1])*p()]);
            tfunc.push(()=>this.center=[...center]);
            ocenter=[...this.center];
        }
        if(r){
            funcs.push(()=>this.r=or+(r-or)*p());
            tfunc.push(()=>this.r=r);
            or=this.r;
        }
        if(startAngle){
            funcs.push(()=>this.startAngle=ostartAngle+(startAngle-ostartAngle)*p());
            tfunc.push(()=>this.startAngle=startAngle);
            ostartAngle=this.startAngle;
        }
        if(endAngle){
            funcs.push(()=>this.endAngle=oendAngle+(endAngle-oendAngle)*p());
            tfunc.push(()=>this.endAngle=endAngle);
            oendAngle=this.endAngle;
        }
        if(thick){
            funcs.push(()=>this.thick=othick+(thick-othick)*p());
            tfunc.push(()=>this.thick=thick);
            othick=this.thick;
        }
        if(lineColor){
            funcs.push(()=>this.lineColor=[olineColor[0]+(lineColor[0]-olineColor[0])*p(),olineColor[1]+(lineColor[1]-olineColor[1])*p(),olineColor[2]+(lineColor[2]-olineColor[2])*p(),olineColor[3]+(lineColor[3]-olineColor[3])*p()]);
            tfunc.push(()=>this.lineColor=[...lineColor]);
            olineColor=[...this.lineColor];
        }
        if(fillColor){
            funcs.push(()=>this.fillColor=[ofillColor[0]+(fillColor[0]-ofillColor[0])*t/duration,ofillColor[1]+(fillColor[1]-ofillColor[1])*t/duration,ofillColor[2]+(fillColor[2]-ofillColor[2])*t/duration,ofillColor[3]+(fillColor[3]-ofillColor[3])*p()]);
            tfunc.push(()=>this.fillColor=[...fillColor]);
            ofillColor=[...this.fillColor];
        }
         const f=(delta)=>{//
          for(const fun of funcs){
              fun();
          }
             t+=delta
            if(t>duration){
                for(const fun of tfunc){
                    fun();
                }
            }
        }//
        this.main.addProcess([f,startTime,endTime]);
    }

}

