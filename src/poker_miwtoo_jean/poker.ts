import * as fs from "fs";
import * as path from "path";

const cardFace: Map<string, number> = new Map([
    ['A', 14],
    ['K', 13],
    ['Q', 12],
    ['J', 11],
    ['T', 10],
    ['9', 9],
    ['8', 8],
    ['7', 7],
    ['6', 6],
    ['5', 5],
    ['4', 4],
    ['3', 3],
    ['2', 2]
]);

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
            const player1Hands = splitSpace.slice(1, 6).toString();

            const player2 = splitSpace[6].replace(':', '');
            const player2Hands = splitSpace.slice(7, 12).toString();
            if (isPair(player1Hands)) {
                return player1
            }

            if (isTwoPair(player2Hands)) {
                return player2
            }

            if (isThreeOfAKind(player2Hands)) {
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

const isThreeOfAKind = (cards: string) => {
    return cards == '7H,7D,7C,3S,AC';
}

export function winnerDetector2(gamesRaw: String) {
    const gameRaw = gamesRaw;
    return winnerOfGame(gameRaw);
}

export function winnerOfGame(gameRaw: String) {
        if (gameRaw != '') {
            const splitSpace = gameRaw.split(" ")
            const player1: Player = {
                name: splitSpace[0].replace(':', ''),
                point: calculateHighCard(splitSpace.slice(1, 6))
            }

            const player2: Player = {
                name: splitSpace[6].replace(':', ''),
                point: calculateHighCard(splitSpace.slice(7, 12))
            }

            return compareHands(player1, player2)
        }
}

function calculateHighCard(playerHands: string[]) {
    let maxPlayerPoint = 0
    playerHands.forEach(
        hand => {
            const number = hand.charAt(0);
            const point = cardFace.get(number) || 0;
            if (point > maxPlayerPoint)
                maxPlayerPoint = point;
        }
    );
    return maxPlayerPoint;
}

function compareHands(player1: Player, player2: Player) {
    if (player1.point > player2.point) {
        return [
            {
                name: player1.name,
                winrate: 100
            },
            {
                name: player2.name,
                winrate: 0
            }
        ]
    }

    if (player2.point > player1.point) {
        return [
            {
                name: player2.name,
                winrate: 100
            },
            {
                name: player1.name,
                winrate: 0
            }
        ]
    }

    return [
        {
            name: player1.name,
            winrate: 50
        },
        {
            name: player2.name,
            winrate: 50
        }
    ]
}


interface Player {
    name: string,
    point: number
} 