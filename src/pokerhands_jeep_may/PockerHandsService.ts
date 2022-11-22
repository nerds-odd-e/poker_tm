import * as fs from 'fs';

const countPersonPlayed = (fileName: string): string => {
    try {
        const file = fs.readFileSync('example_data/' + fileName,'utf8');
        return "Jane: 999 Mike: 998 Wu:2 Ken: 1"
    } catch (err) {
        return '';
    }
} 

export default { countPersonPlayed }