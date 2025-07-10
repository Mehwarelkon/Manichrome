import {Color,Vec2} from './DataTypes.js';
export class Main2d {//the main class is the canvas that get drawn on 
    constructor(w=window.innerWidth,h=window.innerHeight,center=Vec2(0,0)){
        //this.c;
        this.d=Vec2(w,h)
        this.canv=document.createElement("canvas");
        document.body.appendChild(this.canv);
        this.canv.width=w;
        this.canv.height=h;
        this.canv.style.position='absolute';
        this.canv.style.top=-center[1]+window.innerHeight/2 +'px';
        this.canv.style.left=center[0]+window.innerWidth/2 +'px';
        this.canv.style.transform='translate(-50%,-50%)';
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
            else if(performance.now()-cur>= this.funcs[0][1]){this.imp(this.funcs.shift(),this.running)}
            else{break;}
        }
        for(const fn of this.running){
            fn[0](this.delta);
        }
       for(let i=0;i<this.running.length;i++){
            if(performance.now()-cur>this.running[i][2] || this.running[i]?.[3]?.con){
                this.running.splice(i,1);
                i--;
            }
           else{break;}
        }
    }
    refresh(){//this just calls process every frame (user should call it at the end of the animtion)
        var cur =performance.now();
        //this.c=cur;
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
            return Color(r,g,0,a);
        }
        else if(h<=120){
            r=(255-(h-60)*255/60+(1-s)*255)*l;
            g=((255-(1-s)*255)*l);
            return Color(r,g,0,a);
        }
        else if(h<=180){
            g=(255-(1-s)*255)*l;
            b=((h-120)*255/60+(1-s)*255)*l;
            return Color(0,g,b,a);
        }
        else if (h<=180+60){
            b=(255-(1-s)*255)*l;
            g=(255-(h-180)*255/60+(1-s)*255)*l;
            return Color(0,g,b,a);
        }
        else if (h<=300){
            b=(255-(1-s)*255)*l;
            r=((h-240)*255/60+(1-s)*255)*l;
            return Color(r,0,b,a);
        }
        else{
            r=(255-(1-s)*255)*l;
            b=(255-(h-300)*255/60+(1-s)*255)*l;
            return Color(r,0,b,a);
        }
        
    }
    processC(t,fps){
        this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        while(true){
            if(this.funcs[0]===undefined){break;}
            else if(t >= this.funcs[0][1]/fps){this.running.push(this.funcs.shift())}
            else{break;}
        }
        for(const fn of this.running){
            fn[0](1000/fps);
        }
       for(let i=this.running.length-1;i>=0;i--){
            if(t >this.running[i][2]/fps){
                this.running.splice(i,1)
            }
           if(this.running[i]?.[3]?.con){
               this.running.splice(i,1)
           }
        }
    }
    compile(endTime, fps, name = "frames.zip") {
    if (!window.fflate) {
        console.error("fflate not found. Please include fflate.min.js.");
        return;
    }

    const totalFrames = Math.floor((fps * endTime) / 1000);
    const zipEntries = {};
    const zipOptions = { level: 0 }; // No compression for faster zip

    let t = 0;

    const next = () => {
        if (t >= totalFrames) {
            // All frames added → create ZIP
            window.fflate.zip(zipEntries, zipOptions, (err, zipped) => {
                if (err) {
                    console.error("ZIP error:", err);
                    return;
                }

                const blob = new Blob([zipped], { type: "application/zip" });
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = name;
                document.body.appendChild(a);
                a.click();
                a.remove();
            });
            return;
        }

        // Process animation logic
        this.processC(t, fps);

        // Get canvas PNG
        this.canv.toBlob(blob => {
            if (!blob) return next(); // Skip if failed

            const reader = new FileReader();
            reader.onload = () => {
                const uint8 = new Uint8Array(reader.result);
                const fileName = `frame_${String(t).padStart(4, '0')}.png`;
                zipEntries[fileName] = [uint8];
                t++;
                next(); // Next frame
            };
            reader.readAsArrayBuffer(blob);
        }, 'image/png');
    };

    next(); // Start
}
    save(entity){
        const {main, ...obj}=entity;
        return JSON.stringify(obj);
    }
    setCanv(w,h,center){
        this.canv.style.top=-center[1]+window.innerHeight/2 +'px';
        this.canv.style.left=center[0]+window.innerWidth/2 +'px';
        this.d=Vec2(w,h);
    }
}
/*
export class Editor{
    constructor(w,h,center,m=[10,10]){
        this.editorDiv=document.createElement('div');
        this.editorInp=document.createElement('textarea');
        this.d=[w,h,center,m];
    }
    setup(){
        this.editorDiv.style.position='absolute';
        this.editorDiv.style.width=this.d[0]+this.d[3][0]+10+'px';
        this.editorDiv.style.height=this.d[1]+this.d[3][1]+10+'px';
        this.editorDiv.style.top=-this.d[2][1]+window.innerHeight/2+'px';
        this.editorDiv.style.left=this.d[2][0]+window.innerWidth/2 +'px';
        this.editorDiv.style.transform='translate(-50%,-50%)';
        this.editorDiv.style.background=Color(100,100,100,1).getColor();
        document.body.appendChild(this.editorDiv);
        this.editorInp.style.position='absolute';
        this.editorInp.style.width=this.d[0]+'px';
        this.editorInp.style.height=this.d[1]+'px';
        this.editorInp.style.top=-this.d[2][1]+window.innerHeight/2+'px';
        this.editorInp.style.left=this.d[2][0]+window.innerWidth/2 +'px';
        this.editorInp.style.transform='translate(-50%,-50%)';
        document.body.appendChild(this.editorInp);
        this.editorInp.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // stop newline if needed
                const lines = this.editorInp.value.split('\n');
                const lastLine = lines[lines.length - 1].trim();
                this.handleCommand(lastLine); // custom function
            }
        });
    }
    handleCommand(lastLine){
        console.log(lastLine);
        this.editorInp.value=lastLine+'\n';
        let val=eval(lastLine);
        this.editorInp.value+=(val??'');
        this.editorInp.value+='\n';
    }
}*/