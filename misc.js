//その他　共通関数

class CharaBase{
    constructor(num,x,y,vx,vy){
        this.sn=num
        this.x=x;
        this.y=y;
        this.vx=vx;
        this.vy=vy;
        this.kill=false;
        this.count=0;
      };
      update(){
        this.count++;
        this.x+=this.vx;
        this.y+=this.vy;
        if (this.x+(100<<8)<0||this.x-(100<<8)>(FIELD_W<<8)||this.y+(100<<8)<0||this.y-(100<<8)>(FIELD_H<<8))this.kill=true;
      };
      draw(obj){
      drawSprite(this.sn,this.x,this.y,obj)
      };
      
};
//爆発
class Expl extends CharaBase{
    constructor(c,x,y,vx,vy){
        super(0,x,y,vx,vy);
        this.timer=c;
    };
    update(){
        if(this.timer){
            this.timer--;
            return;
        }
        super.update();
    };
    draw(){
        if(this.timer)return;
        this.sn=7+(this.count>>2);
        if(this.sn==24){
            this.kill=true;
        return;}
        super.draw(tekiImage)

        };
        
    
};

//派手な爆発
function explosion(x,y,vx,vy){
    expl.push(new Expl(0,x,y,vx,vy));
    for(let i=0;i<10;i++){
        let evx=vx+(random(-10,10)<<6);
        let evy=vy+(random(-10,10)<<6);
    
    expl.push(new Expl(i,x,y,evx,evy));}
};
//乱数
function random(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
  };

//押されたとき
document.addEventListener("keydown",function(event){
    key[event.code]=true;
    if(gameOver &&event.code=="KeyR"){
        uchu=[];
        uchu.push(new Uchu())
        gameOver=false;
        score=0;
        for(let i=teki.length-1;i>=0;i--){
            
            teki[i].hp=teki[i].mxhp
            if(teki[i].mxhp>=500){
                bossHP=teki[i].hp;
                bossMXHP=teki[i].mxhp;
            }
            teki[i].update();
        } 
    }
    else if(event.code=="KeyP"){
    ability[1].flag=~ability[1].flag
    ability[1].ac()

}
else if(event.code=="KeyC"){
    ability[2].add()
}
else if(event.code=="KeyV"){
    ability[2].reduce()
}
}
);
//はなされたとき
document.addEventListener("keyup",function(event){
    key[event.code]=false;
});

//click
document.addEventListener("mousedown",function(event){
    key["Space"]=true;
    
});
//はなされたとき
document.addEventListener("mouseup",function(event){
    key["Space"]=false;
});
//sprite 描画
function drawSprite(num,x,y,obj){
    let sx=sprite[num].x;
    let sy=sprite[num].y;
    let sw=sprite[num].w;
    let sh=sprite[num].h;
    let px=(x>>8)-sw/2;
    let py=(y>>8)-sh/2;
    if((x>>8)+sw/2<camera_x || px>camera_x+SCREEN_W || (y>>8)+sh/2<camera_y || py>camera_y+SCREEN_H)return;
    vcon.drawImage(obj,sx,sy,sw,sh,px,py,sw,sh);
  };
  
  //星
  class Star
  {constructor(){
      this.x=random(0,FIELD_W)<<8;
      this.y=random(0,FIELD_H)<<8;
      this.vx=0;
      this.vy=random(100,300);
      this.sz=random(1,2);
  
  };
  draw(){
      let x=this.x>>8;
      let y=this.y>>8;
      if(x<camera_x || x>=camera_x+SCREEN_W || y<camera_y || y>=camera_y+SCREEN_H)return;
      vcon.fillStyle=random(0,2)!=0?"#66f":"#aef";
      vcon.fillRect(this.x>>8,this.y>>8,this.sz,this.sz);
  };
  update(){
    this.x+=this.vx*starSpeed/100;
    this.y+=this.vy*starSpeed/100;
    if (this.y>FIELD_H<<8){
      this.y=0;
      this.x=random(0,FIELD_W)<<8;
    }
  };
  
  };

//当たり判定
function checkHit(x1,y1,r1,x2,y2,r2){
//  矩形
//  let left1=(x1>>8)-w1/2;
//  let right1=(x1>>8)+w1/2;
//  let top1=(y1>>8)-h1/2;
//  let bottom1=(y1>>8)+h1/2;

//  let left2=(x2>>8)-w2/2;
//  let right2=(x2>>8)+w2/2;
//  let top2=(y2>>8)-h2/2;
//  let bottom2=(y2>>8)+h2/2;

//  return(left1<=right2&& right1>=left2&&top1<=bottom2&&top2<=bottom1);

//円形
let a=(x1-x2)>>8;
let b=(y1-y2)>>8;
let r=r1+r2;
return r*r>=a*a+b*b


};