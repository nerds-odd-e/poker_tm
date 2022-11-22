import { topFiveWinRatePlayer } from "../../../src/poker_hand_toptoppy_builder/romantic_way/cheaterDetector"

describe('Cheater detector', () => {
    it('Show win rate with Mike, Jane', () => {
        // Given
        const record = 'Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC'
        // When
        const result = topFiveWinRatePlayer(record)
        // Then
        expect(result).toEqual('Mike 100%, Jane 0%')
    })

    it('Show win rate with Wu, Mike', () => {
        // Given
        const record = 'Wu: 5C AD 5D AC 9C Mike: 7C 5H 8D TD KS'
        // When
        const result = topFiveWinRatePlayer(record)
        // Then
        expect(result).toEqual('Wu 100%, Mike 0%')
    })
})