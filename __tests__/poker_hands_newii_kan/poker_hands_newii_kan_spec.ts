import { getListOfPlayers, getWinner, isStraight } from '../../src/poker_hands_newii_kan/poker_hands_newii_kan'

describe("CheaterDetector", () => {
    it("return empty list when no player", () => {
        const games = [];
        const players = getListOfPlayers(games);
        expect(players).toEqual({});
    });

    it("return 2 players with number of plays in list when get 1 game", () => {
        const games = [
            {
                p1: "newii",
                p2: "kan"
            }
        ];
        const players = getListOfPlayers(games);
        expect(players).toEqual({
            newii: { numberOfPlays: 1 },
            kan: { numberOfPlays: 1 }
        });
    });

    it("return 3 players with number of plays in list when get 2 games with one repeat player", () => {
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
        expect(players).toEqual({
            newii: { numberOfPlays: 2 },
            kan: { numberOfPlays: 1 },
            Jane: { numberOfPlays: 1 }
        });
    });

    it("return newii as the winner when newii has higher poker hands ranking", () => {
        const game = {
            p1: "newii",
            p2: "kan",
            p1Cards: "10S JS QS KS AS",
            p2Cards: "4H 5H 6H 7H 8H"
        };
        const winner = getWinner(game);
        expect(winner).toEqual("newii");
    });

    it("return true when poker hands is straight", () => {
        const cards = ["10", "J", "Q", "K", "A"];
        const pokerHandsRank = isStraight(cards);
        expect(pokerHandsRank).toBe(true);
    });
})