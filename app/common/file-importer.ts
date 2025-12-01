import fs from 'fs';

export interface FileImperterInput<T = string> {
  fileName?: string;
  modifyData?: (data: string) => T;
  verbose?: boolean;
}

export class FileImporter<T = string> {
  readonly fileName: string;
  readonly fileData: string;
  readonly fileDataModified: T;

  private readonly verbose!: boolean;

  constructor(private _input: FileImperterInput<T>) {
    this.fileName = _input.fileName ?? process.argv[2];
    this.fileData = this._importedData(this.fileName);
    this.fileDataModified = this._input.modifyData ? this._input.modifyData(this.fileData) : (this.fileData as unknown as T);
    this.verbose = _input.verbose ?? false;

    if (this.verbose) {
      console.log(`File name: ${this.fileName}`);
      console.log(`File data:`, this.fileData);
      console.log(`Modified file data:`, this.fileDataModified ?? 'N/A');
    }
  }

  private _importedData(fileName: string) {
    const data = fs.readFileSync(fileName, 'utf8');
    return data;
  }
}