import {SVG_NS} from '../settings';
export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
      this.radius = radius;
      this.boardWidth = boardWidth;
      this.boardHeight = boardHeight;
      this.direction = 1;
    }
    render(svg){
        let ball = document.createElementNS(SVG_NS, 'circle');
        ball.setAttributeNS(null, "cx", this.boardWidth);
        ball.setAttributeNS(null, "cy", this.boardHeight);
        ball.setAttributeNS(null, "r", this.radius);
        ball.setAttributeNS(null, "fill", "white");
    svg.appendChild(ball);
    }
  }