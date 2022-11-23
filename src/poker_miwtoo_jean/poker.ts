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

export function winnerDetector(gamesRaw: string) {
    const gameRaw = gamesRaw;
    return winnerOfGame(gameRaw);
}

export function winnerOfGame(gameRaw: string) {
    if (gameRaw != '') {
        const player1: PlayerHand = PlayerHand.playerHand1(gameRaw)
        const player2: PlayerHand = PlayerHand.playerHand2(gameRaw)

        return player1.compareHands(player2)
    }
}

class Hand {
    cards: string[];

    constructor(cards: string[]) {
        this.cards = cards
    }

    calculateHighCard() {
        let maxPlayerPoint = 0
        this.cards.forEach(
            hand => {
                const number = hand.charAt(0);
                const point = cardFace.get(number) || 0;
                if (point > maxPlayerPoint)
                    maxPlayerPoint = point;
            }
        );
        return maxPlayerPoint;
    }

}

class PlayerHand {
    static playerHand1(gameRaw: string): PlayerHand {
        return new PlayerHand(gameRaw, 0)
    }
    static playerHand2(gameRaw: string): PlayerHand {
        return new PlayerHand(gameRaw, 6)
    }
    name: string
    hand: Hand

    private constructor(gameRaw: string, startPosition: number) {
        const splitSpace = gameRaw.split(" ")
        this.name = splitSpace[startPosition].replace(':', '')
        this.hand = new Hand(splitSpace.slice(startPosition + 1, startPosition + 6))
    }

    get point() {

        return this.hand.calculateHighCard();
    }

    compareHands(player: PlayerHand) {
        if (this.point > player.point) {
            return [
                {
                    name: this.name,
                    winrate: 100
                },
                {
                    name: player.name,
                    winrate: 0
                }
            ]
        }
    
        if (player.point > this.point) {
            return [
                {
                    name: player.name,
                    winrate: 100
                },
                {
                    name: this.name,
                    winrate: 0
                }
            ]
        }
    
        return [
            {
                name: this.name,
                winrate: 50
            },
            {
                name: player.name,
                winrate: 50
            }
        ]
    }
} 