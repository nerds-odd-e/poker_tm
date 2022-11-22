const winRateDetector = (record: string) => {
    
    const result = findWinner(record)

    return [
        { name: result[0].name, rate: 0 },
        { name: result[1].name, rate: 100 },
    ]
}

const findWinner = (record: string) => {
    const playerSplitted = record.split(' ')
    const player1Name = playerSplitted[0].replace(':','')
    const player2Name = playerSplitted[6].replace(':','')
    return [
        { name: player1Name, winner: false },
        { name: player2Name, winner: true },
    ]
}

export { winRateDetector };
