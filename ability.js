//能力
let ability=[];
class TimeStop{
constructor(){
    this.Tinterval=0;
    this.timer=0;
}
 TS(){
    if(!this.Tinterval){
        if(key["KeyT"]){
            timeStop=true;
            this.Tinterval=120;
            this.timer=600;
          }
    
    }
    else{
        if(this.timer){this.timer--; 
            for(let i=tama.length-1;i>=0;i--){
                if(tama[i].count<=5)
                tama[i].update();
                if(tama[i].kill)tama.splice(i,1);}
            return;}
        this.Tinterval--;
        timeStop=false;
    }
    };

}
class Accelerate{
   constructor(){
    this.flag=0;
   }
    ac(){
    if(this.flag){
    clearInterval(aaa);
    aaa=setInterval(gameLoop,GAME_SPEED/2);}
    else{
        clearInterval(aaa);
    aaa=setInterval(gameLoop,GAME_SPEED);
    }
    };

};

class D4C{
add(){
    let k=new Uchu();
    k.x=(camera_x+SCREEN_W/2+random(-100,100))<<8;
    uchu.push(k);
}
reduce(){
    if(uchu.length>1)uchu.pop();
}

}


