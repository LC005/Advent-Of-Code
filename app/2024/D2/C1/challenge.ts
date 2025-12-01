import { FileImporter } from '../../../common/file-importer';
import { checkAllDecreasing, checkAllIncreasing, checkDeltaNotOver } from '../../../common/number-array-checks';

const fileImporter = new FileImporter({
  modifyData: (data: string) => {
    let output;
    output = data.split('\n').map((line) => line.trim());
    output = output.map((line) => line.split(' ').map(Number));

    return output;
  },
  verbose: true
});

const mainLoop = () => {
  return fileImporter.fileDataModified.map((line: number[]) => {
    const isIncreasing = checkAllIncreasing(line);
    const isDecreasing = checkAllDecreasing(line);
    const isDeltaValid = checkDeltaNotOver(line, 3);

    return (isIncreasing || isDecreasing) && isDeltaValid;
  }).reduce((acc, curr) => acc + (curr ? 1 : 0), 0);
};

console.log('Solution:', mainLoop());
