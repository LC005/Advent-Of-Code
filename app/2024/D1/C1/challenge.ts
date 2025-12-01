import { FileImporter } from '../../../common/file-importer';

const fileImporter = new FileImporter({
  modifyData: (data: string) => {
    const col1: number[] = [];
    const col2: number[] = [];

    data
      .trim()
      .split('\n')
      .forEach((line) => {
        const [a, b] = line.trim().split(/\s+/).map(Number);
        col1.push(a);
        col2.push(b);
      });

    return { col1, col2 };
  },
  verbose: false
});

const mainLoop = () => {
  function sortAscending(arr: number[]): number[] {
    return arr.slice().sort((a, b) => a - b);
  }

  function calculateDeltaSum(arr1: number[], arr2: number[]): number {
    let deltaSum = 0;

    for (let i = 0; i < arr1.length; i++) {
      deltaSum += Math.abs(arr1[i] - arr2[i]);
    }

    return deltaSum;
  }

  const { col1, col2 } = fileImporter.fileDataModified;

  const col1Sorted = sortAscending(col1);
  const col2Sorted = sortAscending(col2);

  const deltaSum = calculateDeltaSum(col1Sorted, col2Sorted);

  return deltaSum;
};

console.log('Solution:', mainLoop());
