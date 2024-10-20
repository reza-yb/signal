import fs0 from "fs/promises";

export interface FileReader {
  readFile(filePath: string): Promise<string>;
}

export class BrowserFileReader implements FileReader {
  async readFile(filePath: string): Promise<string> {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  }
}

export class NodeFileReader implements FileReader {
  private fs: typeof import('fs/promises');

  constructor() {
    this.fs = fs0;
  }

  async readFile(filePath: string): Promise<string> {
    return await this.fs.readFile(filePath, 'utf-8');
  }
}

export const getFileReader = (): FileReader => {
  if (typeof window === 'undefined') {
    return new NodeFileReader();
  } else {
    return new BrowserFileReader();
  }
};
