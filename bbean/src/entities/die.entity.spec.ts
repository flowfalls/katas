import { Die } from "./die.entity.js";

describe('DieEntity', () => {

  let die: Die;

  beforeEach(() => {
    jest.clearAllMocks();
    die = new Die();
  });

  it('should create a die', () => {
    expect(die).toBeDefined();
  });

  it('should roll a die', () => {
    die.rollDie();
    expect(die.dieResult).toBeDefined();
  });

  it('should call the randomGenerateRoll function', () => {
    const die = new Die();
    const rollSpy = jest.spyOn(Die.prototype as any, 'randomGenerateRoll');

    die.rollDie();
    expect(rollSpy).toHaveBeenCalledTimes(1);
  });

  it('should roll a die between 1 and 6', () => {
    die.rollDie();
    expect(die.dieResult).toBeGreaterThanOrEqual(1);
    expect(die.dieResult).toBeLessThanOrEqual(6);
  });
});
