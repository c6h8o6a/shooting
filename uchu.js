//宇宙船と玉

//ball
class Ball extends CharaBase{
    constructor(x,y,vx,vy){
        super(4,x,y,vx,vy);
        // this.w=4;
        // this.h=6;
        this.r=4;
        this.timer=0;
    };
    update(){
      super.update()
      for (let i=0;i<teki.length;i++){
        if(!teki[i].kill){
            if(checkHit(
                this.x,this.y,this.r,
                teki[i].x,teki[i].y,teki[i].r
            )){
                this.kill=true;
                if((teki[i].hp-=10)<=0){
                    if(teki[i].tnum<=2)teki[i].sn=tekimaster[teki[i].tnum].num+1;
                    teki[i].flag2=true;
                    
                }
                else{
                    expl.push(new Expl(0,this.x,this.y,0,0));
                };
                if(teki[i].mxhp>=500){
                    bossHP=teki[i].hp;
                    bossMXHP=teki[i].mxhp;
                }
                break;
            }
        }
      };
    };
    draw(){
        super.draw(ballImage);
    };
    };

//宇宙船
class Uchu{
    constructor(){
      this.x=(FIELD_W/2)<<8;
      this.y=(FIELD_H-50)<<8;
      this.speed=512;
      this.anime=0;
      this.reload=0;
      this.relo2=0;
      this.r=3;
      this.damage=0;
      this.muteki=0;
      this.count=0;
      this.mxhp=100;
      this.hp=this.mxhp;
    };
    draw(){
        if(this.muteki&&(this.count&1))return;
        drawSprite(1+Math.floor(this.anime/3),this.x,this.y,spriteImage);
    };
    update(){
        this.count++;
        if(this.damage)this.damage--;
        if(this.muteki)this.muteki--;
        if(key["Space"]&&this.reload==0){
            tama.push(new Ball(this.x+(6<<8),this.y-(10<<8),0,-2000));
            tama.push(new Ball(this.x-(6<<8),this.y-(10<<8),0,-2000));
            tama.push(new Ball(this.x+(8<<8),this.y-(5<<8),200,-2000));
            tama.push(new Ball(this.x-(8<<8),this.y-(5<<8),-200,-2000));
            this.reload=4;
            if(++this.relo2==4){
                this.reload=20;
                this.relo2=0;
            }
        }
        if(!key["Space"])this.reload=this.relo2=0

        if(this.reload>0)this.reload--;
        if(key["KeyA"]&&this.x>this.speed){
            this.x-=this.speed;
            if(this.anime>-3)this.anime--;
        }
        else if(key["KeyD"]&&this.x<=(FIELD_W<<8)-this.speed){
            this.x+=this.speed;
            if(this.anime<3)this.anime++;
        }
        else{
            if (this.anime>0)this.anime--;
            if(this.anime<0)this.anime++;
        }


        if(key["KeyW"]&&this.y>this.speed){this.y-=this.speed}
        if(key["KeyS"]&&this.y<=(FIELD_H<<8)-this.speed){this.y+=this.speed}
    };
};