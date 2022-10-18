import { GameController } from "./game.controller.js";

describe('GameController', () => {
  let gameController: GameController;

  beforeEach(() => {
    jest.clearAllMocks();
    gameController = new GameController('test', 5);
  });

  it('should create a game controller', () => {
    expect(gameController).toBeDefined();
  });

  it('should start a game', () => {
    const gameResults = gameController.startGame();
    expect(gameResults).toBeDefined();
    expect(gameResults.length).toEqual(5);
  });
});
