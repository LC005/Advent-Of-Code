"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_importer_1 = require("../../../common/file-importer");
const fileImporter = new file_importer_1.FileImporter({
    modifyData: (data) => {
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
//# sourceMappingURL=challenge.js.map