import { topFiveWinRatePlayer, winnerOfGame } from "../../../src/poker_hand_toptoppy_builder/romantic_way/cheaterDetector"

describe('Cheater detector', () => {
    it('Show win rate with Mike, Jane', () => {
        // Given
        const record = 'Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC'
        // When
        const result = topFiveWinRatePlayer(record)
        // Then
        expect(result).toContain('Mike 100%')
    })

    it('Show win rate with Wu, Mike', () => {
        // Given
        const record = 'Wu: 5C AD 5D AC 9C Mike: 7C 5H 8D TD KS'
        // When
        const result = topFiveWinRatePlayer(record)
        // Then
        expect(result).toContain('Wu 100%')
    })
})

 describe('Check Hands winer', () => {
    it('Show Mike is winer when record is Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC', () => {
        // Given
        const record = 'Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC'
        // When
        const winer = winnerOfGame(record)
        //
        expect(winer).toEqual('Mike')
    })

    it('Show Mike is winer when record is Jane: 3H 7H 6S KC JS Wu: QH TD JC 2D 8S', () => {
        // Given
        const record = 'Jane: 3H 7H 6S KC JS Wu: QH TD JC 2D 8S'
        // When
        const winer = winnerOfGame(record)
        //
        expect(winer).toEqual('Jane')
    })
})