import { FileImporter } from '../../../common/file-importer';

const fileImporter = new FileImporter({
  modifyData: (data: string) => {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

    const matches = [...data.matchAll(regex)];

    return matches.map(match => {
      return parseInt(match[1], 10) * parseInt(match[2], 10);
    });
  }
});

const mainLoop = () => {
  const data = fileImporter.fileDataModified;

  return data.reduce((acc, val) => acc + val, 0);
};

console.log('Solution:', mainLoop());
