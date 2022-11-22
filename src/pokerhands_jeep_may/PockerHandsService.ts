import * as fs from 'fs';


const countPersonPlayed = (fileName: string): string => {
    try {
        const line = fs.readFileSync('example_data/' + fileName,'utf8');
        return line
    } catch (err) {
        return ''
    }
} 

export default { countPersonPlayed }