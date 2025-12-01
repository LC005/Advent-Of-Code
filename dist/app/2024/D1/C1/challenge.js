"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_importer_1 = require("../../../common/file-importer");
const fileImporter = new file_importer_1.FileImporter({
    modifyData: (data) => {
        const col1 = [];
        const col2 = [];
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
    function sortAscending(arr) {
        return arr.slice().sort((a, b) => a - b);
    }
    function calculateDeltaSum(arr1, arr2) {
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
//# sourceMappingURL=challenge.js.map