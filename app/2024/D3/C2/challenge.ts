import { FileImporter } from '../../../common/file-importer';

const fileImporter = new FileImporter({
  modifyData: (data: string) => {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;

    const matches = [...data.matchAll(regex)];

    return matches;
  }
});

const mainLoop = () => {
  const data = fileImporter.fileDataModified;

  let active = true;
  let result = 0;

  data.forEach((d) => {
    const fullMatch = d[0];

    if (fullMatch === 'do()') {
      active = true;
    } else if (fullMatch === "don't()") {
      active = false;
    }

    if (active && d[1]) {
      const [a, b] = [parseInt(d[1], 10), parseInt(d[2], 10)];
      const product = a * b;
      result += product;
    }
  });

  return result;
};

console.log('Solution:', mainLoop());
