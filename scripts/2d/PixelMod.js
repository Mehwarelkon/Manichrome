import {Color,Vec2} from './DataTypes.js';
export class PixelMod{
    constructor({main,width,height,center}){
        this.main=main;
        this.center=center;
        this.width=width;
        this.height=height;
        this.currentPixelColor=[0,0,0,0];
        this.loop=null;
        this.Mod=null;
    }
    draw(){
        this.Mod=this.main.ctx.getImageData((this.main.canv.width-this.width)/2+this.center[0],(this.main.canv.height-this.height)/2 -this.center[1],this.width,this.height);
        for(let y=0;y<this.height;y++){
            for(let x=0;x<this.width;x++){
                this.loop(x,this.height-y-1);
                this.Mod.data[(y*this.width+x)*4]=this.currentPixelColor[0];
                this.Mod.data[(y*this.width+x)*4+1]=this.currentPixelColor[1];
                this.Mod.data[(y*this.width+x)*4+2]=this.currentPixelColor[2];
                this.Mod.data[(y*this.width+x)*4+3]=this.currentPixelColor[3];
            }
        }
        this.main.ctx.putImageData(this.Mod,(this.main.canv.width-this.width)/2+this.center[0],(this.main.canv.height-this.height)/2 -this.center[1])
    }
}
