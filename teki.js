//敵

//敵玉
class Teta extends CharaBase{
    constructor(num,x,y,vx,vy,t){
        super(num,x,y,vx,vy);
        this.r=3;
        if(t==undefined)this.timer=0;
        else this.timer =t;

    };
    draw(){
        super.draw(ballImage)
        };
    update(){
        if(this.timer){this.timer--;
            return;
        }
        super.update();
        for(let i=uchu.length-1;i>=0;i--){
            if(!gameOver&&!uchu[i].muteki&&checkHit(
                this.x,this.y,this.r,
                uchu[i].x,uchu[i].y,uchu[i].r)){
                this.kill=true;
                if((uchu[i].hp-=30)<=0){
                    gameOver=true;
                };
                uchu[i].damage=10;
                uchu[i].muteki=60;
                
            }};
    };
};

//teki
class Teki extends CharaBase{
    constructor(t,x,y,vx,vy,objn){
      super(tekimaster[t].num,x,y,vx,vy);
      this.tnum=tekimaster[t].tnum
      this.r=tekimaster[t].r
      this.mxhp=tekimaster[t].hp
      this.hp=this.mxhp;
      this.score=tekimaster[t].score
      this.flag=false;
      this.dr=90;
      this.objn=objn;
      this.relo=0;
      this.timer=15;
      this.flag2=false;
    
    };
    update(){
      if(this.relo)this.relo--;
      if(this.flag2&&this.timer){this.timer--; 
        return;}
        if(!this.timer){
            this.kill=true;
            explosion(this.x,this.y,this.vx>>3,this.vy>>3);
            
            score+=this.score;
        };
      super.update();
      //個別update
      tekifunc[this.tnum](this);
      //当たり判定
      for(let i=uchu.length-1;i>=0;i--){
      if(!gameOver&&!uchu[i].muteki&&checkHit(
        this.x,this.y,this.r,
        uchu[i].x,uchu[i].y,uchu[i].r)){
        //this.kill=true;
        if((uchu[i].hp-=30)<=0){
            gameOver=true;
        };
        uchu[i].damage=10;
        uchu[i].muteki=60;
        
    }
}
    };
    draw(){
    super.draw(this.objn);
    };
    };
//玉の発射計算
function tekiShot(obj,speed){
    if(gameOver)return;
    let px=(obj.x>>8);
    let py=(obj.y>>8);
    if(px-40<camera_x || px+40>camera_x+SCREEN_W || py-40<camera_y || py+40>camera_y+SCREEN_H)return;
    let an,dx,dy;
    an=Math.atan2(uchu[0].y-obj.y,uchu[0].x-obj.x);
    //an+=random(-10,10)*Math.PI/180
    dx=Math.cos(an)*speed;
    dy=Math.sin(an)*speed;
    teta.push(new Teta(5,obj.x,obj.y,dx,dy));
};

function tekiMove1(obj){
    if(!obj.flag){
        if(uchu[0].x>obj.x&&obj.vx<120)obj.vx+=4;
        else if(uchu[0].x<obj.x&&obj.vx>-120)obj.vx-=4;
        }
  
        else{
          if(uchu[0].x<obj.x&&obj.vx<120)obj.vx+=30;
          else if(uchu[0].x>obj.x&&obj.vx>-120)obj.vx-=30;
        }
  
        if(Math.abs(uchu[0].y-obj.y)<(150<<8)&&!obj.flag){
          obj.flag=true;
          tekiShot(obj,600);
          obj.relo=200;
        }
        if(obj.flag&&obj.vy>-800)obj.vy-=30;

};

function tekiMove2(obj){
    if(!obj.flag){
        if(uchu[0].x>obj.x&&obj.vx<600)obj.vx+=30;
        else if(uchu[0].x<obj.x&&obj.vx>-600)obj.vx-=30;
        }
  
        else{
          if(uchu[0].x<obj.x&&obj.vx<600)obj.vx+=30;
          else if(uchu[0].x>obj.x&&obj.vx>-600)obj.vx-=30;
        }
  
        if(Math.abs(uchu[0].y-obj.y)<(150<<8)&&!obj.flag){
          obj.flag=true;
  
          tekiShot(obj,600);
        }
        
    
};

function tekiMove3(obj){
    if(obj.count==10){
        obj.vx=obj.vy=0;
    }
    if(obj.count==60){
       if(obj.x>uchu[0].x)obj.vx-=30;
       else obj.vx+=30;
       obj.vy=100;
    }
    if(obj.count>100){
        if(random(0,100)==1){
            tekiShot(obj,300);
        }
    }
    
};

function tekiMove4(obj,i){
    if(!obj.flag&&(obj.y>>8)>=50)obj.flag=1;
    if(obj.flag==1)
    {
        if((obj.vy-=2)<=0){
            obj.flag=2;
            obj.vy=0;
        };
    }
    else if(obj.flag==2){
        if(obj.vx<300)obj.vx+=10;
        if((obj.x>>8)>(FIELD_W-100))obj.flag=3;
    }
    else if(obj.flag==3){
        if(obj.vx>-300)obj.vx-=10;
        if((obj.x>>8)<100)obj.flag=2;
    };
    //弾幕
    if(obj.flag>1){
    let an,dx,dy;
    an=obj.dr*Math.PI/180;
    dx=Math.cos(an)*300;
    dy=Math.sin(an)*300;
    let x2=(Math.cos(an)*70)<<8;
    let y2=(Math.sin(an)*70)<<8;
    teta.push(new Teta(5,obj.x+x2,obj.y+y2,dx,dy));
    if((obj.dr+=12)>=360)obj.dr=0;}
    if(obj.hp<obj.mxhp/2){
        let c=obj.count%(60*5);
        if(c/10<4&&c%10==0){
            let an,dx,dy;
        an=(135-(c/10)*30)*Math.PI/180;
        dx=Math.cos(an)*300;
        dy=Math.sin(an)*300;
        let x2=(Math.cos(an)*70)<<8;
        let y2=(Math.sin(an)*70)<<8;
        teki.push(new Teki(2,obj.x+x2,obj.y+y2,dx,dy,tekiImage));
        }
    }
    
};
let tekifunc=[tekiMove1,tekiMove2,tekiMove3,tekiMove4];