import { play } from "../services/main";

describe("Win-rate Detector", () => {
  it("should display win-rate of all players when player2 wins.", () => {
    // Given
    const gameRecord = "Jane: 8C QS KC 9H 4S Mike: 7D 2S 5D 3S AC";

    // When
    const result = play(gameRecord);

    // Then
    expect(result[0].name).toBe("Jane");
    expect(result[0].winRate).toBe(0);
    expect(result[1].name).toBe("Mike");
    expect(result[1].winRate).toBe(100);
  });
});
