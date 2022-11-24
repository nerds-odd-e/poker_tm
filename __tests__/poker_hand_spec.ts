import PokerHandRanker, {
  isSinglePair,
  isTwoPair,
  isThreeOfAKind
} from "../src/services/PockerHandRanker";
import {
  winRateFromFile,
  loadData,
  getGameRecords,
  winnerOfHighCard,
  isFullHouse,
} from "../src/services/PokerHandService";
import describeWithDB from "../test_helpers/describeWithDB";
import aGame from "../test_helpers/poker_game_builder";

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
      "Wu: QH TD JC 2D 8S Jane: 3H 7H 6S KC JS\nWu: QH TD JC 2D 8S Jane: 3H 7H 6S KC JS";

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
});

describe("PokerHandRanker", () => {
  it("should return true when hand is flush", () => {
    expect(PokerHandRanker.isFlush(["2D", "4D", "TD", "KD", "6D"])).toBe(true);
  });

  it("should return false when hand is not flush", () => {
    expect(PokerHandRanker.isFlush(["2D", "5A", "TD", "JD", "AD"])).toBe(false);
  });

  it("should return true when hand is flush", () => {
    expect(PokerHandRanker.isFlush(["2S", "3S", "4S", "5S", "6S"])).toBe(true);
  });

  it("should return true when hand is straight", () => {
    expect(PokerHandRanker.isStraight(["2", "4", "3", "6", "5"])).toBe(true);
  });

  it("should return false when hand is straight", () => {
    expect(PokerHandRanker.isStraight(["2", "4", "3", "7", "5"])).toBe(false);
  });

  it("should return false when hand is straight", () => {
    expect(PokerHandRanker.isStraight(["2", "4", "3", "8", "5"])).toBe(false);
  });

  it("should return true when hand is straight", () => {
    expect(PokerHandRanker.isStraight(["A", "K", "Q", "J", "T"])).toBe(true);
  });

});

describe("validate full house", () => {
  it("it say yes when hand is full house", () => {
    const result = isFullHouse("2D 2C 2S 3D 3S");
    expect(result).toBe(true);
  });
});

describe("Validate Hight Card", () => {
  it("should be get player win with hight card", () => {
    const game = "Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC";
    const result = winnerOfHighCard(game);
    expect(result).toBe("Mike");
  });

  it("should be get player win with hight card", () => {
    const game = "Mike: 8C TS KC 9H 4S Jane: 7D 2S 5D 3S AC";
    const result = winnerOfHighCard(game);
    expect(result).toBe("Jane");
  });

  it("should be get player win with hight card", () => {
    const game = "Wu: 5C AD 5D AC 9C Mike: 7C 5H 8D TD KS";
    const result = winnerOfHighCard(game);
    expect(result).toBe("Wu");
  });
});

describeWithDB("Games Counting", () => {
  it("should show 0 when can not found player record", () => {
    expect(getGameRecords("")).toBe(0);
  });
  it("should show 0 when player have no game record", () => {
    expect(getGameRecords("Mike")).toBe(0);
  });
});

describeWithDB("Game Data Loader", () => {
  it("should return 0 when there is no record", () => {
    expect(loadData("")).toBe(0);
  });

  it("should return 1 when there is 1 record", () => {
    expect(loadData("one_game.txt")).toBe(1);
  });
});

describe("Hand", () => {
  it("should return true for first player pair", () => {
    expect(
      isSinglePair(
        aGame
          .between("Jane")
          .pairCardInHand()
          .vs("Mike")
          .highCardWithKHeart()
          .please()
      )
    ).toBe(true);
  });

  it("should return true for second player pair", () => {
    expect(
      isSinglePair(
        aGame
          .between("Jane")
          .highCardWithHighest("D")
          .vs("Mike")
          .pairCardInHand()
          .please()
      )
    ).toBe(true);
  });

  it("should return false for pair if no pair", () => {
    expect(
      isSinglePair(
        aGame
          .between("Jane")
          .highCardWithHighest("H")
          .vs("Mike")
          .highCardWithKHeart()
          .please()
      )
    ).toBe(false);
  });

  it("should return false for two pair", () => {
    expect(
      isTwoPair(
        aGame
          .between("Jane")
          .highCardWithHighest("H")
          .vs("Mike")
          .highCardWithKHeart()
          .please()
      )
    ).toBe(false);
  });
});

it("should return true for first player have three of kind", () => {
  expect(
    isThreeOfAKind(
      aGame
        .between("Jane")
        .threeOfAKind()
        .vs("Mike")
        .highCardWithKHeart()
        .please()
    )
  ).toBe(true);
});
