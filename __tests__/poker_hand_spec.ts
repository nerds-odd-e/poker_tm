import { isPair } from "../src/services/PockerHandRanker";
import {
  winRateFromFile,
  loadData,
  getGameRecords,
  winnerOfHighCard,
} from "../src/services/PokerHandService";
import describeWithDB from "../test_helpers/describeWithDB";

describe("Cheater Dectector", () => {
  it("when load empty file should return empty list", () => {
    const file = "";

    const result = winRateFromFile(file);

    expect(result).toBe("");
  });
});

describe("PokerHandRanker", () => {
  it("should return true when hand is flush", () => {
    expect(true).toBe(true);
  });

  describe("Validate Hight Card", () => {
    it("should be get player win with hight card", () => {
      const game = "Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC";
      const result = winnerOfHighCard(game);
      expect(result).toBe("Mike");
    });
  });
});

describe("Games Counting", () => {
  it("should show 0 when player have no game record", () => {
    expect(getGameRecords("Mike")).toBe(0);
  });
});

describe("Hand", () => {
  it("should return true for pair", () => {
    expect(isPair("")).toBe(true);
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
