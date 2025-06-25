class loader{
    constructor(Manichrome){
        this.man=Manichrome;
    }
    load(input,time){
        let tempor="{";
        //let n=0;
        let js=`import * as Man from "your manichrome directory"; \n
        const main=new Man.Main2d();\n`;
        for(const object in input){
            const {animation,type,...obj}=object;
            tempor="{";
            for(const prop in obj){
                tempor+="prop:"+obj[prop];
            }
            tempor+="}"
            js+=`const `+obj+` =new Man.`+type+`(`+tempor+`);\n`;
            for(const anim in animtion){
                js+=obj+`.makeAnimation(`+anim+`);\n`;
                
            }
            //the addProcess stuff
        }
        
        
    }
    loadLine(input){
        let text=``;
         text+=`const `
        for(const key in rest){
            
        }
    }
}

