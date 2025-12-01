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
  function findOccurrences(target: number, numbers: number[]): number {
    return numbers.filter((num) => num === target).length;
  }
  
  function calculateScore(target:number, occurrences: number): number {
    return target * occurrences;
  }
  
  const { col1, col2 } = fileImporter.fileDataModified;
  
  let totalScore = 0;
  
  col1.forEach((target: number) => {
    const occurrences = findOccurrences(target, col2);
    totalScore += calculateScore(target, occurrences);
  });
  
  return totalScore;
};

console.log('Solution:', mainLoop());
