"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_importer_1 = require("../../../common/file-importer");
const number_array_checks_1 = require("../../../common/number-array-checks");
const fileImporter = new file_importer_1.FileImporter({
    modifyData: (data) => {
        let output;
        output = data.split('\n').map((line) => line.trim());
        output = output.map((line) => line.split(' ').map(Number));
        return output;
    },
    verbose: true
});
const mainLoop = () => {
    return fileImporter.fileDataModified.map((line) => {
        const isIncreasing = (0, number_array_checks_1.checkAllIncreasing)(line);
        const isDecreasing = (0, number_array_checks_1.checkAllDecreasing)(line);
        const isDeltaValid = (0, number_array_checks_1.checkDeltaNotOver)(line, 3);
        const isValid = (isIncreasing || isDecreasing) && isDeltaValid;
        if (!isValid) {
            for (let i = 0; i < line.length; i++) {
                const newArr = [...line];
                newArr.splice(i, 1);
                const isOptionIncreasing = (0, number_array_checks_1.checkAllIncreasing)(newArr);
                const isOptionDecreasing = (0, number_array_checks_1.checkAllDecreasing)(newArr);
                const isOptionDeltaValid = (0, number_array_checks_1.checkDeltaNotOver)(newArr, 3);
                if ((isOptionIncreasing || isOptionDecreasing) && isOptionDeltaValid) {
                    return true;
                }
            }
        }
        return isValid;
    }).reduce((acc, curr) => acc + (curr ? 1 : 0), 0);
};
console.log('Solution:', mainLoop());
//# sourceMappingURL=challenge.js.map