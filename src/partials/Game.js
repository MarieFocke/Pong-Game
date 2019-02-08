import { SVG_NS, KEYS } from "../settings";
import Board from './Board';
import Paddle from './Paddel';
import Ball from './Ball';

export default class Game {
  constructor(element, width, height) {
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(element);
    this.radius = 8;
    this.boardWidth = 256;
    this.boardHeight = 150;
    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;
    this.board = new Board(this.width, this.height)

    this.player1 = new Paddle(
      this.height, 
      this.paddleWidth, 
      this.paddleHeight, 
      this.boardGap,
      (this.height - this.paddleHeight) /2, 
      KEYS.a,
      KEYS.z
    )
    this.player2 = new Paddle(
      this.height, 
      this.paddleWidth, 
      this.paddleHeight,
      this.width - this.paddleWidth - this.boardGap,
      (this.height - this.paddleHeight) /2,
      KEYS.up,
      KEYS.down
    )
    this.ball = new Ball(
    this.radius,
    this.boardWidth,
    this.boardHeight,
    )
  }

  render() {
    // empty game elemensts
    this.gameElement.innerHTML = "";

    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    svg.setAttributeNS(null, "version", "1.1");
    this.gameElement.appendChild(svg);

    //rending all game inside th svg..
    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
    this.ball.render(svg);
  }
}

