
const SPEED = 1;
const NO_OF_BALLS = 50;
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 500;
const MAXRADIUS = 50;
const MINRADIUS = 10;
const MARGIN = 50;


let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let img = document.getElementById("ant");

canvas.addEventListener('click', (event) => {
   var x = event.clientX;
  var y = event.clientY;

  for (let i = 0; i < ballList.length; i++) {
    var ball = ballList[i];
    if (x >= ball.x
      && x <= ball.x + (ball.radius *2)
      && y >= ball.y
      && y <= ball.y + (ball.radius *2)
    ) {
      ballList.splice(i, 1);
    }
  }
   
   
});



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
      ctx.drawImage(img, this.x, this.y, this.radius,30);
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
