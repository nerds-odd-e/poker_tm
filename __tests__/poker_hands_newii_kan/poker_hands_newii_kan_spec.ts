import { getListOfPlayers } from '../../src/poker_hands_newii_kan/poker_hands_newii_kan'

describe("CheaterDetector", () => {
    it("return empty list when no player", () => {
        const games = [];
        const players = getListOfPlayers(games);
        expect(players).toEqual([]);
    });

    it("return 2 players in list when get 1 game", () => {
        const games = [
            {
                p1: "newii",
                p2: "kan"
            }
        ];
        const players = getListOfPlayers(games);
        expect(players).toEqual(["newii", "kan"]);
    });

})