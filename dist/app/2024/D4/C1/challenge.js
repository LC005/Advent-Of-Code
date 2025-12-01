"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_importer_1 = require("../../../common/file-importer");
const grid_1 = require("../../../common/grid");
const fileImporter = new file_importer_1.FileImporter({
    modifyData: (data) => {
        return data.split('\n').map((line) => line.split(''));
    }
});
const mainLoop = () => {
    const gridData = fileImporter.fileDataModified;
    const grid = new grid_1.Grid(gridData);
    // Start by finding all 'X' coordinates 
    const startingPoints = grid.findAllCoordinatesWithValue('X');
    let amountOfXMAS = 0;
    // Figure out all viable directions and then trace them to find 'M', 'A', 'S'
    startingPoints.forEach((startPoint) => {
        const foundNeighbors = startPoint.findNeighborsWithValue('M');
        const searchDirections = Object.entries(foundNeighbors).filter(([_, neighbor]) => neighbor !== undefined).map(([direction, _]) => direction);
        searchDirections.forEach((direction) => {
            const firstNeighbor = startPoint.neighbors[direction];
            if (!firstNeighbor || firstNeighbor.value !== 'M')
                return;
            const secondNeighbor = firstNeighbor.neighbors[direction];
            if (!secondNeighbor || secondNeighbor.value !== 'A')
                return;
            const thirdNeighbor = secondNeighbor.neighbors[direction];
            if (!thirdNeighbor || thirdNeighbor.value !== 'S')
                return;
            amountOfXMAS++;
        });
    });
    return amountOfXMAS;
};
console.log('Solution:', mainLoop());
//# sourceMappingURL=challenge.js.map