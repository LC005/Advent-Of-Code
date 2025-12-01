"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileImporter = void 0;
const fs_1 = __importDefault(require("fs"));
class FileImporter {
    constructor(_input) {
        this._input = _input;
        this.fileName = _input.fileName ?? process.argv[2];
        this.fileData = this._importedData(this.fileName);
        this.fileDataModified = this._input.modifyData ? this._input.modifyData(this.fileData) : this.fileData;
        this.verbose = _input.verbose ?? false;
        if (this.verbose) {
            console.log(`File name: ${this.fileName}`);
            console.log(`File data:`, this.fileData);
            console.log(`Modified file data:`, this.fileDataModified ?? 'N/A');
        }
    }
    _importedData(fileName) {
        const data = fs_1.default.readFileSync(fileName, 'utf8');
        return data;
    }
}
exports.FileImporter = FileImporter;
//# sourceMappingURL=file-importer.js.map