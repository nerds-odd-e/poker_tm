import { Card, compareCards, play, process } from "../services/main";

describe("Win-rate Detector", () => {
  it("should display win-rate of all players when player2 wins.", () => {
    // Given
    const gameRecord = "Jane: 8C QS KC 9H 4S Mike: 7D 2S 5D 3S AC";

    // When
    const result = play(gameRecord);

    // Then
    expect(result).toContainEqual({
      name: "Jane",
      winRate: 0,
      gameCount: 1,
      winCount: 0,
    });
    expect(result).toContainEqual({
      name: "Mike",
      winRate: 100,
      gameCount: 1,
      winCount: 1,
    });
  });

  it("should display win-rate of all players when player2 wins in multiple games", () => {
    // Given
    const gameRecords = [
      "Jane: 3H 7H 6S KC JS Wu: QH TD JC 2D 8S",
      "Jane: TH 8H 5C QS TC Mike: 9H 4D JC KS JS",
    ];

    // When
    const result = process(gameRecords);

    //Then
    expect(result).toContainEqual({
      name: "Jane",
      winRate: 0,
      gameCount: 2,
      winCount: 0,
    });
    expect(result).toContainEqual({
      name: "Wu",
      winRate: 100,
      gameCount: 1,
      winCount: 1,
    });
    expect(result).toContainEqual({
      name: "Mike",
      winRate: 100,
      gameCount: 1,
      winCount: 1,
    });
  });

  it("should display win-rate of all players when player2 wins in single game", () => {
    // Given
    const gameRecords = ["Jane: 3H 7H 6S KC JS Wu: QH TD JC 2D 8S"];

    // When
    const result = process(gameRecords);

    //Then
    expect(result).toContainEqual({
      name: "Jane",
      winRate: 0,
      gameCount: 1,
      winCount: 0,
    });
    expect(result).toContainEqual({
      name: "Wu",
      winRate: 100,
      gameCount: 1,
      winCount: 1,
    });
  });

  it("should not display win-rate of all players when games list is empty", () => {
    // Given
    const gameRecords = [];

    // When
    const result = process(gameRecords);

    //Then
    expect(result).toStrictEqual([]);
  });

  it("should display win-rate of all players when player1 wins game", () => {
    // Given
    const gameRecords = ["Jane: AH TD JC 2D 8S Wu: 3H 7H 6S KC JS"];

    // When
    const result = process(gameRecords);

    //Then
    expect(result).toContainEqual({
      name: "Wu",
      winRate: 100,
      gameCount: 1,
      winCount: 1,
    });
    expect(result).toContainEqual({
      name: "Jane",
      winRate: 0,
      gameCount: 1,
      winCount: 0,
    });
  });

  it("should comprae card by value", () => {
    const sortedDeck: Card[] = [
      new Card("AS"),
      new Card("KS"),
      new Card("QS"),
      new Card("JS"),
      new Card("TS"),
      new Card("9S"),
      new Card("8S"),
      new Card("7S"),
      new Card("6S"),
      new Card("5S"),
      new Card("4S"),
      new Card("3S"),
      new Card("2S"),
    ];

    //add shuffle - ????
    const shuffledDeck = sortedDeck.sort(() => Math.random() - 0.5);
    shuffledDeck.forEach(e => console.log(`${e}`))
    const sorted = shuffledDeck.sort(compareCards);
    expect(sorted).toBe(sortedDeck);
  });
});
