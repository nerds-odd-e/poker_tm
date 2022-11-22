import { winRateDetector } from "../services/main";

describe("Win-rate Detector", () => {
    it("should display win-rate of all players when player2 wins.", () => {
        // Given
        const gameRecord = "Jane: 8C QS KC 9H 4S Mike: 7D 2S 5D 3S AC";

        // Then
        expect(winRateDetector(gameRecord)).toContainEqual(
            { name: "Jane", rate: 0 },
        );
        expect(winRateDetector(gameRecord)).toContainEqual(
            { name: "Mike", rate: 100 },
        );
    });

    it("should display winrate of all players when player1 wins.", () => {
        // Given
        const gameRecord = "Wu: AC QS KC 9H 4S Ken: 7D 2S 5D 3S KH";

        // Then
        expect(winRateDetector(gameRecord)).toContainEqual(
            { name: "Wu", rate: 100 }
        );
        expect(winRateDetector(gameRecord)).toContainEqual(
            { name: "Ken", rate: 0 }
        );
    });
});
