import {Color,Vec2} from'./DataTypes.js';
export class Circle{//circle 🙂
    constructor({main,center=Vec2(0,0),r=100,startAngle=0,endAngle=2*Math.PI,thick=1,lineColor=Color(0,0,0,1),isLine=true,isClosed=false,isFilled=false,fillColor=Color(255,0,0,1)}){
        this.center=center;//Vec2
        this.r=r;
        this.endAngle=endAngle;//Math.PI
        this.startAngle=0;
        //this.deltaAngle=this.endAngle-this.startAngle;
        this.thick=thick;
        this.lineColor=lineColor;//Color
        this.isLine=isLine;
        this.isClosed=isClosed;
        this.isFilled=isFilled;
        this.fillColor=fillColor;//color
        this.main=main;
    }
    draw(){
        this.main.ctx.beginPath();
        this.main.ctx.arc(this.center[0]+window.innerWidth/2,-this.center[1]+window.innerHeight/2,this.r,-this.startAngle,-this.endAngle,true);
        //arc angles cant be negative so i need to revert it ,but since -180 to 180 is a full circle the normal method(this.angle(endAngle)) will make it 180 to 180 so nothing will draw thats why i added the deltaAngle
        if(this.isLine){
            this.main.ctx.strokeStyle=this.lineColor.getColor()
            this.main.ctx.lineWidth=this.thick;
            if(this.isClosed){this.main.ctx.closePath();}
            this.main.ctx.stroke()}
        if(this.isFilled){
            this.main.ctx.fillStyle=this.fillColor.getColor();
            this.main.ctx.fill();
        }
        
    }
    makeAnimation({center,r,startAngle,endAngle,thick,lineColor,fillColor,startTime,endTime,type="linear"}){
       // console.log(JSON.stringify(startTime));
      
        let p;
        let ocenter=Vec2(null,null);
        let or;
        let ostartAngle;
        let oendAngle;
        let othick;
        let olineColor=Color(null,null,null,null);
        let ofillColor=Color(null,null,null,null);
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
            funcs.push(()=>this.center=ocenter.add(center.sub(ocenter).mul(p()))) ;
            tfunc.push(()=>this.center=Vec2(...center));
            ocenter=Vec2(...this.center)
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
            funcs.push(()=>this.lineColor=Color(olineColor[0]+(lineColor[0]-olineColor[0])*p(),olineColor[1]+(lineColor[1]-olineColor[1])*p(),olineColor[2]+(lineColor[2]-olineColor[2])*p(),olineColor[3]+(lineColor[3]-olineColor[3])*p()));
            tfunc.push(()=>this.lineColor=Color(...lineColor));
            olineColor=Color(...this.lineColor);
        }
        if(fillColor){
            funcs.push(()=>this.fillColor=Color(ofillColor[0]+(fillColor[0]-ofillColor[0])*t/duration,ofillColor[1]+(fillColor[1]-ofillColor[1])*t/duration,ofillColor[2]+(fillColor[2]-ofillColor[2])*t/duration,ofillColor[3]+(fillColor[3]-ofillColor[3])*p()))
            tfunc.push(()=>this.fillColor=Color(...fillColor));
            ofillColor=Color(...this.fillColor);
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
             console.log(JSON.stringify(this.center))
        }//
        this.main.addProcess([f,startTime,endTime]);
    }

}

