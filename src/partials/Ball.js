import { SVG_NS } from "../settings";
import { globalAgent } from "http";
export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    //set X and Y coordinates at the center
    this.reset();
  }
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    //generating a random number between -5 and 5
    this.vy =0;
    while(this.vy === 0){
    this.vy = Math.floor(Math.random() * 10 - 5);  
    }
    //setting a number between -5 and 5, based on vz
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }
  wallCollision(){
    const hitLeft = this.x - this.radius <=0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <=0;
    const hitBottom = this.y + this.radius >= this.boardHeight;
    if (hitLeft || hitRight) {
        this.vx = - this.vx;
    }  else if (hitTop || hitBottom) {
        this.vy = -this.vy;
    }

  }
  paddelCollision(player1, player2){
    if (this.vx > 0) {
        let paddel = player2.coordinates(player2.x, player2.y, player2.width, player2.height)
        let {leftX, topY, bottomY} = paddel;
        if (
            this.x + this.radius >= leftX
            && this.y >= topY 
            && this.y <= bottomY
        ){
            this.vx = -this.vx;
        }
    } else {
        let paddel = player1.coordinates(player1.x, player1.y, player1.width, player1.height)
        let {rightX, topY, bottomY} = paddel;
        if (
            this.x - this.radius <= rightX
            && this.y >= topY 
            && this.y <= bottomY
        ){
            this.vx = -this.vx;
        }
    }

    globalAgent(player){
        
    }
  }


  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;
    this.wallCollision();
    this.paddelCollision(player1, player2);
    let ball = document.createElementNS(SVG_NS, "circle");
    ball.setAttributeNS(null, "cx", this.x);
    ball.setAttributeNS(null, "cy", this.y);
    ball.setAttributeNS(null, "r", this.radius);
    ball.setAttributeNS(null, "fill", "white");
    svg.appendChild(ball);
  }
}
