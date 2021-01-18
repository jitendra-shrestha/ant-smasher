
const SPEED = 1;
const NO_OF_BALLS = 20;
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 500;
const MAXRADIUS = 30;
const MINRADIUS = 10;
const MARGIN = 50;


let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let img = document.getElementById("ant");

canvas.addEventListener('click', function(event){
   var clicked = event.clientX;
   var currentID = clicked.id || "No ID!";
   console.log(currentID);
     console.log(event.clientX,event.clientY);
   //   ctx.clearRect(0,0,event.clientX,event.clientY);
})



class Ball {
   constructor(x,y){
      this.x = x;
      this.y = y;
      this.directionx = Math.random() < 0.5 ? -1 : 1;
      this.directiony = Math.random() < 0.5 ? -1 : 1;
      this.radius = Math.floor(MINRADIUS + Math.random()*(MAXRADIUS + 1 - MINRADIUS));
      this.color = generateRandomColor();
   }

   draw = () => {
      ctx.beginPath();
      ctx.drawImage(img, this.x, this.y, 40,30);
      ctx.fill();
      ctx.closePath();
   }

   changeValue = () => {
      this.x = this.x + this.directionx * SPEED;
      this.y = this.y + this.directiony * SPEED;

      if (this.x + this.radius >= CANVAS_WIDTH || this.x - this.radius <= 0) {
         this.directionx *= -1;
       }
       if (this.y - this.radius <= 0 || this.y + this.radius >= CANVAS_HEIGHT) {
         this.directiony *= -1;
       }
   }
}
   let generateRandomColor = () => {
      var red = Math.floor(Math.random() * 255);
      var blue = Math.floor(Math.random() * 255);
      var green = Math.floor(Math.random() * 255);
   
      return `rgb(${red},${green},${blue})`
   }

   /**
    * Detectes the Collision and resolves
    * @param  {Object} ball Current ballList
    */

   let collisionDetection = (ball) => {
      for (newball in ballList) {
         if((ball.x != ballList[newball].x) && (ball.y != ballList[newball].y)){
            var dx = ball.x - ballList[newball].x;
            var dy = ball.y - ballList[newball].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < ball.radius + ballList[newball].radius) {
               ball.directionx *= -1;
               ball.directiony *= -1;
               
            }
         }
       }
      
   }

   let isColliding = (ball) => {
      for (newball in ballList) {
        var dx = ball.x - ballList[newball].x;
        var dy = ball.y - ballList[newball].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance < ball.radius + ballList[newball].radius) {
    
          return true;
        }
      }
    
      return false;
    }


   let animate = () =>{
      ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
      ballList.forEach((ball) => {
         ball.changeValue();
         ball.draw();
         collisionDetection(ball);
      });   
   }

   let ballList= [];

   let render = () => {
      for (var i = 0; i < NO_OF_BALLS ; i++) {

         do{
            x=Math.floor(Math.random() * CANVAS_WIDTH-MARGIN);
            y=Math.floor(Math.random() * CANVAS_HEIGHT-MARGIN);
            var ball = new Ball(x,y);
         }while(isColliding(ball));
         ballList.push(ball);
      }
      
   }

render();
setInterval(animate, 1000 / 60);
animate();



// window.onload = function() {
//    var canvas = document.getElementById("myCanvas");
//    var ctx = canvas.getContext("2d");
//    var img = document.getElementById("ant");
//   ctx.drawImage(img, 10, 10,50,50);
// };