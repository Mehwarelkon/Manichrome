export class Main {//the main class is the canvas that get drawn on 
    constructor(){
        this.canv=document.createElement("canvas");
        document.body.appendChild(this.canv);
        this.canv.width=window.innerWidth;
        this.canv.height=window.innerHeight;
        //
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100%';        
        //
        this.ctx=this.canv.getContext("2d");
        this.funcs=[];//this varible will hold the bodies that will be excuted
        this.running=[];//this variable holds the bodies that are being excuted 
        this.delta=0;
        this.current=0;
    }
    imp(input,arr){//binary insertion, search it 
        let left=0;
        let right=arr.length;
        let mid=Math.floor((left+right)/2);
        while(left<right){
            mid=Math.floor((left+right)/2);
            if(input[1]<arr[mid][1]){
               right=mid; 
            }
            else{left =mid+1;}
        }
        arr.splice(left,0,input);
    }
    addProcess(body){//ex body = [function refrence,start time,end time]
        //here the user will add his body to be added to the funcs list and get processed every frame
        this.imp(body,this.funcs)
    }
    process(cur){//cur referse to the zero time a refrence to the start time of the animation (not updated)
        //this method is what moves the bodies from funcs to running and also terminate them
        this.delta=performance.now()-this.current;
        this.current=performance.now();
        this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        while(true){
            if(this.funcs[0]===undefined){break;}
            else if(performance.now()-cur>= this.funcs[0][1]){this.running.push(this.funcs.shift())}
            else{break;}
        }
        for(const fn of this.running){
            fn[0](this.delta);
        }
       for(let i=this.running.length-1;i>=0;i--){
            if(performance.now()-cur>=this.running[i][2]){
                this.running.splice(i,1)
            }
        }
    }
    refresh(){//this just calls process every frame (user should call it at the end of the animtion)
        var cur =performance.now();
        this.current =performance.now();
        const loop = () =>{
            this.process(cur);
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }
    hsla(h,s,l,a){
        h=(h%360 +360)%360;
        let r,g,b;
        if(h<=60){
             r=(255-(1-s)*255)*l;
             g=(h*255/60+(1-s)*255)*l;
            return [r,g,0,a];
        }
        else if(h<=120){
            r=(255-(h-60)*255/60+(1-s)*255)*l;
            g=((255-(1-s)*255)*l);
            return [r,g,0,a];
        }
        else if(h<=180){
            g=(255-(1-s)*255)*l;
            b=((h-120)*255/60+(1-s)*255)*l;
            return [0,g,b,a];
        }
        else if (h<=180+60){
            b=(255-(1-s)*255)*l;
            g=(255-(h-180)*255/60+(1-s)*255)*l;
            return [0,g,b,a];
        }
        else if (h<=300){
            b=(255-(1-s)*255)*l;
            r=((h-240)*255/60+(1-s)*255)*l;
            return [r,0,b,a];
        }
        else{
            r=(255-(1-s)*255)*l;
            b=(255-(h-300)*255/60+(1-s)*255)*l;
            return [r,0,b,a];
        }
        
    }
}

