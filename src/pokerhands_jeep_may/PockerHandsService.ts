import * as fs from 'fs';


const countPersonPlayed = (fileName: string): string => {
    try {
        const file = fs.readFileSync('example_data/' + fileName,'utf8');
        const lines = file.split(/\r?\n/)

        const result = lines.map(line => {
            const splited = line.split(" ");
            return splited[0]+splited[6]
          });

        return result[0];

    } catch (err) {
        return '';
    }
} 

export default { countPersonPlayed }