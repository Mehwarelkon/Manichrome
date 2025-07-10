import {Vec2} from './DataTypes.js'
export class TouchEventListener{
    constructor({main}){
        this.main=main;
        this.touch=[0,0];
        this.dots=[];
        this.fun=()=>{};
    }
    call(){//call
        let r=[];
        let index=null;
        let canvas=this.main.canv;
        let isdragging=false;
        canvas.addEventListener("touchstart",(e)=>{//
            //e.preventDefault();
            if(e.touches.length>1){this.dots[index]==undefined?(null):(this.dots[index].size-=2);}
            if(e.touches.length===1){///
                r=[];
                isdragging=true;
              //  e.preventDefault();
                //
                for(const dot of this.dots){
                    r.push((e.touches[0].clientX-(dot.point[0]+window.innerWidth/2))**2+(e.touches[0].clientY-(-dot.point[1]+window.innerHeight/2))**2);
                }
                  //
                index=r.indexOf(Math.min(...r));
                this.dots[index]==undefined ?(null):(this.dots[index].drag=true);
                //this.dots?.[index]?.drag=true;
               this.dots[index]==undefined?(null):(this.dots[index].size+=2);
            }///
            else{isdragging =false;
                index==null?(null):(this.dots[index]==undefined?(null):(this.dots[index].drag=false));
                index=null;
            }
            //
        },{passive:false});
        canvas.addEventListener("touchmove",(e)=>{
            e.preventDefault();
            if(e.touches.length===1){//
               // e.preventDefault();
               isdragging =true;
                this.dots[index]==undefined?(null):(this.dots[index].point=Vec2(e.touches[0].clientX-window.innerWidth/2,-e.touches[0].clientY+window.innerHeight/2));
                this.fun(e);
                //this.dots?.[index]?.point=[e.touches[0].clientX-window.innerWidth/2,-e.touches[0].clientY-window.innerHeight/2];
            }//
        },{passive:false});
        canvas.addEventListener("touchend",(e)=>{
            this.dots[index]==undefined?(null):(this.dots[index].size-=2);
            if(e.touches.length===0){
                isdragging=false;
                r=[];
               //
                index=null;
            }
        });
        
    }
}
    

