import {
  winRateFromFile,
  loadData,
  winnerOfHighCard,
} from "../src/services/PokerHandService";
import PokerHandRanker from "../src/services/PockerHandRanker";
import describeWithDB from "../test_helpers/describeWithDB";

describe("Cheater Dectector", () => {
  describe("Games Counting", () => {
    it("should show how many each player play the game", () => {
      expect(true).toBe(true);
    });
  });

  describe("Validate High Card", () => {
    it("should be get player win with high card", () => {
      const game = "Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC";
      const result = winnerOfHighCard(game);

      expect(result).toBe("Mike");
    });
  });

  describe("WinRate statistics for each players", () => {
    it("when load empty file should return empty list", () => {
      const file = "";

      const result = winRateFromFile(file);

      expect(result).toBe("");
    });

    describe("PokerHandRanker", () => {
      it("should return true when hand is flush", () => {
        expect(PokerHandRanker.isFlush(["D", "D", "D", "D", "D"])).toBe(true);
      });
    });

    describe("Validate Hight Card", () => {
      it("should be get player win with hight card", () => {
        expect(true).toBe(true);
      });
    });
  });

  describeWithDB("Game Data Loader", () => {
    it("should return 0 when there is no record", () => {
      expect(loadData("")).toBe(0);
    });
  });
});
