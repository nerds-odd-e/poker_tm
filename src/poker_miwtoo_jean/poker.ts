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

export function winnerDetector2(gamesRaw: String) {
    const gameRaw = gamesRaw;
    return winnerOfGame(gameRaw);
}

export function winnerOfGame(gameRaw: String) {
        if (gameRaw != '') {
            const splitSpace = gameRaw.split(" ")
            let startPosition = 0
            const player1: PlayerHand = {
                name: splitSpace[].replace(':', ''),
                hand: splitSpace.slice(1, 6),
                point: calculateHighCard(splitSpace.slice(1, 6))
            }

            startPosition = 6
            const player2: PlayerHand = {
                name: splitSpace[startPosition].replace(':', ''),
                hand: splitSpace.slice(startPosition + 1, startPosition + 6),
                point: calculateHighCard(splitSpace.slice(startPosition + 1, startPosition + 6))
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

function compareHands(player1: PlayerHand, player2: PlayerHand) {
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


class PlayerHand {
    name: string
    point: number
    hand: string[]
} 