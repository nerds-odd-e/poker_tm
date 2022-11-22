import { winRateDetector } from "../services/main";

describe.only("Win-rate Detector", () => {
  it("should display winrate of all players", () => {
    // Given
    const gameRecord = "Jane: 8C QS KC 9H 4S Mike: 7D 2S 5D 3S AC";

    // Then
    expect(winRateDetector(gameRecord)).toMatchObject([
      { name: "Jane", rate: 0 },
      { name: "Mike", rate: 100 },
    ]);
  });
});
