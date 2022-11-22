import * as fs from 'fs';

export function getNames(fileName: string): string[] {
    if (fs.existsSync(fileName)) {
      const lines = fs.readFileSync(fileName, 'utf8');

    return lines.split(/\r?\n/).map(line => {
        const names = line.split(/(\s)/)
            .filter(item => item.endsWith(":"))
            .map(name => name.substring(0, name.length-1));
        return names;
    }).flatMap(array => array)
    }
    return [];
}