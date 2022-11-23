import { topFiveWinRatePlayer, winnerOfGame } from "../../../src/poker_hand_toptoppy_builder/romantic_way/cheaterDetector"

describe('Cheater detector', () => {
    it('Show win rate with Mike, Jane', () => {
        const record = 'Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC'
        const result = topFiveWinRatePlayer(record)
        expect(result).toContain('Mike 100%')
    })

    it('Show win rate with Wu, Mike', () => {
        const record = 'Wu: 5C AD 5D AC 9C Mike: 7C 5H 8D TD KS'
        const result = topFiveWinRatePlayer(record)
        expect(result).toContain('Wu 100%')
    })

    it('Show win rate is Jane when Jane has A more than Mike', () => {
        const record = 'Mike: 7D 2S 5D 3S AC Jane: 8C AS KC AH 4S'
        const result = topFiveWinRatePlayer(record)
        expect(result).toContain('Jane 100%')
    })

    it('Show win rate is Mike when Mike has A and K in hands', () => {
        const record = 'Jane: 7D 2S 5D 3S AC Mike: 8C TS KC 9H AS'
        const result = topFiveWinRatePlayer(record)
        expect(result).toContain('Mike 100%')
    })

    it('Show win rate is Jane 100% when have equal A and 9D', () => {
        const record = 'Jane: 9D 2S 5D 3S AC Mike: 8C 2D 5C 7H AS'
        const result = topFiveWinRatePlayer(record)
        expect(result).toContain('Jane 100%')
    })

})

describe('Check Hands winer', () => {
    it('Show Mike is winer when record is Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC', () => {
        const record = 'Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC'
        const winer = winnerOfGame(record)
        expect(winer).toEqual('Mike')
    })

    it('Show Mike is winer when record is Jane: 3H 7H 6S KC JS Wu: QH TD JC 2D 8S', () => {
        const record = 'Jane: 3H 7H 6S KC JS Wu: QH TD JC 2D 8S'
        const winer = winnerOfGame(record)
        expect(winer).toEqual('Jane')
    })
})