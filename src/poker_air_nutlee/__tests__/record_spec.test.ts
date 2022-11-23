import { play, process } from "../services/main";

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

  it("should display win-rate of all players when player2 wins in multiple games", () => {
    // Given
    const gameRecords = ["Jane: 3H 7H 6S KC JS Wu: QH TD JC 2D 8S",
        "Jane: TH 8H 5C QS TC Mike: 9H 4D JC KS JS"]

    // When
    const result = process(gameRecords);

    // Then
    // expect(result[0].name).toBe("Jane");
    // expect(result[0].winRate).toBe(0);
    // expect(result[1].name).toBe("Wu");
    // expect(result[1].winRate).toBe(100);
    // expect(result[2].name).toBe("Mike");
    // expect(result[2].winRate).toBe(100);
  });
});
