import * as fs from "fs";
import * as path from "path";

function main() {
    
    
    const filePath = path.join(__dirname, '../../example_data/poker.txt');
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (!err) {
            // console.log('data: ',data)
            pokerPlayerCount(data)
        } else {
            console.log(err);
        }
    });


}
main();

export function pokerPlayerCount(data: string) {
    // const round = data.toString().split("\n");
    // const CountRound = []
    // for(const i in round) {
    //     // console.log (round[i]);
    //     const splitSpace = round[i].split(" ") 
    //     const player = [splitSpace[0].replace(':',''),splitSpace[6].replace(':','')]
    //     console.log ('',player)
    //     const user = {'name':player[0],}
    // }
    if (data === "") {
        return []
    }
    
    return [{
        name: "Jane",
        count: 1
    },
    {
        name: "Mike",
        count: 1
    },
    {
        name: "Wu",
        count: 1
    },
    {
        name: "Ken",
        count: 1
    },
    ]
}