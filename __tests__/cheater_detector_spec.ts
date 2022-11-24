import {
  winRateFromFile,
} from "../src/services/PokerHandService";

describe("Cheater Dectector", () => {
  it("when load empty file should return empty list", () => {
    const file = "";

    const result = winRateFromFile(file);

    expect(result).toBe("");
  });
  it("should return Jane with 100 winRate and Wu 0 winRate", () => {
    const file = "Jane: 3H 7H 6S KC JS Wu: QH TD JC 2D 8S";

    const result = winRateFromFile(file);

    expect(result).toContainEqual({
      name: "Jane",
      winRate: 100,
      gameCount: 1,
      winCount: 1,
    });
    expect(result).toContainEqual({
      name: "Wu",
      winRate: 0,
      gameCount: 1,
      winCount: 0,
    });
  });

  it("should return Wu with 100 winRate and Jane 0 winRate", () => {
    const file = "Wu: QH TD JC 2D 8S Jane: 3H 7H 6S KC JS";

    const result = winRateFromFile(file);

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

  it("should return Wu with 100 winRate and Jane 0 winRate", () => {
    const file =
      "Wu: QH TD JC 2D 8S Jane: 3H 7H 6S KC JS";

    const result = winRateFromFile(file);

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

  it("should return Wu with 100 winRate and Jane 0 winRate with 2 game", () => {
    const file =
      "Wu: QH TD JC 2D 8S Jane: 3H 7H 6S KC JS\nWu: 9H 4D JC KS JS Jane: TH 8H 5C QS TC ";

    const result = winRateFromFile(file);

    expect(result).toContainEqual({
      name: "Wu",
      winRate: 100,
      gameCount: 2,
      winCount: 2,
    });
    expect(result).toContainEqual({
      name: "Jane",
      winRate: 0,
      gameCount: 2,
      winCount: 0,
    });
  });
});