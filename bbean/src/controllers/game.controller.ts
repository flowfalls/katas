import { Game } from "../services/game.js";

export class GameController {
  private game: Game;

  constructor(private readonly name: string, numberOfDice: number) {
    this.game = new Game(numberOfDice);

  }

  public startGame(): Array<number> {
    console.log('starting game');
    return this.game.rollDice();
  }

  public get gameName(): string {
    return this.name;
  }
}
