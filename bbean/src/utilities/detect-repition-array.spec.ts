import returnMostCommonEntryInArray from "./detect-repetition-array.js";

describe('returnMostCommonEntryInArray', () => {
  it('should detect duplicate values in array', () => {
    const array = [1, 2, 2, 2, 1, 3, 2];
    const count = returnMostCommonEntryInArray(array);
    expect(count).toEqual(4);
  });

  it('should detect 3 duplicate values', () => {
    const array = [1, 2, 2, 2, 1, 3];
    const count = returnMostCommonEntryInArray(array);
    expect(count).toEqual(3);
  });

  it('should detect 2 duplicate values', () => {
    const array = [1, 2, 5, 2, 1, 3];
    const count = returnMostCommonEntryInArray(array);
    expect(count).toEqual(2);
  });
});
