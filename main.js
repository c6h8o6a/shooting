//Debug
const DEBUG=true;
fps=0
let drawCount=0;
let lastTime=Date.now()
//スムージング
const SMOOTHING=false;
//画面サイズ
const SCREEN_W=320;
const SCREEN_H=320;
//キャンパスサイズ
const CANVAS_W=SCREEN_W*2;
const CANVAS_H=SCREEN_H*2;
//fieldsize
const FIELD_W=SCREEN_W+120;
const FIELD_H=SCREEN_H+40;

//星の数
const STAR_MAX=300;
//gamespeed(ms) 60fps
const GAME_SPEED=1000/60
//canvas
let can =document.getElementById("can");
let con =can.getContext('2d');
can.width =CANVAS_W;
can.height=CANVAS_H;
con.mozimageSmoothingEnable=SMOOTHING;
con.webkitmageSmoothingEnable=SMOOTHING;
con.msimageSmoothingEnable=SMOOTHING;
con.imageSmoothingEnable=SMOOTHING;

con.font="20px'impact'";
//フィールド(仮想画面)
let vcan =document.createElement("canvas");
let vcon =vcan.getContext('2d');
vcan.width =FIELD_W;
vcan.height=FIELD_H;
vcon.font="12px'impact'";
//カメラの座標
let camera_x=0;
let camera_y=0;

//gameover
let gameOver =false;
let score=0;
//boss
let bossHP=0;
let bossMXHP=0;
//時止める
let timeStop=false;

//星々
let star=[];
//key
let key=[];
//teki
let teki=[];
//tama
let tama=[];
//uchu
let uchu=[];
//敵の玉
let teta=[];
//爆発
let expl=[];

//画像ファイル
let spriteImage=new Image();
spriteImage.src="spritesheet.png";
let ballImage=new Image();
ballImage.src="ball.png";
let tekiImage=new Image();
tekiImage.src="spritesheet2.png";
let bossImage=new Image();
bossImage.src="boss.png";



//初期化
function gameInit(){
    for(let i=0;i<STAR_MAX;i++){
        star[i]=new Star();};
    aaa=setInterval(gameLoop,GAME_SPEED);
    ability.push(new TimeStop())
    ability.push(new Accelerate())
    ability.push(new D4C())
    uchu.push(new Uchu())
};
//Obj for
function updateObj(obj){
    for(let i=obj.length-1;i>=0;i--){
        obj[i].update();
        if(obj[i].kill)obj.splice(i,1);}
};
//Obj draw
function drawObj(obj){
    for(let i=0;i<obj.length;i++){
        obj[i].draw();}
};
//移動の処理
function updateALL(){
    ability[0].TS();
    if(!timeStop){
    for(let i=0;i<STAR_MAX;i++){
        star[i].update();};
    updateObj(teta);
    updateObj(tama);
    updateObj(teki);
    updateObj(expl);};
    if(!gameOver){updateObj(uchu)};
};
//描画の処理
function drawAll(){
    if(!timeStop){
        for(let i=uchu.length-1;i>=0;i--){
            if(uchu[i].damage){vcon.fillStyle="lightcoral";
                break;
            }
            else{vcon.fillStyle="black"};
        };
    vcon.fillRect(camera_x,camera_y,SCREEN_W,SCREEN_H);
    for(let i=0;i<STAR_MAX;i++){
        star[i].draw();}}
    else{
        vcon.fillStyle="gray";
        vcon.fillRect(camera_x,camera_y,SCREEN_W,SCREEN_H);}
    

    
    drawObj(tama);
    drawObj(teki);
    drawObj(expl);
    drawObj(teta);
    if(!gameOver){drawObj(uchu)};
    //カメラ範囲
    camera_x=Math.floor((uchu[0].x>>8)/FIELD_W*(FIELD_W-SCREEN_W))
    camera_y=Math.floor((uchu[0].y>>8)/FIELD_H*(FIELD_H-SCREEN_H))
    //boss HP
    if(bossHP>0){
        let sz=(SCREEN_W-20)*bossHP/bossMXHP;
        let sz2=(SCREEN_W-20);
        vcon.fillStyle="rgba(255,0,0,0.5)";
        vcon.fillRect(camera_x+10,camera_y+10,sz,10);
        vcon.strokeStyle="rgba(255,0,0,0.9)";
        vcon.strokeRect(camera_x+10,camera_y+10,sz2,10);
    }
    //uchu HP
    if(uchu[0].hp>0){
        let sz=(SCREEN_W-20)*uchu[0].hp/uchu[0].mxhp;
        let sz2=(SCREEN_W-20);
        vcon.fillStyle="rgba(0,0,255,0.5)";
        vcon.fillRect(camera_x+10,camera_y+SCREEN_H-14,sz,10);
        vcon.strokeStyle="rgba(0,0,255,0.9)";
        vcon.strokeRect(camera_x+10,camera_y+SCREEN_H-14,sz2,10);
    }
    //score 表示
    vcon.fillStyle="white";
    vcon.fillText("SCORE "+score,camera_x+10,camera_y+14);
    //仮想画面からコピー
    con.drawImage(vcan,camera_x,camera_y,SCREEN_W,SCREEN_H,0,0,CANVAS_W,CANVAS_H);
};
//情報の表示
function putInfo(){
    
    con.fillStyle="white";
    if(gameOver){
    let s="GAME OVER"
    let w=con.measureText(s).width;
    let x=CANVAS_W/2-w/2;
    let y=CANVAS_H/2-20;
    con.fillText(s,x,y)

    s="Push 'R' key to restart!"
    w=con.measureText(s).width;
    x=CANVAS_W/2-w/2;
    y=CANVAS_H/2-20+20;
    con.fillText(s,x,y)};
    if(DEBUG){
        drawCount++;
        if(lastTime+1000<=Date.now()){
          fps=drawCount;
          drawCount=0;
          lastTime=Date.now()
        };
        
        con.fillText("FPS"+fps,20,20)
        con.fillText("Tama"+tama.length,20,40)
        con.fillText("Teki"+teki.length,20,60)
        con.fillText("Teta"+teta.length,20,80)
        con.fillText("Expl"+expl.length,20,100)
        con.fillText("X"+(uchu[0].x>>8),20,120)
        con.fillText("Y"+(uchu[0].y>>8),20,140)
        con.fillText("HP"+uchu[0].hp,20,160)
        con.fillText("SCORE"+score,20,180)
      };
};
//game回数
let gameCount=0;
let gameWave=0;
let gameRound=0;

let starSpeed=100;
let starSpeedReq=100;
//ゲーム動かす
function gameLoop(){
    if(!timeStop)
{gameCount++;
    if(starSpeedReq>starSpeed)starSpeed++;
    if(starSpeedReq<starSpeed)starSpeed--;
    
    if(gameWave==0){
    if (random(0,15)==1){
        teki.push(new Teki(0,random(0,FIELD_W)<<8,0,0,random(300,1200),tekiImage));
    }
    if(gameCount>60*20)
       { gameWave++;
        gameCount=0;
    starSpeedReq=200;}
}
else if(gameWave==1){
    if (random(0,15)==1){
        teki.push(new Teki(1,random(0,FIELD_W)<<8,0,0,random(300,1200),tekiImage));
    }
    if(gameCount>60*20)
       { gameWave++;
        gameCount=0;
    starSpeedReq=100;}
}
else if(gameWave==2){
    if (random(0,10)==1){
        let r=random(0,1)
        teki.push(new Teki(r,random(0,FIELD_W)<<8,0,0,random(300,1200),tekiImage));
    }
    if(gameCount>60*20)
       { gameWave++;
        gameCount=0;
    teki.push(new Teki(3,(FIELD_W/2)<<8,-50,0,200,bossImage));
starSpeedReq=600;}
}
else if(gameWave==3){
    
    if(teki.length==0)
       { gameWave=0;
        gameCount=0;
    gameRound++;
starSpeedReq=100;}
}
};

    //移動
    updateALL()
    //描画
    drawAll()
    //情報
    putInfo()
};

//onload
window.onload=function(){
    gameInit();

    
};
