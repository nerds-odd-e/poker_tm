import { getListOfPlayers } from '../../src/poker_hands_newii_kan/poker_hands_newii_kan'

describe("List of players", () => {
    it("should return empty list when get empty list", ()=> {
        const games = [];
        const players = getListOfPlayers(games);
        expect(players).toEqual([]);
    });

})