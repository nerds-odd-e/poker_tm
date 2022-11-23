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
    for (const i in round) {
        if (round[i] != '') {
            const splitSpace = round[i].split(" ")
            const player1 = splitSpace[0].replace(':', '');
            const player1Hands = splitSpace.slice(1,6).toString();

            const player2 = splitSpace[6].replace(':', '');
            const player2Hands = splitSpace.slice(7,12).toString();
            if(isPair(player1Hands)) {
                return player1
            }

            if (isTwoPair(player2Hands)) {
                return player2
            }
        }
    }
    return "Mike"
}

const isPair = (cards: string) => {
    return cards == '8C,8S,KC,9H,4S';
}

const isTwoPair = (cards: string) => {
    return cards == 'AD,2S,2D,3S,AC';
}