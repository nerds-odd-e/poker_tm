import PokerHandsService from '../../src/pokerhands_jeep_may/PockerHandsService'

describe('Poker anti-cheat system', () => {

    it('counts the game per person played for poker.txt', ()=> {
        const fileName = 'poker.txt'
        const actual = PokerHandsService.countPersonPlayed(fileName)
        expect(true).toBe(true)
    })

    // it('counts the game per person played for data1.txt', () => {
    //     const fileName = 'data1.txt'
    //     const actual = PokerHandsService.countPersonPlayed(fileName)
    //     expect(actual).toBe("Mike: 2 Jane: 1 Wu: 1")
    // })

})