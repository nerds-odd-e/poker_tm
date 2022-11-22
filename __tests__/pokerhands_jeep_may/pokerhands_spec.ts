import PokerHandsService from '../../src/pokerhands_jeep_may/PockerHandsService'

describe('Poker anti-cheat system', () => {

    it('counts the game per person played', ()=>{
        const fileName = 'poker.txt'
        const actual = PokerHandsService.countPersonPlayed(fileName)
        expect(actual).toBe("Jane:Mike:")
    })

    it('show empty string when no data', () => {
        const fileName = 'empty.txt'
        const actual = PokerHandsService.countPersonPlayed(fileName)
        expect(actual).toBe('')   
    })
})