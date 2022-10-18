//detect duplicate values in array
const returnMostCommonEntryInArray = function(array: any[]):number {
  const count: Array<number> = [];
  array.forEach((i) => {
    count[i] = (count[i] || 0) + 1;
  });

 return Math.max(...count.filter(Number));
}

export default returnMostCommonEntryInArray;
