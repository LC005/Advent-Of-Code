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
    function findOccurrences(target, numbers) {
        return numbers.filter((num) => num === target).length;
    }
    function calculateScore(target, occurrences) {
        return target * occurrences;
    }
    const { col1, col2 } = fileImporter.fileDataModified;
    let totalScore = 0;
    col1.forEach((target) => {
        const occurrences = findOccurrences(target, col2);
        totalScore += calculateScore(target, occurrences);
    });
    return totalScore;
};
console.log('Solution:', mainLoop());
//# sourceMappingURL=challenge.js.map