//data
//tekimaster
class TekiMaster{
constructor(tnum,r,hp,score,num){
 this.tnum=tnum;
 this.r=r;
 this.hp=hp;
 this.score=score;
 this.num=num;
};
};
let tekimaster=[new TekiMaster(0,20,1,100,24),
    new TekiMaster(1,20,20,200,26),
    new TekiMaster(2,20,30,300,28),
    new TekiMaster(3,50,5000,10000,30),
];
//sprite
class Sprite{
    constructor(x,y,w,h){
      this.x=x;
      this.y=y;
      this.w=w;
      this.h=h;
    };
  };
  let sprite=[
  new Sprite(133,6,37,35),//uchu
  new Sprite(7,6,45,35),
  new Sprite(189,6,37,35),
  new Sprite(67,6,45,35),
  //ball
  new Sprite(0,0,4,6),
  new Sprite(4,0,7,7), //5
  //null
  new Sprite(151,0,40,50), //6

  //爆発
  new Sprite(24,12,8,8), //7
  new Sprite(69,9,12,12),//8
  new Sprite(114,6,15,15),//9
  new Sprite(15,33,27,24), //10
  new Sprite(60,27,30,30), //11
  new Sprite(102,24,39,33),//12
  new Sprite(9,60,39,33), //13
  new Sprite(54,57,39,42), //14
  new Sprite(102,57,39,39),//15
  new Sprite(54,57,39,42), //14
  new Sprite(9,60,39,33), //13
  new Sprite(102,24,39,33),//12
  new Sprite(60,27,30,30), //11
  new Sprite(15,33,27,24), //10
  new Sprite(114,6,15,15),//9
  new Sprite(69,9,12,12),//8
  new Sprite(24,12,8,8), //7

//teki
new Sprite(151,0,40,50), //24
new Sprite(201,0,40,50), //25
new Sprite(255,2,40,45), //26
new Sprite(300,0,41,50), //27
new Sprite(350,0,40,50), //28
new Sprite(400,0,40,50), //29

new Sprite(6,7,138,139), //30 boss

  ];
  