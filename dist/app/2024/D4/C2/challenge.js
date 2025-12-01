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
    // Start by finding all 'A' coordinates
    const startingPoints = grid.findAllCoordinatesWithValue('A');
    const searchLetters = ['M', 'S'];
    let amountOfXMAS = 0;
    // Figure out all startpoints that have MAS in 1 diagonal and MAS in the other diagonal. X is no longer needed.
    startingPoints.forEach((startPoint) => {
        const ul = startPoint.findNeighborInDirection('UpLeft');
        const ur = startPoint.findNeighborInDirection('UpRight');
        const dl = startPoint.findNeighborInDirection('DownLeft');
        const dr = startPoint.findNeighborInDirection('DownRight');
        const ulDrDiagonalValid = (ul && searchLetters.includes(ul.value) && dr && searchLetters.includes(dr.value) && ul.value !== dr.value);
        const urDlDiagonalValid = (ur && searchLetters.includes(ur.value) && dl && searchLetters.includes(dl.value) && ur.value !== dl.value);
        if (ulDrDiagonalValid && urDlDiagonalValid) {
            amountOfXMAS++;
        }
    });
    return amountOfXMAS;
};
console.log('Solution:', mainLoop());
//# sourceMappingURL=challenge.js.map