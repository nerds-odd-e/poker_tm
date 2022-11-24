import Game from "../src/models/Game";
import {
  isFlush,
  isStraight,
  isSinglePair,
  isTwoPair,
  isThreeOfAKind,
} from "../src/services/PockerHandRanker";
import {
  loadData,
  getGameRecords,
  winnerOfHighCard,
  isFullHouse,
  winnerOfGame,
  winRateFromFile,
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
});

describe("PokerHandRanker", () => {
  it("should return true when hand is flush", () => {
    expect(isFlush(["2D", "4D", "TD", "KD", "6D"])).toBe(true);
  });

  it("should return false when hand is not flush", () => {
    expect(isFlush(["2D", "5A", "TD", "JD", "AD"])).toBe(false);
  });

  it("should return true when hand is flush", () => {
    expect(isFlush(["2S", "3S", "4S", "5S", "6S"])).toBe(true);
  });

  it("should return true when hand is straight", () => {
    expect(isStraight(["2D", "4S", "3S", "6D", "5S"])).toBe(true);
  });

  it("should return false when hand is straight", () => {
    expect(isStraight(["2S", "4D", "3D", "7D", "5D"])).toBe(false);
  });

  it("should return false when hand is straight", () => {
    expect(isStraight(["2S", "4D", "3S", "8D", "5S"])).toBe(false);
  });

  it("should return true when hand is straight", () => {
    expect(isStraight(["AS", "KD", "QS", "JS", "TS"])).toBe(true);
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
  it("should show 0 when can not found player record", async () => {
    const result = await getGameRecords("Mike")
    expect(result).toBe(0);
  });
  it("should show 0 when player have no game record", async () => {
    const result = await getGameRecords("Mike")
    expect(result).toBe(0);
  });
  it("should show 1 when found Mike play 1 game", async () => {
    await loadData("one_game.txt")
    const result = await getGameRecords("Mike")
    expect(result).toBe(1);
  });
});

describeWithDB("Game Data Loader", () => {
  it("should return 0 when there is no record", async () => {
    await loadData("")
    const count = await Game.find().count()
    expect(count).toBe(0);
    
  });

  it("should return 1 when there is 1 record", async () => {
    await loadData("one_game.txt")
    const count = await Game.find().count()
    expect(count).toBe(1);
  });

  it("should return 2 when there are 2 records", async () => {
    await loadData("two_game.txt")
    const count = await Game.find().count()
    expect(count).toBe(2);
  });

  it("should persist player 1 & 2 name when there is a record", async () => {
    await loadData("one_game.txt")
    const game = await Game.find({})
    expect(game[0].player1?.name).toBe("Jane");
    expect(game[0].player2?.name).toBe("Mike");
  })

  it("should persist player 1 & 2 hands", async () => {
    await loadData("one_game.txt")
    const game = await Game.find({})
    expect(game[0].player1?.hands).toBe("8C TS KC 9H 4S");
    expect(game[0].player2?.hands).toBe("7D 2S 5D 3S AC");
  })
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

it("should return false for two pair hand three of kind check ", () => {
  expect(
    isThreeOfAKind(
      aGame
        .between("Jane")
        .twoPairInHand()
        .vs("Mike")
        .highCardWithKHeart()
        .please()
    )
  ).toBe(true);
});
describe("WinnerOfGame", () => {
  it("should return name of winner", () => {
    const game = "Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC";
    const result = winnerOfGame(game);
    expect(result).toBe("Mike");
  });
  it("should return name of winner", () => {
    const game = "Jane: 8C TC KC 9C 4C Mike: 7D 2S 5D 3S AC";
    const result = winnerOfGame(game);
    expect(result).toBe("Jane");
  });
});
