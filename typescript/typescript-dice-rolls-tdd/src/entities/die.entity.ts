// ensure we adhere to the interface
interface DieData {
  dieResult: 1 | 2 | 3 | 4 | 5 | 6; // restrict die to 1-6
}

// our die class (this would be an entity in a database)
export class Die implements DieData {
  // implement the interface
  dieResult: 1 | 2 | 3 | 4 | 5 | 6;
  gameId?: string;

  /**
   * Function to roll the die
   *
   * @returns {DieData['dieResult']} the result of the roll
   */
  rollDie(): void {
    this.dieResult = this.randomGenerateRoll();
  }

  toObject(): Die {
    return { ...this };
  }

  /**
   * Example of a private function that generates the roll result
   * @returns {DieData['dieResult']} a random number between 1 and 6
   */
  private randomGenerateRoll(): DieData['dieResult'] {
    const rollResult = Math.floor(Math.random() * 6) + 1;

    // The following line is to ensure that the roll result is a number between 1 and 6
    if (rollResult > 0 && rollResult < 7) {
      return rollResult as DieData['dieResult']; // TODO: look at a better way for implementing bounds
    } else {
      // if the roll result is not a number between 1 and 6, throw an error
      throw new Error('Invalid roll result');
    }
  }
}
