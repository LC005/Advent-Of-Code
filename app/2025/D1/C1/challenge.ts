import { FileImporter } from "../../../common/file-importer";

const fileImporter = new FileImporter({
  modifyData: (data: string) => {
    return data.split('\n').map(line => line.trim()).map((line) => ({ dir: line[0], value: line.slice(1) }));
  }
});

const mainLoop = () => {
  let positon = 50;
  let targetPositionCounter = 0;
  const targetPosition = 0;

  fileImporter.fileDataModified.forEach((instruction: { dir: string; value: string }) => {
    let value = instruction.value;

    if (value.length > 2) {
      value = value.slice(-2);
    }

    if (instruction.dir === 'R') {
      positon += parseInt(value);
      if (positon > 99) {
        positon -= 100;
      }
    } else if (instruction.dir === 'L') {
      positon -= parseInt(value);
      if (positon < 0) {
        positon += 100;
      }
    }

    if (positon === targetPosition) {
      targetPositionCounter++;
    }
  });

  return targetPositionCounter;
};

console.log('Solution:', mainLoop());
