const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight ;
const c = canvas.getContext("2d");
const gravity = 0.5;

class Player{
   constructor(){
    this.position = {
        x:100,
        y:100
    }
    this.velocity = {
        x:0,
        y:20
    }
    this.width = 30;
    this.height = 30;
    
   }

   draw(){
    c.fillStyle = "red";
  c.fillRect(this.position.x,this.position.y,this.width,this.height);
   }

   update(){
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
   
    if(this.position.y + this.height + this.velocity.y >= window.innerHeight ){
        this.velocity.y = 0;
    }else{
        this.velocity.y += gravity;
    }
      
    if(this.position.y < 0){
        this.velocity.y = -this.velocity.y;
    }

    if(keys.left.pressed && this.position.x>100){
     this.velocity.x = -5;
    }
    else if(keys.right.pressed && this.position.x<400){
        this.velocity.x = 5;
    } else{
        this.velocity.x = 0;
         

        if(keys.right.pressed){
            pDistance +=5;
           platforms.forEach((platform) =>{
            platform.position.x -= 5;
        })
        }
        if(keys.left.pressed){
            pDistance -= 5;
            platforms.forEach((platform)=>{
                platform.position.x += 5;
            })
        }
    }
    this.draw();
   }
}
class Platform{
    constructor({x,y}){
        this.position = {
            x,
            y
        },
        this.width = 200,
        this.height = 20
    }
    draw(){
        c.fillStyle = "blue";
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
      
        }
    }
 

const player = new Player();
const platforms = [new Platform({x:200,y:100}), new Platform({x:500,y:300}) ];
const keys = {
    right:{
        pressed:false
    },
    left:{
        pressed:false
    }
}
let pDistance = 0;

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    player.update();
    
    platforms.forEach((platform)=>  {  
    platform.draw();
    if(player.position.y + player.height  <= platform.position.y 
        && player.position.y + player.height + player.velocity.y >= platform.position.y
        && player.position.x + player.width > platform.position.x 
        && player.position.x < platform.position.x + platform.width){
        player.velocity.y = 0 ;
    }
});
// console.log(pDistance);
if(pDistance>4000){
    console.log("GAME-OVER");
}
}

animate();

window.addEventListener('keydown', ({ keyCode })=>{
   if(keyCode == 65){
    keys.left.pressed = true;
   }
   if(keyCode == 83){
    player.velocity.y += 5;
   }
   if(keyCode == 68){
   keys.right.pressed = true;
   }
   if(keyCode == 87){
    // console.log("up");
    player.velocity.y -= 15; 
   }
});
window.addEventListener('keyup', ({ keyCode })=>{
   if(keyCode == 65){
    keys.left.pressed = false;
   }
   if(keyCode == 68){
   keys.right.pressed = false;
   }  
})

