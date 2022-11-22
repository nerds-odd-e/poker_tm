const winRateDetector = (record: string) => {
    const playerCollection: {
        name: string;
        winningCount: number;
        gameCount: number;
        winRate: number;
    }[] = []
    const findWinnerResult = findWinner(record)

    let player1result
    const player1Collection = playerCollection.find(player => player.name === findWinnerResult[0].name)
    if (player1Collection) {
        player1Collection.gameCount++
        player1Collection.winningCount = findWinnerResult[0].winner ? player1Collection.winningCount + 1 : player1Collection.winningCount
        player1Collection.winRate = player1Collection.winningCount / player1Collection.gameCount * 100
        player1result = player1Collection
    }
    else {
        const player1Data = {
            name: findWinnerResult[0].name,
            winningCount: findWinnerResult[0].winner ? 1 : 0,
            gameCount: 1,
            winRate: findWinnerResult[0].winner ? 100 : 0,
        }
        playerCollection.push(player1Data)
        player1result = player1Data
    }

    let player2result
    const player2Collection = playerCollection.find(player => player.name === findWinnerResult[1].name)
    if (player2Collection) {
        player2Collection.gameCount++
        player2Collection.winningCount = findWinnerResult[1].winner ? player2Collection.winningCount + 1 : player2Collection.winningCount
        player2Collection.winRate = player2Collection.winningCount / player2Collection.gameCount * 100
        player2result = player2Collection
    }
    else {
        const player2Data = {
            name: findWinnerResult[1].name,
            winningCount: findWinnerResult[1].winner ? 1 : 0,
            gameCount: 1,
            winRate: findWinnerResult[1].winner ? 100 : 0,
        }
        playerCollection.push(player2Data)
        player2result = player2Data
    }

    return [
        { name: player1result.name, rate: player1result.winRate },
        { name: player2result.name, rate: player2result.winRate },
        // { name: findWinnerResult[0].name, rate: 0 },
        // { name: findWinnerResult[1].name, rate: 100 },
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

export { winRateDetector };
