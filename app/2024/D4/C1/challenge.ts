import { FileImporter } from '../../../common/file-importer';
import { Grid } from '../../../common/grid';

const fileImporter = new FileImporter({
  modifyData: (data: string) => {
    return data.split('\n').map((line) => line.split(''));
  }
});

const mainLoop = () => {
  const gridData = fileImporter.fileDataModified as string[][];
  const grid = new Grid<string>(gridData);

  // Start by finding all 'X' coordinates 
  const startingPoints = grid.findAllCoordinatesWithValue('X');
  let amountOfXMAS = 0;

  // Figure out all viable directions and then trace them to find 'M', 'A', 'S'
  startingPoints.forEach((startPoint) => {
    const foundNeighbors = startPoint.findNeighborsWithValue('M');

    const searchDirections = Object.entries(foundNeighbors).filter(([_, neighbor]) => neighbor !== undefined).map(([direction, _]) => direction as keyof typeof startPoint.neighbors);

    searchDirections.forEach((direction) => {
      const firstNeighbor = startPoint.neighbors[direction];
      if (!firstNeighbor || firstNeighbor.value !== 'M') return;
      const secondNeighbor = firstNeighbor.neighbors[direction];
      if (!secondNeighbor || secondNeighbor.value !== 'A') return;
      const thirdNeighbor = secondNeighbor.neighbors[direction];
      if (!thirdNeighbor || thirdNeighbor.value !== 'S') return;
      amountOfXMAS++;
    });
  });

  return amountOfXMAS;
}

console.log('Solution:', mainLoop());
