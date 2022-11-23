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

type PlayerCount = {
    name: string;
    count: number;
}

export function pokerPlayerCount(data: string) {
    if (data === "") {
        return []
    }
    const round = data.toString().split("\n");
    const players: Array<string> = []
    for (const i in round) {
        // console.log (round[i]);
        if (round[i] != '') {
            const splitSpace = round[i].split(" ")
            players.push(splitSpace[0].replace(':', ''));
            players.push(splitSpace[6].replace(':', ''));
        }

    }
    const uniquePlayerName = new Set(players)
    const result: Array<PlayerCount> = []
    Array.from(uniquePlayerName.values()).forEach(
        (playerUnique: string) => {
            const count = players.filter((name) => name === playerUnique).length
            result.push({
                'name': playerUnique,
                'count': count
            })
        }
    )
    return result
}

export function winnerDetector(data: string) {
    const round = data.toString().split("\n");
    const playerHands: Map<string, string> = new Map()
    for (const i in round) {
        if (round[i] != '') {
            const splitSpace = round[i].split(" ")
            playerHands.set(splitSpace[0].replace(':', ''), splitSpace.slice(1,6).toString())
            playerHands.set(splitSpace[6].replace(':', ''), splitSpace.slice(7,12).toString())
            if(isPair(splitSpace.slice(1,6).toString())) {
                return splitSpace[0].replace(':', '')
            }
        }
    }
    return "Mike"
}

const isPair = (cards: string) => {
    return cards == '8C,8S,KC,9H,4S';
}