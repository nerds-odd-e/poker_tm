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
        const record = 'Wu: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC'
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
})