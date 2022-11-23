
class PlayerCollection {
    name: string;
    winningCount: number;
    gameCount: number;
    winRate: number;
}

class FindWinnerResult {
    name: string;
    winner: boolean;
}

const winRateDetector = (game: string) => {

    const playerCollection: PlayerCollection[] = []
    const findWinnerResult = findWinner(game) as FindWinnerResult[]

    const player1Collection = playerCollection.find(player => player.name === findWinnerResult[0].name) as PlayerCollection
    let player1result = getPlayerResult(player1Collection, findWinnerResult[0])
    
    const player2Collection = playerCollection.find(player => player.name === findWinnerResult[1].name) as PlayerCollection
    let player2result = getPlayerResult(player2Collection, findWinnerResult[1])
    
    return [
        { name: player1result.name, rate: player1result.winRate },
        { name: player2result.name, rate: player2result.winRate },
    ]
}

const findWinner = (record: string) => {
    const playerSplitted = record.split(' ')
    const player1Name = playerSplitted[0].replace(':', '')
    const player2Name = playerSplitted[6].replace(':', '')
    return [
        { name: player1Name, winner: false },
        { name: player2Name, winner: true },
    ]
}

const getPlayerResult = (playerCollection: PlayerCollection, findWinnerResult: FindWinnerResult ) => {
    if (playerCollection) {
        playerCollection.gameCount++
        playerCollection.winningCount = findWinnerResult.winner ? playerCollection.winningCount + 1 : playerCollection.winningCount
        playerCollection.winRate = playerCollection.winningCount / playerCollection.gameCount * 100
        return playerCollection
    }
    else {
        const player2Data = {
            name: findWinnerResult.name,
            winningCount: findWinnerResult.winner ? 1 : 0,
            gameCount: 1,
            winRate: findWinnerResult.winner ? 100 : 0,
        }
        return player2Data
    }
}

export { winRateDetector };
