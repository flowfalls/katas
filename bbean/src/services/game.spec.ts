import { Game } from './game.js';

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    jest.clearAllMocks();
    game = new Game(5);
  });

  it('should create a game', () => {
    expect(game).toBeDefined();
  });

  it('should roll dice', () => {
    const results = game.rollDice();
    expect(results).toBeDefined();
  });

  it('should roll 5 dice', () => {
    const results = game.rollDice();
    expect(Object.keys(results).length).toEqual(5);
  });
});
