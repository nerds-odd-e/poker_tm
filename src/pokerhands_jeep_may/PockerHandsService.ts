import * as fs from 'fs';

const countPersonPlayed = (fileName: string): string => {
    let map = new Map()
        const file = fs.readFileSync('__tests__/pokerhands_jeep_may/data/' + fileName,'utf8');
        const data = file.split(/\r?\n/)
        .map(line =>  line.split(' ').filter(item => item.endsWith(':')))
        .flatMap(array => array)
        .map(data => {
            if (map.has(data)) {
                map.set(data, map.get(data) + 1)
            } else {
                map.set(data, 1)
            }
            return map
        })
        
    const result = data.keys()

    var s = ''
    for (var i = 0; i < data.keys.length ; i++) {
        s += result.next().value + " " + ""
    }
    return s
} 

export default { countPersonPlayed }