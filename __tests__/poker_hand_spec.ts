import { winRateFromFile, loadData } from "../src/services/PokerHandService";
import describeWithDB from "../test_helpers/describeWithDB";

describe("Cheater Dectector", () => {
  describe("Games Counting", () => {
    it("should show how many each player play the game", () => {
      expect(true).toBe(true);
    });
  });

  describe("Validate Hight Card", () => {
    it("should be get player win with hight card", () => {
      expect(true).toBe(true);
    });
  });

  describe("Games Counting", () => {
    it("should show how many each player play the game", () => {
      expect(true).toBe(true);
    });
  });

  describe("WinRate statistics for each players", () => {
    it("when load empty file should return empty list", () => {
      const file = "";

      const result = winRateFromFile(file);

      expect(result).toBe("");
    });
  });
});
    
describeWithDB("Game Data Loader", () => {
    it ("should return 0 when there is no record", () => {
        expect(loadData("")).toBe(0)
    })
})
