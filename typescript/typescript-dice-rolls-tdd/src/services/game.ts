import { Die } from '../entities/die.entity.js';

export class Game {
  private dice: Die[] = [];

  constructor(public readonly rolls: number = 5) {
    // create new Die objects
    for (let i = 0; i < this.rolls; i++) {
      this.dice.push(new Die());
    }
  }

  public rollDice(): Array<number> {
    const results: Array<number> = [];
    for (let i = 0; i < this.dice.length; i++) {
      const die = this.dice[i];
      die.rollDie();
      results[i] = die.dieResult;
    }
    return results;
  }
}
