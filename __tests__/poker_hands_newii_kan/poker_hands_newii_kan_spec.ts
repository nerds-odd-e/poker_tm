import { getListOfPlayers } from '../../src/poker_hands_newii_kan/poker_hands_newii_kan'

describe("CheaterDetector", () => {
    it("return empty list when no player", () => {
        const games = [];
        const players = getListOfPlayers(games);
        expect(players).toEqual(new Set());
    });

    it("return 2 players in list when get 1 game", () => {
        const games = [
            {
                p1: "newii",
                p2: "kan"
            }
        ];
        const players = getListOfPlayers(games);
        expect(players).toEqual(new Set(["newii", "kan"]));
    });

    it("return 3 players in list when get 2 games with one repeat player", () => {
        const games = [
            {
                p1: "newii",
                p2: "kan"
            },
            {
                p1: "newii",
                p2: "Jane"
            },
        ];
        const players = getListOfPlayers(games);
        expect(players).toEqual(new Set(["newii", "kan", "Jane"]));
    });

})