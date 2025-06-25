import {Color,Vec2,devOrigin} from './DataTypes.js';
export class Sprite{
    constructor({main,center,dir,scale=[1,1]}){
        this.main=main;
        this.bool=false;
        this.scale=scale;
        this.center=center;
        this.dir=dir;
        this.img=new Image();
        this.width;
        this.height;
        this.img.onload= () => {
            this.width=this.img.width;
            this.height=this.img.height;
            if(this.bool){
                this.draw();
            }
        };
        this.img.onerror = () => {
    console.error("Failed to load image:", this.dir);
};
        this.img.src=this.dir;
        
    }
    draw(){
        this.bool=true;
        if(this.width && this.height){
            this.draw2();
        }
            }
    draw2(){
        //console.log(this.width+"/"+this.height);
        this.main.ctx.drawImage(this.img,...this.center.devFix().add(Vec2(-this.width/2,-this.height/2))/*this.center[0]+window.innerWidth/2 -this.width/2,-this.center[1]+window.innerHeight/2-this.height/2*/,this.width*this.scale[0],this.height*this.scale[1]);
    }
}

