
class PlayerCollection {
    name: string;
    winningCount: number;
    gameCount: number;
    winRate: number;
}

class GameResult {
    name: string;
    winner: boolean;
}

const winRateDetector = (game: string) => {

    const playerCollection: PlayerCollection[] = []
    const gameResult = play(game) as GameResult[]

    const player1Collection = playerCollection.find(player => player.name === gameResult[0].name) as PlayerCollection
    let player1result = getPlayerResult(player1Collection, gameResult[0])
    
    const player2Collection = playerCollection.find(player => player.name === gameResult[1].name) as PlayerCollection
    let player2result = getPlayerResult(player2Collection, gameResult[1])
    
    return [
        { name: player1result.name, rate: player1result.winRate },
        { name: player2result.name, rate: player2result.winRate },
    ]
}

const play = (game: string) => {
    const playerSplitted = game.split(' ')
    const player1Name = playerSplitted[0].replace(':', '')
    const player2Name = playerSplitted[6].replace(':', '')
    return [
        { name: player1Name, winner: false },
        { name: player2Name, winner: true },
    ]
}

const getPlayerResult = (playerCollection: PlayerCollection, findWinnerResult: GameResult ) => {
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
