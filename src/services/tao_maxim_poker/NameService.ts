import * as fs from 'fs';

export function getNames(fileName: string) {
    if (fs.existsSync(fileName)) {
      fs.readFileSync(fileName, 'utf8');
    }
    return [];
}