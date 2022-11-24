import Game from "../src/models/Game";
import {
  isSinglePair,
  isTwoPair,
  isThreeOfAKind,
} from "../src/services/PockerHandRanker";
import {
  loadData,
  getGameRecords,
  winnerOfHighCard,
  isFullHouse,
} from "../src/services/PokerHandService";
import describeWithDB from "../test_helpers/describeWithDB";
import aGame from "../test_helpers/poker_game_builder";


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

  it("should return player 1 name when there is a record", async () => {
    await loadData("one_game.txt")
    const game = await Game.find({})
    expect(game[0].player1?.name).toBe("Jane");
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
