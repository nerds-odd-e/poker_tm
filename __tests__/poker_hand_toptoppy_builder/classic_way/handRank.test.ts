import { isSameSuit } from "../../../src/poker_hand_toptoppy_builder/classic_way/PokerHand";


describe("Test Royal", () => {
    it('when cardHand is same suit[S] should return true', ()=> {
        const cardInHand = ['AS','KS','QS','JS','TS']
        expect(isSameSuit(cardInHand)).toBe(true)
    })
});
