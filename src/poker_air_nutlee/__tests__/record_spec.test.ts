import { winRateDetector } from "../services/main";

describe("Win-rate Detector", () => {
    it("should display win-rate of all players when player2 wins.", () => {
        // Given
        const gameRecord = "Jane: 8C QS KC 9H 4S Mike: 7D 2S 5D 3S AC";

        // Then
        expect(winRateDetector(gameRecord)).toContainEqual(
            { name: "Jane", winRate: 0 },
        );
        expect(winRateDetector(gameRecord)).toContainEqual(
            { name: "Mike", winRate: 100 },
        );
    });

    xit("should display winrate of all players when player1 wins.", () => {
        // Given
        const gameRecord = "Wu: AC QS KC 9H 4S Ken: 7D 2S 5D 3S KH";

        // Then
        expect(winRateDetector(gameRecord)).toContainEqual(
            { name: "Wu", winRate: 100 }
        );
        expect(winRateDetector(gameRecord)).toContainEqual(
            { name: "Ken", winRate: 0 }
        );
    });
});
