import PokerHandsService from '../../src/pokerhands_jeep_may/PockerHandsService'

describe('Poker anti-cheat system', () => {

    it('counts the game per person played', ()=>{
        const fileName = 'poker.txt'
        const actual = PokerHandsService.countPersonPlayed(fileName)
        expect(actual).toBe("Jane: 999 Mike: 998 Wu:2 Ken: 1")
    })
})